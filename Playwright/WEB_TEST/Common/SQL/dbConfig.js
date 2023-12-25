const DBMS = process.env.eDBMS;
const DB_USER = process.env.dbUser;
const DB_PASSWORD = process.env.dbPassword
const HOST = process.env.dbAddress;
const DATABASE = process.env.dbName;
const DB_PORT = process.env.dbPort;

const dbConfig = {
    postgres: {
        user: DB_USER,
        password: DB_PASSWORD,
        host: HOST,
        database: DATABASE,
        port: DB_PORT,
    },
    mssql: {
        user: DB_USER,
        password: DB_PASSWORD,
        server: HOST,
        database: DATABASE,
        options: {
            encrypt: false,
            trustServerCertificate: true,
          },
          connectionTimeout: 100000,
          requestTimeout: 100000 
    },
    selectedDBMS: DBMS,
};

export default dbConfig;
