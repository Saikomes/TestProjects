import UiFormLocators from "../locators/Common/uiFormLocators";
import ExecutiveUserLocators from "../locators/CustomersAndContracts/ExecutiveUserLocators";
import DeviceRegistryLocators from "../locators/AccountingStructure/DeviceRegistry/deviceRegistryLocators";
import EditDocumentDialogLocators from "../locators/Common/Dialogs/editDocumentDialogLocators";

const deviceId = '21970'

const documentNumber = '1234567'

const testSubjectName = 'test'

const testContractNumber = '1234'

const firstExecutiveUserName = 'Test User One'

const secondExecutiveUserName = 'Test User Second'

const subjectSearchOptions = {
    Name: { name: 'Имя', value: '1' },
    ID: { name: 'ИД', value: '2'},
    ContractNumber: { name: '№ договора', value: '3' },
    CounterNumber: { name: '№ счетчика', value: '4' },
    AbonentNumber: { name: 'Аб. номер', value: '5' },
}
const testSubjectSettings = [
    { type: 'input', locator: '#Name', value: testSubjectName },
    { type: 'input', locator: UiFormLocators.inputByTitle.locator("mRID"), value: '1' },
    { type: 'input', locator: UiFormLocators.inputByTitle.locator("Полное наименование"), value: 'Тестовый субъект' }
];

const testContractSettings = [
    { type: 'input', locator: '#Number', value: testContractNumber },
    { type: 'input', locator: UiFormLocators.inputByTitle.locator("Часы больших нагрузок"), value: '1' },
];

const testDocumentSettings = [
    { type: 'input', locator: EditDocumentDialogLocators.documentNumberinput.locator, value: documentNumber },
    { type: 'input', locator: EditDocumentDialogLocators.filePathInput.locator, value: 'test' },
    { type: 'select2', locator: EditDocumentDialogLocators.documentTypeSelect.locator, value: 'Прочие документы' },
];

const testDocumentTableSettings = [
    { type: 'input', locator: '#gs_DocumentNumber', value: documentNumber },
];

const testExecutiveUserSettings = {
    firstTestUser: {
        name: { type: 'input', locator: '#Name', value: firstExecutiveUserName }
    },
    secondTestUser: {
        name: { type: 'input', locator: '#Name', value: secondExecutiveUserName }
    }
};

const testMergeUsersSettings = [
    { type: 'select2', locator: ExecutiveUserLocators.mergePersonelDialogLocators.deleteUserSelect.locator, value: firstExecutiveUserName},
    { type: 'select2', locator: ExecutiveUserLocators.mergePersonelDialogLocators.mergedUserSelect.locator, value: secondExecutiveUserName},
];


const CustomersAndContractsConfig = {
    subjectSearchOptions,
    testSubjectSettings,
    testContractSettings,
    testExecutiveUserSettings,
    testMergeUsersSettings,
    deviceId,
    documentNumber,
    testSubjectName,
    testContractNumber,
    firstExecutiveUserName,
    secondExecutiveUserName,
    testDocumentSettings,
    testDocumentTableSettings
}

export default CustomersAndContractsConfig;

