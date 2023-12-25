const CLIENT_EMAIL = process.env.clientEmail
const CLIENT_PASSWORD = process.env.clientPassword
const CLIENT_NAME = 'testAbonent'
// Pg
// select
// encode(sha256(convert_to(encode('\x3632623932633230353961633562303739363462303731353264323334623730', 'escape') || '12345678', 'UTF8')), 'hex');
// Ms sql
// select HASHBYTES('SHA2_256'
// , '62b92c2059ac5b07964b07152d234b70' -- добавка
// + 'mypassword123' -- пароль
// )
const CLIENT_ADDRESS = process.env.clientAddress
const SERIAL_NUMBER = process.env.expectedSerial
const DBMS = 'PGSQL';

const ClientTestConfig = {
    DBMS,
    CLIENT_EMAIL,
    CLIENT_PASSWORD,
    CLIENT_ADDRESS,
    SERIAL_NUMBER,
    CLIENT_NAME,
}

export default ClientTestConfig;
