const EventsTableLocators = {
    eventsTable: {locator: 'p-table#gridPlaceholder'},
    readingsTableViewport: {locator: 'cdk-virtual-scroll-viewport'},
    tableRow: {
        locator: `.slick-row`,
        alias: "Строка таблицы событий"
    },
    sortableHeader: {
        locator: (headerLabel) => `.ui-sortable-column[title="${headerLabel}"]`,
        alias: "Сортируемый заголовок"
    },
    rowColumn: {
        locator: `td`,
        alias: "Колонка строки"
    }
}

export default EventsTableLocators