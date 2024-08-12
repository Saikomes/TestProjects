from src.modules.grafana.elements.dashboardContentElements import DashboardContentElements
from playwright.async_api import expect


class DashboardContentActions:
    def __init__(self, page):
        self.page = page
        self.dashboard_content_elements = DashboardContentElements(page)

    async def check_row_expanded(self, row):
        row_classes:str = await row.get_attribute('class')
        if "react-draggable" in row_classes.split(' '):
            return False
        else:
            return True

    async def expand_row(self, row):
        row_title = self.dashboard_content_elements.row_title(row)
        if not await self.check_row_expanded(row):
            await row_title.click()
            await self.page.wait_for_load_state('networkidle')

    async def slick_row(self, row):
        row_title = self.dashboard_content_elements.row_title(row)
        if await self.check_row_expanded(row):
            await row_title.click()
            await self.page.wait_for_load_state('networkidle')

    async def expand_all_rows(self):
        rows = await self.dashboard_content_elements.data_row().all()
        for row in rows:
            await self.expand_row(row)

    async def slick_all_rows(self):
        rows = await self.dashboard_content_elements.data_row().all()
        for row in rows:
            await self.slick_row(row)


