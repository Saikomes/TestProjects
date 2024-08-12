from .basePage import BasePage
from src.modules.grafana.elements.dashboardPageElements import DashboardPageElements
from src.modules.grafana.actions.dashboardPageActions import DashboardPageActions
import shutil
from src.modules.base import StringHelpers


class DashboardPage(BasePage):

    def __init__(self, page):
        super().__init__(page)
        self.dashboard_page_elements = DashboardPageElements(page)
        self.dashboard_page_actions = DashboardPageActions(page)

    async def apply_config(self, start_time, end_time, vars_dict):
        print("Start applying config")
        await self.dashboard_page_actions.control_panel_actions.choose_date(start_time, end_time)
        print("Choose date")
        # await self.dashboard_page_actions.dashboard_content_actions.expand_all_rows()
        # print("Expand rows")
        print("Vars dict - ", vars_dict)
        await self.dashboard_page_actions.param_panel_actions.apply_params(vars_dict)
        print("Apply vars")
        await self.page.wait_for_load_state('networkidle')

    async def export_panel_csv(self, panel, export_folder, index=0):
        panel_header = self.dashboard_page_elements.data_panel_elements.data_panel_header(panel)
        panel_name = await panel_header.text_content()
        panel_menu = await self.dashboard_page_actions.data_panel_actions.open_panel_menu(panel)
        await self.dashboard_page_actions.data_panel_actions.choose_panel_menu_option(panel_menu, "Inspect")
        await self.dashboard_page_actions.panel_wrapper_actions.export_csv(export_folder + f'{panel_name}_{index}_.csv')
        await self.dashboard_page_actions.panel_wrapper_actions.close_wrapper()

    async def export_named_panel_csv(self, panel_name, export_folder):
        panel = self.dashboard_page_elements.data_panel_elements.data_panel_by_name(panel_name).first
        await self.export_panel_csv(panel, export_folder)

    async def screenshot_all_panels(self, export_folder):
        shutil.rmtree(export_folder, ignore_errors=True)
        data_rows = await self.dashboard_page_actions.dashboard_content_actions.dashboard_content_elements.data_row().all()
        for row_number, row in enumerate(data_rows):
            await self.dashboard_page_actions.dashboard_content_actions.expand_row(row)
            def is_prometheus_response(response):
                return "api/ds/query?ds_type=prometheus" in response.url and response.status == 200

            await self.page.wait_for_event("response", is_prometheus_response)
            await self.page.wait_for_timeout(1000)
            panels = await self.dashboard_page_elements.data_panel_elements.data_panel().all()
            raw_row_title = await self.dashboard_page_actions.dashboard_content_actions.dashboard_content_elements.row_title(row).inner_text()
            row_title = StringHelpers.sanitize_filename(raw_row_title)
            print(row_title)
            for panel_number, panel in enumerate(panels):
                await panel.hover()
                raw_title = await panel.get_by_role("heading").text_content()
                title = StringHelpers.sanitize_filename(raw_title)
                if title == "Report":
                    continue
                panel_menu = await self.dashboard_page_actions.data_panel_actions.open_panel_menu(panel)
                await self.dashboard_page_actions.data_panel_actions.choose_panel_menu_option(panel_menu, "View")
                await (self.dashboard_page_elements.data_panel_elements.data_panel().
                       screenshot(path=f'{export_folder}' + f'{row_title}_{row_number}/' + f'{title}_{panel_number}.png', scale="css"))
                await self.page.go_back()
            await self.dashboard_page_actions.dashboard_content_actions.slick_row(row)

    async def export_all_panels_csv(self, export_folder):
        panels = await self.dashboard_page_elements.data_panel_elements.data_panel().all()
        for i, panel in enumerate(panels):
            await panel.hover()
            await self.export_panel_csv(panel, export_folder, i)

    async def generate_pdf(
            self,
            destination_file: str,
            margin: int = 80
    ) -> None:
        await self.dashboard_page_elements.param_panel_elements.param_panel().scroll_into_view_if_needed()
        page_height = await self.page.evaluate(
            'document.getElementsByClassName(\'react-grid-layout\')[0].getBoundingClientRect().bottom;'
        )
        await self.page.wait_for_load_state('networkidle')
        await self.page.set_viewport_size({'width': self.page.viewport_size["width"], 'height': page_height})
        await self.page.mouse.wheel(0, page_height)  # Ленивая загрузка контента дашборда
        await self.page.wait_for_timeout(3000)
        await self.page.wait_for_load_state('networkidle')
        await self.page.pdf(
            path=destination_file,
            scale=1,
            width=f'{self.page.viewport_size["width"] + margin * 2}px',
            height=f'{page_height + margin * 2}px',
            display_header_footer=False,
            print_background=True,
            margin={
                'top': f'{margin}px',
                'bottom': f'{margin}px',
                'left': f'{margin}px',
                'right': f'{margin}px',
            }
        )

    async def upload_report(self, destination_page_id):
        report_panel = self.dashboard_page_elements.data_panel_elements.data_panel_by_name("Report")
        panel_menu = await self.dashboard_page_actions.data_panel_actions.open_panel_menu(report_panel)
        await self.dashboard_page_actions.data_panel_actions.choose_panel_menu_option(panel_menu, "Edit")
