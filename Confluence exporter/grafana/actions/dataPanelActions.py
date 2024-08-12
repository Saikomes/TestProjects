from src.modules.grafana.elements.dataPanelElements import DataPanelElements
from playwright.async_api import expect


class DataPanelActions:
    def __init__(self, page):
        self.page = page
        self.data_panel_elements = DataPanelElements(page)

    async def open_panel_menu(self, panel):
        panel_header = self.data_panel_elements.data_panel_header(panel)
        await panel.hover()
        if await self.data_panel_elements.menu_button(panel).is_visible():
            menu_button = self.data_panel_elements.menu_button(panel)
        else:
            menu_button = panel_header
        await menu_button.click()
        panel_menu = self.data_panel_elements.panel_menu()
        await expect(panel_menu).to_be_visible()
        return panel_menu

    async def choose_panel_menu_option(self, menu, option_name):
        inspect_option = self.data_panel_elements.menu_option(menu, option_name)
        await inspect_option.click()


