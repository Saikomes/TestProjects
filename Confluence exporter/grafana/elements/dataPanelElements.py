from src.modules.grafana.locators.dataPanelLocators import DataPanelLocators


class DataPanelElements:
    def __init__(self, page):
        self.page = page
        self.data_panel_locators = DataPanelLocators

    def data_panel(self):
        return self.page.locator(self.data_panel_locators.DATA_PANEL)

    def data_panel_by_name(self, panel_name):
        return self.data_panel().filter(has=self.page.get_by_role("heading", name=panel_name, exact=True))

    def data_panel_header(self, data_panel):
        return data_panel.get_by_role("heading")

    def menu_button(self, data_panel):
        return data_panel.locator('button[title="Menu"]')

    def panel_menu(self):
        return self.page.get_by_role("menu")

    def menu_option(self, menu, option_name):
        return menu.get_by_text(option_name)