from src.modules.grafana.elements.controlPanelElements import ControlPanelElements
from src.modules.grafana.actions.saveDashboardWrapperActions import SaveDashboardWrapperActions
from playwright.async_api import expect


class ControlPanelActions:
    def __init__(self, page):
        self.page = page
        self.control_panel_elements = ControlPanelElements(page)

    async def choose_date(self, start_date, end_date):
        print("!"*100)
        print("Choose date")
        print("start - ", start_date)
        print("end - ", end_date)
        await self.control_panel_elements.timepicker().click()
        await self.control_panel_elements.date_from_input().fill(start_date)
        await self.control_panel_elements.date_to_input().fill(end_date)
        await self.control_panel_elements.apply_date_button().click()

    async def save_dashboard(self, apply_time_range, apply_vars):
        saveDashboardWrapperActions = SaveDashboardWrapperActions(self.page)
        await self.control_panel_elements.save_dashboard_button().click()
        await saveDashboardWrapperActions.apply_save_params(apply_time_range, apply_vars)
        await saveDashboardWrapperActions.confirm_save()



