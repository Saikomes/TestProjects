import AccountsConfig from "./accountsConfig";

const autoCleantaskSettings = [
    { type: 'input', locator: '#DaysToStoreDeclinedMemberships', value: '30' },
    { type: 'input', locator: '#DaysToStoreLockedMemberships', value: '365' },
    { type: 'checkbox', locator: '#StopOnErrors', value: false }
];

const mailServiceSettings = [
    { type: 'input', locator: '#DisplayName', value: 'esTest@test-serv2.prosoft.ural.ru' },
    { type: 'input', locator: '#Email', value: 'esTest@test-serv2.prosoft.ural.ru' },
    { type: 'input', locator: '#Host', value: 'localhost' },
    { type: 'input', locator: '#Port', value: '465' },
    { type: 'toggle', locator: '#UseCredentials', value: false },
    { type: 'toggle', locator: '#IsDefault', value: true }
];

const refreshDBTaskSettings = [
    { type: 'input', locator: '#FiasDbPath', value: '\\\\ci-serv\\deps\\FiasTest' },
];

const importOsmTaskSettings = [
    { type: 'input', locator: '#OsmPath', value: '\\\\ci-serv\\deps\\OsmDataTest' },
];

const assignAddressesTaskSettings = [
    { type: 'checkbox', locator: '#ProcessOnlyBuildingsWithoutAddress', value: true },
];

const autoCleanUsersConfig = [
    { type: AccountsConfig.customerStatus.Blocked, message: "удалено заблокированных учетных записей: (\\d+)", historyColumnName: "LastLockedDate"},
    { type: AccountsConfig.customerStatus.Rejected, message: "удалено отклоненных учетных записей: (\\d+)", historyColumnName: "RequestProcessedDate"},
  ];

const taskExecutionRegime = {
    manual: { scheludeMenuOption: 'Вручную пользователем', scheduleColumnDesc: "Вручную"},
    const: { scheludeMenuOption: 'Постоянно', scheduleColumnDesc: "Постоянно"}
}


const serviceValidationMessages = {
    refreshDBValidationMessage: "Добавлено адресов: (\\d+)",
    importOsmValidationMessage: "Объектов учета с координатами в БД: (\\d+)",
    mailValidationMessage: "Отправлено (\\d+) сообщений",
    assignAddressesValidationMessage: "Проверено объектов: (\\d+)"
}

const pop3Settings = {
    user: process.env.pop3User || "user",
    password: process.env.pop3Password || "password",
    host: process.env.pop3Host || "host"
}

const dateDiffInDays = 400;

const autoExecutionIntervalSeconds = 30

const taskPendingTimeoutInSeconds = 300

const expectedMailMessage = "Ваши регистрационные данные прошли проверку администратором системы"

const tolleratedMailDelayinMs = 300000

const testCustomerEmail = 'ba2@test-serv2.prosoft.ural.ru'

const testCustomerName = 'testMailCustomer'

const testStatusCustomer = "teststatuscustomer@test.ural.ru";

const testStatusPassword = "12345678"

const TaskManagerConfig = {
    autoCleantaskSettings,
    refreshDBTaskSettings,
    importOsmTaskSettings,
    assignAddressesTaskSettings,
    mailServiceSettings,
    autoCleanUsersConfig,
    dateDiffInDays,
    taskExecutionRegime,
    autoExecutionIntervalSeconds,
    taskPendingTimeoutInSeconds,
    serviceValidationMessages,
    pop3Settings,
    expectedMailMessage,
    tolleratedMailDelayinMs,
    testCustomerEmail,
    testCustomerName,
    testStatusCustomer,
    testStatusPassword
}

export default TaskManagerConfig;

