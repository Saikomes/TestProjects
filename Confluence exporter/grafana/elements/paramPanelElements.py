from src.modules.grafana.locators.paramPanelLocators import ParamPanelLocators


class ParamPanelElements:
    def __init__(self, page):
        self.page = page
        self.param_panel_locators = ParamPanelLocators()

    def variable_input(self):
        return self.page.locator(self.param_panel_locators.VARIABLE_INPUT)

    def param_button(self, param_name):
        return self.page.locator(self.param_panel_locators.param_button(param_name))

    def option_checkbox(self):
        return self.page.locator(self.param_panel_locators.option_checkbox())

    def parametrised_checkbox(self, param_value):
        return self.page.locator(self.param_panel_locators.parametrised_checkbox(param_value))

    def param_panel(self):
        return self.page.locator(self.param_panel_locators.PARAM_PANEL)
