from src.modules.grafana.actions.panelWrapperActions import PanelWrapperActions
from src.modules.grafana.elements.saveDashboardWrapperElements import SaveDashboardWrapperElements
from playwright.async_api import expect


class SaveDashboardWrapperActions(PanelWrapperActions):
    def __init__(self, page):
        super().__init__(page)
        self.save_dashboard_wrapper_elements = SaveDashboardWrapperElements(self.page)

    async def apply_save_params(self, apply_time_range, apply_vars):
        if apply_time_range:
            await self.save_dashboard_wrapper_elements.save_time_range_checkbox().click()
        if apply_vars:
            await self.save_dashboard_wrapper_elements.save_variables_checkbox().click()

    async def confirm_save(self):
        #Кнопка в неактивном состоянии если нечего сохранять
        if not await self.save_dashboard_wrapper_elements.save_changes_button().is_disabled():
            await self.save_dashboard_wrapper_elements.save_changes_button().click()
        else:
            await self.save_dashboard_wrapper_elements.cancel_changes_button().click()
