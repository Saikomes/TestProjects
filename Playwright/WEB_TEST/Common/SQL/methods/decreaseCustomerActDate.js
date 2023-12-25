import mssql from 'mssql';
import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";

export async function decreaseCustomerDate(columnName, clientEmail, days) {
  let query;
  const params = [
    { name: 'days', value: days, type: mssql.Int },
    { name: 'clientEmail', value: clientEmail, type: mssql.NVarChar }
  ];
  
  if (dbConfig.selectedDBMS === 'PGSQL') {
    query = `UPDATE UserAccountHistory
             SET ${columnName} = NOW() - ($1 * INTERVAL '1 day')
             WHERE ID_UserAccount = (SELECT id_useraccount FROM UserAccount WHERE email = $2)`;
  } else {
    query = `UPDATE UserAccountHistory
             SET ${columnName} = DATEADD(day, -@days, GETDATE())
             WHERE ID_UserAccount = (SELECT ID_UserAccount FROM UserAccount WHERE Email = @clientEmail)`;
  }
  
  const result = await queryDatabase(query, params);
}