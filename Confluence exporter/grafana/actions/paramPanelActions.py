from src.modules.grafana.elements.paramPanelElements import ParamPanelElements
from playwright.async_api import expect


class ParamPanelActions:
    def __init__(self, page):
        self.page = page
        self.param_panel_elements = ParamPanelElements(page)

    async def apply_params(self, params):
        print("Starting apply vars")
        for param_name, value in params.items():
            await self.param_panel_elements.param_button(param_name).click()
            print("Clicked param btn")
            checkboxes = await self.param_panel_elements.option_checkbox().all()
            print("Get checkboxes")
            for checkbox in checkboxes:
                if await checkbox.is_checked():
                    await checkbox.click()
                    print("Click on checkbox")
                    if not await checkbox.is_visible():
                        await self.param_panel_elements.param_button(param_name).click()
            print("Checkboxes finish")
            if isinstance(value, list):
                print("Value is list")
                for val in value:
                    print("val - ", val)
                    print("val - ", val)
                    print("self.param_panel_elements.parametrised_checkbox(val) - ", self.param_panel_elements.parametrised_checkbox(val))
                    await self.param_panel_elements.parametrised_checkbox(val).click()
                    print("click_1")
            else:
                print("click_2") # Здесь остановился и не выполнил нижнюю функцию
                print("value - ", value)
                print("self.param_panel_elements - ", self.param_panel_elements)
                print("await self.param_panel_elements.parametrised_checkbox(value) - ", self.param_panel_elements.parametrised_checkbox(value))
                await self.param_panel_elements.parametrised_checkbox(value).click()
                print("click_3")
            if await self.param_panel_elements.variable_input().is_visible():
                print("click_4")
                await self.page.get_by_test_id("wrapper").first.click()


