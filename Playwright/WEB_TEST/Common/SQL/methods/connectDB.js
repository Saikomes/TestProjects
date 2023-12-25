import dbConfig from "../dbConfig";
import { Client } from 'pg';
import sql from 'mssql';

export async function connectPostgres() {
  const client = new Client(dbConfig.postgres);
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
    throw err;
  }
}

export async function connectMSSQL() {
  try {
    const pool = await sql.connect(dbConfig.mssql);
    return pool;
  } catch (err) {
    console.error('Error connecting to MSSQL', err);
    throw err;
  }
}

export async function connectDBMS() {
  if (dbConfig.selectedDBMS === 'PGSQL') {
    return connectPostgres;
  } 
  else if (dbConfig.selectedDBMS === 'MSSQL') {
    return connectMSSQL;
  } 
}

