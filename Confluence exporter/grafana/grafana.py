import os
import shutil
import asyncio
from playwright.async_api import async_playwright
from src.modules.grafana.locators.dashboardLocators import DashboardLocators
from src.modules.grafana.pages.loginPage import LoginPage
from src.modules.grafana.pages.dashboardPage import DashboardPage
from src.modules.grafana.config.appConfig import AppConfig
from settings import settings
from src.modules.grafana.elements.controlPanelElements import ControlPanelElements
from src.modules.grafana.elements.saveDashboardWrapperElements import SaveDashboardWrapperElements

class Grafana:
    def __init__(self, start_time, end_time, parent_page_id, grafana_url, vars_dict):
        self.start_time = start_time
        self.end_time = end_time
        self.parent_page_id = parent_page_id
        self.grafana_url = grafana_url
        self.vars_dict = vars_dict

    async def init_browser(self, playwright,
                           page_width: int = 1920,
                           height: int = 1080,
                           headless: bool = True):
        ua = (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/69.0.3497.100 Safari/537.36"
        )

        browser = await playwright.chromium.launch(headless=headless, timeout=600000)
        context = await browser.new_context(device_scale_factor=4,
                                            user_agent=ua)
        page = await context.new_page()
        await page.set_viewport_size({'width': page_width, 'height': height})
        return page, context


    async def generate_test_images(self):

        async with async_playwright() as p:
            page, context = await self.init_browser(p)
            try:
                dashboard_page = DashboardPage(page)
                await context.tracing.start(screenshots=True, snapshots=True)
                await page.goto(self.grafana_url)
                print("Go to page")
                await LoginPage(page).login(settings.grafana_login, settings.grafana_password)  # Логинимся
                print("Login")
                await page.wait_for_selector(DashboardLocators.GRID_LAYOUT)
                print("Grid layout uploaded")
                await dashboard_page.apply_config(self.start_time, self.end_time, self.vars_dict)
                print("Set vars")
                # await dashboard_page.export_named_panel_csv("Total TPS", "csv/")
                #await dashboard_page.export_all_panels_csv("csv/")
                await dashboard_page.screenshot_all_panels("screenshots/")
                print("Screenshots")
                #await dashboard_page.generate_pdf(f'./grafana_report.pdf')
            finally:
                print("Saving trace")
                if(os.getenv("DEBUG") == "True"):
                    print(os.getenv("DEBUG"))
                    await context.tracing.stop(path="trace.zip")



    async def remove_dir_with_images(self, files_dir):
        shutil.rmtree(files_dir)

    # async def test_method(self):
    #     async with async_playwright() as p:
    #         page, context = await self.init_browser(p)
    #         try:
    #             dashboard_page = DashboardPage(page)
    #             await context.tracing.start(screenshots=True, snapshots=True)
    #             await page.goto(self.grafana_url)
    #             print("Go to page")
    #             await LoginPage(page).login(settings.grafana_login, settings.grafana_password)  # Логинимся
    #             print("Login")
    #             await page.wait_for_selector(DashboardLocators.GRID_LAYOUT)
    #             print("Grid layout uploaded")
    #             await dashboard_page.dashboard_page_actions.control_panel_actions.save_dashboard(True, False)
    #             print("Save dashboard")
    #             await dashboard_page.upload_report(5532523)
    #         finally:
    #             print("Saving trace")
    #             await context.tracing.stop(path="trace.zip")

