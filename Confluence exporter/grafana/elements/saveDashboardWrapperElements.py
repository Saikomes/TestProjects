from src.modules.grafana.elements.panelWrapperElements import PanelWrapperElements
from src.modules.grafana.locators.saveDashboardWrapperLocators import SaveDashboardWrapperLocators

class SaveDashboardWrapperElements(PanelWrapperElements):
    def __init__(self, page):
        super().__init__(page)
        self.save_dashboard_wrapper_locators = SaveDashboardWrapperLocators

    def save_time_range_checkbox(self):
        return self.content_wrapper().locator(self.save_dashboard_wrapper_locators.save_time_range_checkbox())

    def save_variables_checkbox(self):
        return self.content_wrapper().locator(self.save_dashboard_wrapper_locators.save_variables_checkbox())

    def save_changes_button(self):
        return self.page.get_by_role("button", name="Save")

    def cancel_changes_button(self):
        return self.page.get_by_role("button", name="Cancel")