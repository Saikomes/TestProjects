from src.modules.grafana.elements.panelWrapperElements import PanelWrapperElements
from playwright.async_api import expect


class PanelWrapperActions:
    def __init__(self, page):
        self.page = page
        self.panel_wrapper_elements = PanelWrapperElements(page)

    async def switch_to_tab(self, tab_name):
        await self.panel_wrapper_elements.tab_by_name(tab_name).click()

    async def export_csv(self, file_path):
        await self.switch_to_tab("Data")
        download_button = self.panel_wrapper_elements.download_csv_button()
        if await download_button.is_visible():
            async with self.page.expect_download() as download_info:
                await self.panel_wrapper_elements.download_csv_button().click()
            download = await download_info.value
            await download.save_as(file_path)

    async def close_wrapper(self):
        await self.panel_wrapper_elements.close_wrapper_button().click()



