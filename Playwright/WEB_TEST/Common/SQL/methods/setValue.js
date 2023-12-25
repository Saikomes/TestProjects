import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
import ClientTestConfig from "../../../Client/config/clientTestConfig";
export async function setValue(table, keyColumn, keyValue, valueColumn, value) {
    const paramField = dbConfig.selectedDBMS === 'PGSQL' ? valueColumn.toLowerCase() : valueColumn;
    let query;
    if(value == "undefined") {
        query = `DELETE FROM  ${table} WHERE ${keyColumn} = '${keyValue}'`;
    }
    else {
        const isValueNull = value === null;

        let queryValue = isValueNull ? 'NULL' : `'${value}'`;
      
        query = `UPDATE ${table} SET ${paramField} = ${queryValue} WHERE ${keyColumn} = '${keyValue}'`;
    }
    const result = await queryDatabase(query);
}