from .basePage import BasePage
from src.modules.grafana.locators.loginPageLocators import LoginPageLocators


class LoginPage(BasePage):
    async def login(self, username: str, password: str):
        if await self.page.is_visible(LoginPageLocators.LOGIN_FORM):
            await self.page.locator(LoginPageLocators.USERNAME_INPUT).fill(username)
            await self.page.locator(LoginPageLocators.PASSWORD_INPUT).fill(password)
            await self.page.locator(LoginPageLocators.LOGIN_BUTTON).click()
