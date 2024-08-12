import asyncio
from src.modules.grafana.grafana import Grafana
from playwright.async_api import async_playwright
from src.modules.grafana.pages.dashboardPage import DashboardPage
from src.modules.grafana.locators.dashboardLocators import DashboardLocators
from src.modules.grafana.pages.loginPage import LoginPage
from settings import settings


class Debug:
    grafana = Grafana(10, 20, 30, 'http://coach-db-01.gtload.pd15.sol.mtp:3000/d/Ysv75q_nz/jmeter-test-overview-k8s', {})

    @staticmethod
    async def test_method():
        async with async_playwright() as p:
            page, context = await Debug.grafana.init_browser(p)
            try:
                dashboard_page = DashboardPage(page)
                await context.tracing.start(screenshots=True, snapshots=True)
                await page.goto(Debug.grafana.grafana_url)
                print("Go to page")
                await LoginPage(page).login(settings.grafana_login, settings.grafana_password)  # Логинимся
                print("Login")
                await page.wait_for_selector(DashboardLocators.GRID_LAYOUT)
                print("Grid layout uploaded")
                # await dashboard_page.dashboard_page_actions.control_panel_actions.save_dashboard(True, False)
                # print("Save dashboard")
                await dashboard_page.screenshot_all_panels("screenshots/")
            finally:
                print("Saving trace")
                await context.tracing.stop(path="trace.zip")


asyncio.run(Debug.test_method())