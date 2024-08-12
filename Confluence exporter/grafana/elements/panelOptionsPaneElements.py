from src.modules.grafana.locators.panelOptionsPaneLocators import PanelOptionsPaneLocators

class PanelOptionsPaneElements:
    def __init__(self, page):
        self.page = page
        self.panel_options_pane_locators = PanelOptionsPaneLocators

    def panel_options_pane(self):
        return self.page.getByLabel("Panel editor option pane content")

    def options_category(self, name):
        return self.page.locator('div[data-testid="options-category"]').filter(
            has=self.panel_options_pane().getByRole('heading', name=name, exact=True))

