import UiTableLocators from "./uiTableLocators";
const JqTableLocators = {
    ...UiTableLocators,
    tableRowById: {
        alias: 'Строка таблицы по id',
        locator: (rowIdValue) => `tr[id="${rowIdValue}"]`
    },

    tableRowByGridValue: {
        alias: 'Строка таблицы по значению ячейки',
        locator: (columnHeaderId, gridValue) => {
            const columnDescription = columnHeaderId.replace('#', '');
            return `//tr[contains(@class, "jqgrow") and .//td[@aria-describedby="${columnDescription}" and contains(., "${gridValue}")]]`
        } 
    },

    tableRow: {
        alias: 'Строка таблицы',
        locator: `.ui-row-ltr`
    },

    tableCell: {
        alias: 'Ячейка таблицы по описанию',
        locator: (cellDescription) => `td[aria-describedby="${cellDescription}"]`
    },

};

export default JqTableLocators;