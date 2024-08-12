class ParamPanelLocators:
    VARIABLE_INPUT = 'input.gf-form-input'
    PARAM_PANEL = 'div.scrollbar-view > div > section'

    @staticmethod
    def param_button(param_name):
        return f'.gf-form:has(label:text-is("{param_name}")) >> button'

    @staticmethod
    def option_checkbox():
        return '.gf-form >> [role="checkbox"]'

    @staticmethod
    def parametrised_checkbox(param_value):
        return f'.gf-form >> [role="checkbox"]:has(span:nth-child(2):text-is("{param_value}"))'
