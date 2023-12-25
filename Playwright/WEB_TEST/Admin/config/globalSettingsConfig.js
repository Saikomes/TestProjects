import uiFormElementTypes from "./uiFormElementTypes";
const externalSystemSettings = [
    {
        id: 'DefaultTimeSchemaId',
        ui: {
            type: uiFormElementTypes.Dropdown, 
            locator: '#DefaultTimeSchemaId', 
            value: "300"
        },
        db: {
            table: 'CONFIG',
            keyColumn: 'paramname',
            keyValue: "CustomersTimeSchema",
            valueColumn: "paramValue"
        }
    },
    {
        id: 'ConsumptionRulesModel_ParameterTypeForInput', 
        ui: {
            type: uiFormElementTypes.Dropdown, 
            locator: '#ConsumptionRulesModel_ParameterTypeForInput', 
            value: "2"
        },
        db: {
            table: 'ConsumptionParamRule',
            keyColumn: 'id_group',
            keyValue: "1",
            valueColumn: "id_param",
        }
    }
];

const GlobalSettingsConfig = {
    externalSystemSettings
}

export default GlobalSettingsConfig;