const OPERATOR_USER = process.env.operatorLogin;
const ADMIN_USER = process.env.adminLogin;
const ADMIN_PASSWORD = process.env.adminPassword;
const ADMIN_ADDRESS = process.env.adminAddress;
const SERIAL_NUMBER = process.env.expectedSerial;
const DBMS = process.env.eDBMS;

const AdminTestConfig = {
    DBMS,
    ADMIN_USER,
    OPERATOR_USER,
    ADMIN_PASSWORD,
    ADMIN_ADDRESS,
    SERIAL_NUMBER
}


export default AdminTestConfig;
