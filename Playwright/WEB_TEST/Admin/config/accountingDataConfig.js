const nodeSelectionCriteria = {
    None: 0,
    Name: 1,
    Id: 2,
    SN: 3
};

const customerCriteria = {
    NODE: 'Node',
    ID: 'Id',
    NONE: 'None'
}

const expectedChartLegend = ['Счётчик ээ, A прием, кВт*ч']

const AccountingDataConfig = {
    nodeSelectionCriteria,
    customerCriteria,
    expectedChartLegend
}

export default AccountingDataConfig;
