import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
import ClientTestConfig from "../../../Client/config/clientTestConfig";
export async function getValue(table, keyColumn, keyValue, valueColumn) {
    const paramField = dbConfig.selectedDBMS === 'PGSQL' ? valueColumn.toLowerCase() : valueColumn;
    let query = `select ${valueColumn} from ${table} where ${keyColumn}='${keyValue}'`
    const result = await queryDatabase(query)
    if (result && result.length > 0 && result[0][paramField] !== undefined) {
        const paramValue = result[0][paramField];
        return paramValue;
    } else {
        return "undefined";
    }
}