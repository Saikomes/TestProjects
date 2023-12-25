const testOperatorName = 'testRightsOperator'

const testOperatorPassword = '12345678'

const testClientName = 'testClient1'

const testClientPassword = '12345678'

const testClientEmail = 'testсlientemail1@testdomain.com'

const groupType = {
    Windows: 'Группы Windows',
    System: 'Системные',
    Custom: 'Пользовательские группы'
}

const accountType = {
    Operator: 3,
    Admin: 1
};

const accountActionsUrl = {
    Approve: '/ManageCustomerAccounts/Approve',
    Decline: '/ManageCustomerAccounts/Decline',
    Lock: '/ManageCustomerAccounts/Lock',
    Unlock: '/ManageCustomerAccounts/Unlock',
    Notify: '/ManageCustomerAccounts/Notify'
};

const customerStatus = {
   Created: { name: 'Created', value: 1 },
   Activated: { name: 'Activated', value: 2},
   Approved: { name: 'Approved', value: 3 },
   Rejected: { name: 'Rejected', value: 4},
   Blocked: { name: 'Blocked', value: 5 },
};

const employeeTestGroupName = 'testGroup'

const abonentTestGroupName = 'testGroup'

const employeeTestGroupPermissions = {
    groups: [
        {
            groupName: 'Разрешения на страницы',
            permissions: [
                'Объекты и точки учета',
                'Измерительные комплексы',
                'Отчеты'
            ]
        },
        {
            groupName: 'Разрешения на отчеты',
            permissions: [
                'Абонентская база',
                'Акт учета перетоков',
            ]
        }
    ]
};

const abonentTestGroupPermissions = {
    groups: [
        {
            groupName: 'Разрешения на страницы',
            permissions: [
                'Отчеты'
            ]
        },
        {
            groupName: 'Разрешения на отчеты',
            permissions: [
                'Акт учета перетоков',
            ]
        }
    ]
};

const guarantedAdminPages = ["Справочники", "Реестр оборудования"]

const AccountsConfig = {
    testOperatorName,
    testClientName,
    testClientPassword,
    testClientEmail,
    testOperatorPassword,
    groupType,
    employeeTestGroupName,
    employeeTestGroupPermissions,
    abonentTestGroupPermissions,
    abonentTestGroupName,
    accountType,
    guarantedAdminPages,
    customerStatus,
    accountActionsUrl
}

export default AccountsConfig;

