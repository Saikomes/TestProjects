import dbConfig from './dbConfig';
import { Client } from 'pg';
import sql from 'mssql';

class DatabaseHelper {
  
  static async connectPostgres() {
    const client = new Client(dbConfig.postgres);
    await client.connect();
    return client;
  }

  static async connectMSSQL() {
    const pool = await sql.connect(dbConfig.mssql);
    return pool;
  }

  static async queryPostgres(query, params = []) {
    const client = await this.connectPostgres();
    try {
      const res = await client.query(query, params);
      client.end();
      return res.rows;
    } 
    catch (err) {
      console.error('Error running query on PostgreSQL', err);
    }
  }

  static async queryMSSQL(query, params = []) {
    const pool = await this.connectMSSQL();
    try {
      const request = pool.request();
      params.forEach(param => request.input(param.name, param.type, param.value));
      const result = await request.query(query);
      pool.close();
      return result.recordset;
    } 
    catch (err) {
      console.error('Error running query on MSSQL', err);
    }
  }

  static async queryDatabase(query, params = []) {
    if (dbConfig.selectedDBMS === 'PGSQL') {
      return await this.queryPostgres(query, params);
    } 
    else if (dbConfig.selectedDBMS === 'MSSQL') {
      return await this.queryMSSQL(query, params);
    } 
    else {
      console.error('Invalid DBMS selected');
    }
  };
}

export default DatabaseHelper;
