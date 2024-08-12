from .panelWrapperLocators import PanelWrapperLocators


class SaveDashboardWrapperLocators(PanelWrapperLocators):

    @staticmethod
    def save_time_range_checkbox():
        return f'label:has-text("Save current time range as") >> div span'

    @staticmethod
    def save_variables_checkbox():
        return f'label:has-text("Save current variable values as dashboard default") >> div span'

    @staticmethod
    def save_changes_button():
        return f'label:has-text("Save current variable values as dashboard default") >> div span'
