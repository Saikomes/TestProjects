import TestFunctions from './testFunctions'

export class PageActions {

    static async changeWindowVisability(page, menuItem) {
        await TestFunctions.clickButton(page, 'Окна');
        await TestFunctions.clickMenuItem(page, menuItem);
    }
}

export default PageActions