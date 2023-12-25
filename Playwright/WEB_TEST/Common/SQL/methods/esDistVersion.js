import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";

export async function esDistrVersion() {
     const paramName = dbConfig.selectedDBMS === 'PGSQL' ? 'ESDistrVersion' : 'esDistrVersion';
     const paramField = dbConfig.selectedDBMS === 'PGSQL' ? 'paramvalue' : 'ParamValue';
     const query = `SELECT ${paramField} FROM CONFIG WHERE ParamName = '${paramName}'`;

     const result = await queryDatabase(query);
     return result[0][paramField];
}