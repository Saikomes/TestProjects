import { connectDBMS, connectMSSQL, connectPostgres } from "./methods/connectDB";
import { queryDatabase, queryMSSQL, queryPostgres } from "./methods/executeQuery";
import { esDistrVersion } from "./methods/esDistVersion";
import { createCustomer } from "./methods/createCustomer";
import { createEmployee } from "./methods/createEmpoyee";
import { changeCustomerStatus } from "./methods/changeCustomerStatus";
import { decreaseCustomerDate } from "./methods/decreaseCustomerActDate";
import { getValue } from "./methods/getValue";
import { setValue } from "./methods/setValue";
import { getUserAccountId } from "./methods/getUserAccountId";
import { getAccountingDataIndications } from "./methods/getAccountingDataIndications";
import { getHashedPassword } from "./methods/getHashedPassword";
import { getAccountingDataEvents } from "./methods/getAccountingDataEvents";
class SQL {

}

SQL.connectDBMS = connectDBMS;
SQL.connectMSSQL = connectMSSQL;
SQL.connectPostgres = connectPostgres;
SQL.queryDatabase = queryDatabase;
SQL.queryMSSQL = queryMSSQL;
SQL.queryPostgres = queryPostgres;
SQL.esDistrVersion = esDistrVersion
SQL.createCustomer = createCustomer
SQL.createEmployee = createEmployee
SQL.changeCustomerStatus = changeCustomerStatus
SQL.decreaseCustomerDate = decreaseCustomerDate
SQL.getValue = getValue
SQL.setValue = setValue
SQL.getAccountingDataIndications = getAccountingDataIndications
SQL.getAccountingDataEvents = getAccountingDataEvents
SQL.getUserAccountId = getUserAccountId
SQL.getHashedPassword = getHashedPassword

export default SQL;