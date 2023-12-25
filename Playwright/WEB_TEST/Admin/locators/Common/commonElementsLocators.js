import UiFormLocators from "./uiFormLocators"
export class CommonElementsLocators {

    static horizontalMenuLocators = {
        toolBarTitle: { alias: 'Заголовок панели инструментов', locator: '.b-adm-toolbar-title' },
        horizontalMenu: { alias: 'Горизонтальное меню', locator: '#title-pane > div > ul.b-admin-horizontal-menu.menu' },
        horizontalMenuFolder: {
            locator: `.b-horizontal-menu-first-level-li.folder`,
            alias: 'Выпадающее меню'
        },
        horizontalMenuItem: {
            locator: (href) => `a.b-horizontal-menu-adm-pagelink.menuItem[href*="${href}"]`,
            alias: 'Элемент горизонтального меню'
        },
        horizontalMenuTitle: {
            locator: `span.b-horizontal-menu-nav-title`,
            alias: 'Заголовок элемента горизонтального меню'
        },
        horizontalSubMenuItem: {
            locator: (href) => `a.b-horizontal-menu-submenu-item[href*="${href}"]`,
            alias: 'Элемент подменю горизонтального меню'
        },
        horizontalMenuItemButton: { alias: 'Кнопка расширения/перехода на новую страницу', locator: 'span.b-horizontal-menu-navicon' },
        prosoftLogo: {
            locator: '.b-leftside-header-tenant-logo-small',
            alias: 'Логотип(переход на главную)'
        },
        exceptionMessage: {
            locator: '.b-exception-message',
            alias: 'Сообщение исключения'
        }

    }
    
    static toolTipDialogLocators = {
        toolTipDialog: {
            alias: 'Тултип диалог',
            locator: '.ui-tooltip-dialogue'
        },
        toolTipDialogText: {
            alias: 'Текст тултип диалога',
            locator: '.ui-tooltip-content >> div >> p'
        },
        toolTipOptionButton: {
            alias: 'Опция диалога',
            locator: (optionName) => `.ui-tooltip-content >> button:has-text("${optionName}")`
        }
    }

    static uiDialogLocators = {
        dialogByTitle: {
            alias: 'диалог по заголовку',
            locator: (title) => `.ui-dialog:has(.ui-dialog-titlebar:has-text("${title}"))`
        },
        dialogByLabel: {
            alias: 'диалог по маркировке',
            locator: (label) => `.ui-dialog[aria-labelledby=${label}]`
        },
        dialogOptionByName: {
            alias: 'Опция диалога по имени',
            locator: (optionName) => `.ui-button:has-text("${optionName}")`
        },
        closeButton: {
            alias: 'Кнопка закрыть диалог',
            locator: `.ui-dialog-titlebar-close`
        }
    }

    static controlPaneLocators = {

        controlPanel: {
            alias: 'Панель управления таблицей',
            locator: '.table-toolbar'
        },
        
        searchInput: {
            alias: 'Поле ввода поиска',
            locator:  UiFormLocators.inputById.locator("#edtSearchPoint")
        },

        searchButton: {
            alias: 'Кнопка поиска',
            locator:  '#btnSearchPoint'
        },

        buttonAdd: {
            alias: 'Кнопка "Добавить"',
            locator:  '#btnAdd'
        }
    }

    static operationSuccessTooltipLocators = {
        successToolTip: {
            alias: 'Уведомление об успешной операции',
            locator:  '.ui-tooltip-success'
        },
    }
};

export default CommonElementsLocators