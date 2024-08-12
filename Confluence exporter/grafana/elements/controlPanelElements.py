from src.modules.grafana.locators.controlPanelLocators import ControlPanelLocators


class ControlPanelElements:
    def __init__(self, page):
        self.page = page
        self.control_panel_locators = ControlPanelLocators()

    def timepicker(self):
        return self.page.locator(self.control_panel_locators.TIMEPICKER)

    def date_from_input(self):
        return self.page.locator(self.control_panel_locators.DATE_FROM_INPUT)

    def date_to_input(self):
        return self.page.locator(self.control_panel_locators.DATE_TO_INPUT)

    def apply_date_button(self):
        return self.page.locator(self.control_panel_locators.APPLY_DATE_BUTTON)

    def save_dashboard_button(self):
        return self.page.locator(self.control_panel_locators.SAVE_DASHBOARD_BUTTON)
