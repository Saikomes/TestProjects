const selectPeriodOptions = {
    Day: { name: 'Day', value: '1' },
    Week: { name: 'Week', value: '2'},
    Month: { name: 'Month', value: '3' },
    Quartal: { name: 'Quartal', value: '4'},
    Year: { name: 'Year', value: '5' },
    Other: { name: 'Other', value: '6' }
}

const testPeriods = [selectPeriodOptions.Day, selectPeriodOptions.Week]

const AuditConfig = {
    selectPeriodOptions,
    testPeriods
}

export default AuditConfig;
