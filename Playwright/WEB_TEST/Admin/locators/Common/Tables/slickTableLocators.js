import UiTableLocators from "./uiTableLocators";
const SlickTableLocators = {
    ...UiTableLocators,
    tableHeaderByValue: {
        alias: 'Заголовок колонки по текстовому значению',
        locator: (headerText) => `.slick-header-column span.slick-column-name:text("${headerText}")`
    },

    cellByIndex: {
        alias: 'Ячейка таблицы по индексу',
        locator: (columnIndex) => `slick-cell l${columnIndex} r${columnIndex}`
    },

    tableRow: {
        alias: 'Строка таблицы',
        locator: '.slick-row'
    },

    rowByColumnValue : {
        alias: 'Строка по значению колонки',
        locator: (columnIndex, value) => {
            const cellLocator = SlickTableLocators.cellByIndex.locator(columnIndex).replace('.', '');
            return `//div[contains(@class, "grid-canvas")]/div[contains(@class, "slick-row")][.//div[contains(@class, "${cellLocator}") and descendant-or-self::node()/text()[contains(., "${value}")]]]`;
        }
    }
};

export default SlickTableLocators;