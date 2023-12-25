export class PageActions {

    static async goBack(page) {
        await page.goBack();
    }

}

export default PageActions;
