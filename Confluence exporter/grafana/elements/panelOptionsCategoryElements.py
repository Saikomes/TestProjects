from src.modules.grafana.elements.panelOptionsPaneElements import PanelOptionsPaneElements

class PanelOptionsCategoryElements:
    def __init__(self, page, category_name):
        self.page = page
        self.options_category_name = category_name
        self.options_category_block = PanelOptionsPaneElements(page).options_category(category_name)

    def options_category_toggle(self):
        return self.page.get_by_label(f"Options group {self.options_category_name} toggle")
