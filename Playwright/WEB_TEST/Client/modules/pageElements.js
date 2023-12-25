const PageElements = {
    areaLogin: { alias: 'Форма логина', locator: 'account-logon' },
    dialog: { alias: 'Диалог', locator: 'div.ui-dialog' },
    aboutDialogContent: { alias: 'Содержимое диалога "О программе"', locator: 'div.b-about-dialog' },
    mainMenuPageItem: { alias: 'Элемент меню главного меню', locator: 'a.b-index-blocks-item' },
    headerPageTitle: { alias: 'Заголовок страницы', locator: '.header-page-title' },
};

PageElements.menuItemTitle = {
    alias: 'Заголовок элемента главного меню',
    locator: `${PageElements.mainMenuPageItem.locator} span`
};


export default PageElements