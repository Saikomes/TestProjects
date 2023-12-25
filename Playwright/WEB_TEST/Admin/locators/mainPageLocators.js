const MainPageLocators = {
    mainMenu: {alias: 'Меню главной страницы', locator: '.b-admin-main'},
    mainMenuPageItem: { alias: 'Элемент меню главного меню', locator: '//*[contains(@class, "b-adm-pagelink") and contains(@class, "menuItem")]' },
    mainMenuPageItemByName: {
        locator: (name) => `.b-adm-pagelink.menuItem > .b-nav-text > .b-nav-title:has-text("${name}")`,
        alias: 'Меню по имени'
    },
    mainMenuItemTitle: { alias: 'Заголовок элемента главного меню', locator: `.b-nav-text >> .b-nav-title`},
    subMenuPageItem: { alias: 'Элемент подменю главного меню', locator: '.b-adm-pagelink.b-submenu-item' },
    subMenuItemTitle: { alias: 'Заголовок элемента главного меню', locator: '.nav-submenu >> .b-nav-title' },
    toolBarTitle: { alias: 'Заголовок панели инструментов', locator: '.b-adm-toolbar-title' },
    changeTypeButton: { alias: 'Кнопка выбора типа кабинета', locator: '.select2-container.role-switcher .select2-choice' },
    changeTypeMenu: { alias: 'Меню выбора типа кабинета', locator: '.select2-results' },
    changeTypeMenuItem: { alias: 'Элемент меню выбора типа кабинета', locator: '.select2-result-label' },
    aboutButton: { alias: 'Кнопка вызова окна "О программе"', locator: '#navAbout' },
    helpButton: { alias: 'Кнопка вызова окна "Помощь"', locator: '#navHelp' },
    logoutButton: { alias: 'Кнопка вызова окна "Выход"', locator: '#winlogout' },
    logoutButton: { alias: 'Кнопка выхода из аккаунта', locator: '.win-user-action.win-logout'},
    aboutDialogContent: { alias: 'Содержимое диалога "О программе"', locator: 'div.b-about-dialog' },
    helpDialog: {alias: 'Диалог "Помощь"', locator: '.help-dialog'},
    clientNameInput: { alias: 'Поле ввода имени абонента', locator: '.account-link.i-s2-like-input' },
    linkToClientPageByEmail: {
        locator: (clientEmail) => `#admin-office-impers-dd-cont li a:has(span[class=ac-email]:is(:text("${clientEmail}")))`,
        alias: 'Меню по имени'
    },
    adminHeaderTitle: { alias: 'Заголовок кабинета администратора', locator: '.b-admin-header h2' },

};

export default MainPageLocators