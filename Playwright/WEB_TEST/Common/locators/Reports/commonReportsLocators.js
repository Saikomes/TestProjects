export class CommonReportsLocators {

    static reportsSideBarLocators = {
        reportsSideBar: { 
            alias: 'Боковая панель страницы "Отчеты"', 
            locator: '.reportsSideBar'
        },

        slickToggleForCategory: {
            alias: 'Переключатель категории отчетов',
            locator: (categoryName) => `//span[@class='slick-reporting-report-name' and text()='${categoryName}']/preceding-sibling::span[contains(@class, 'slick-toggle')]`,
        },

        reportRowName: {
            alias: 'Название отчета',
            locator: `.slick-reporting-report-name`,
        },

        reportRowByName: {
            alias: 'Строка отчета по имени',
            locator: (reportName) => `//span[@class='slick-reporting-report-name' and text()='${reportName}']/ancestor::div[contains(@class, 'slick-cell')]`,
        },

    };

    static reportParamLocators = {

        reportParamArea: {
            alias: 'Область параметров отчета', 
            locator: '.b-rp-container'
        },

        buttonShowReport: {
            alias: 'Кнопка "Сформировать отчет"', 
            locator: '.btnShowReport'
        },

        periodDurationDropdown: {

            alias: 'Выбор периода', 
            locator: 'div.period-duration'
        },

        periodStart: {

            alias: 'Выбор начала периода', 
            locator: '#periodStart'
        },

        periodEnd: {

            alias: 'Выбор конца периода', 
            locator: '#periodEnd'
        },

        selectFormatDropMenu: {

            alias: 'Меню выбора формата отчета', 
            locator: '.select2-container.export-rep-to'
        },

        reportParamSelect: {

            alias: 'Параметр для отчета', 
            locator: (param) => `.report-details-row:has(.reports-details-labelcont:has-text("${param}")) >> .select2-container`
        },


        optionByName: {
            alias: 'Опция меню выбора формата отчета',
            locator: (optionName) => `//li[contains(@class, 'select2-result')]/div[contains(@class, 'select2-result-label') and contains(., '${optionName}')]`,
        },

    };
};

export default CommonReportsLocators