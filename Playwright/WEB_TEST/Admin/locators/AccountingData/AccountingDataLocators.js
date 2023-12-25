import UiFormLocators from "../Common/uiFormLocators";
export class AccountingDataLocators {

    static leftSidePanelLocators = {

        selectPointTypeM: {
            alias: 'Меню выбора точек учета', 
            locator: UiFormLocators.dropdownItemById.locator("#cmdPeriodLength")
        },

        fromDateInput: {
            alias: 'Начальная дата',
            locator:  UiFormLocators.inputById.locator("#edtBeginDate")
        },

        toDateInput: {
            alias: 'Конечная дата',
            locator:  UiFormLocators.inputById.locator("#edtEndDate")
        },

    };

    static eventTableLocators = {
        tableRow: {
            alias: 'Строка таблицы событий',
            locator:  '#filtered-grid > tbody > tr'
        }, 
        timestampCell: {
            alias: 'Ячейка даты события',
            locator:  'td[aria-describedby="filtered-grid_Timestamp"]'
        },
        userCell: {
            alias: 'Ячейка пользователя вызвавшего событие',
            locator: 'td[aria-describedby="filtered-grid_Role"]'
        },
        operationCell: {
            alias: 'Ячейка типа события',
            locator: 'td[aria-describedby="filtered-grid_OperationType"]'
        },
    };

};

export default AccountingDataLocators