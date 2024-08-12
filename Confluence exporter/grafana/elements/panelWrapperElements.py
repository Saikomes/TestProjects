from src.modules.grafana.locators.panelWrapperLocators import PanelWrapperLocators


class PanelWrapperElements:
    def __init__(self, page):
        self.page = page
        self.panel_wrapper_locators = PanelWrapperLocators

    def content_wrapper(self):
        return self.page.locator(self.panel_wrapper_locators.CONTENT_WRAPPER)

    def tab_by_name(self, name):
        return self.page.get_by_label(f"Tab {name}")

    def download_csv_button(self):
        return self.page.get_by_role("button", name="Download CSV")

    def close_wrapper_button(self):
        return self.page.locator(self.panel_wrapper_locators.WRAPPER_CLOSE_BUTTON)
