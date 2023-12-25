const treeModeOptions = {
    Node: { name: 'По объектам', value: 'Node' },
    Customer: { name: 'По потребителям', value: 'Customer'},
    Address: { name: 'По адресам', value: 'Address' },
    Account: { name: 'По учетным записям', value: 'Account'},
    CalcSchema: { name: 'По расчетным схемам', value: 'CalcSchema' }
}

const searchOptions = {
    Name: { name: 'Имя', value: '1' },
    ID: { name: 'ИД', value: '2'},
    Number: { name: '№ счетчика', value: '3' },
}


const PointsTreeTabConfig = {
    treeModeOptions,
    searchOptions
}

export default PointsTreeTabConfig;