from src.modules.grafana.locators.dashboardContentLocators import DashboardContentLocators


class DashboardContentElements:
    def __init__(self, page):
        self.page = page
        self.dashboard_content_locators = DashboardContentLocators

    def content_wrapper(self):
        return self.page.locator(self.dashboard_content_locators.CONTENT_WRAPPER)

    def grid_layout(self):
        return self.page.locator(self.dashboard_content_locators.GRID_LAYOUT)

    def data_row(self):
        return self.page.locator(self.dashboard_content_locators.DATA_ROW)

    def data_row_by_name(self, name):
        return self.data_row().filter(has_text=name)

    def row_title(self, row):
        return row.locator(self.dashboard_content_locators.DATA_ROW_TITLE)

