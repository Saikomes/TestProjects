import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
export async function changeCustomerStatus(email, state) {
    let query
    if (dbConfig.selectedDBMS === 'PGSQL') {
        query = `UPDATE UserAccount
        SET State = ${state}
        WHERE Email = '${email}'      
        `
    }
  else {
    query = `
    UPDATE UserAccount
    SET State = ${state}
    WHERE Email = '${email}'
    `;
  }
  const result = await queryDatabase(query)
}