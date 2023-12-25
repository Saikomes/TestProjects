const ToolTipDialogLocators = {
    toolTipDialog: {
        alias: 'Тултип диалог',
        locator: '.ui-tooltip'
    },

    toolTipDialogByLabel: {
        alias: 'Тултип диалог по заголовку',
        locator: (title) => `.ui-tooltip:has(.ui-tooltip-title:text-is("${title}"))`
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

export default ToolTipDialogLocators