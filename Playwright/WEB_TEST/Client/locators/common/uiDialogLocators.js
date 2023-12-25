const UiDialogLocators = {
    dialogByTitle: {
        alias: 'диалог по заголовку',
        locator: (title) => `p-dialog[header="${title}"]`
    },
    dialogOptionByName: {
        alias: 'Опция диалога по имени',
        locator: (optionName) => `p-footer button[label="${optionName}"]`
    },
    closeButton: {
        alias: 'Кнопка закрыть диалог',
        locator: `.ui-dialog-titlebar-close`
    }
}

export default UiDialogLocators