import AdminMainPageElements from "../../elements/MainPage/adminMainPageElements";
import AdminMainPageMenuElements from "../../elements/MainPage/adminMainPageMenuElements";
import AccountsConfig from "../../config/accountsConfig";
import ClientMainPageMenuElements from "../../../Client/elements/mainPage/clientMainPageMenuElements";
import { expect } from "@playwright/test";

class MainPageActions {

    static async changeCabinetRegime(page, regime) {
        await AdminMainPageElements.changeTypeButton(page).click()
        await AdminMainPageElements.changeTypeMenuItemByName(page, regime).click()
    }

    static async clickAboutButton(page) {
        await AdminMainPageElements.aboutButton(page).click()
    }

    static async clickHelpButton(page) {
        await AdminMainPageElements.helpButton(page).click()
    }

    static async clickLogoutButton(page) {
        await AdminMainPageElements.logoutButton(page).click()
    }

    static async switchToClientPage(page, clientEmail) {
        await AdminMainPageElements.clientNameInput(page).fill(clientEmail)
        await AdminMainPageElements.linkToClientPageByEmail(page, clientEmail).click()
    }

    static async waitForMainMenu(page) {
        const menuItem = AdminMainPageElements.mainMenuItem(page);
        await menuItem.first().isVisible();
    }

    static async logout(page) {
        await AdminMainPageElements.logoutButton(page).click()
    }
    
}

export default MainPageActions;
