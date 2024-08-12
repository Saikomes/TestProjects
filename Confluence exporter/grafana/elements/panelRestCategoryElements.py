from src.modules.grafana.elements.panelOptionsCategoryElements import PanelOptionsCategoryElements

class PanelRestCategoryElements(PanelOptionsCategoryElements):
    def __init__(self, page):
        super().__init__(page, 'REST Integration')

    def payload_input(self):
        return self.options_category_block.getByLabel("REST Integration Payload").locator('textarea')