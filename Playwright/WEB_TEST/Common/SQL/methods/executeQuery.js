import dbConfig from '../dbConfig';
import { connectPostgres, connectMSSQL } from './connectDB';

export async function queryPostgres(query, params = []) {
    const client = await connectPostgres();
    try {
        const res = await client.query(query, params.map(p => p.value));
        client.end();
        if(res.length) {
            return res[res.length -1 ].rows;
        }
        else
            return res.rows;
    }
    catch (err) {
        console.error('Error running query on PostgreSQL', err);
        throw err;
    }
}

export async function queryMSSQL(query, params = []) {
    const pool = await connectMSSQL();
    try {
        const request = pool.request();
        params.forEach(param => request.input(param.name, param.type, param.value));
        const result = await request.query(query);
        pool.close();
        return result.recordset;
    }
    catch (err) {
        console.error('Error running query on MSSQL', err);
        throw err; 
    }
}


export async function queryDatabase(query, params = []) {
    if (dbConfig.selectedDBMS === 'PGSQL') {
        return await queryPostgres(query, params);
    }
    else if (dbConfig.selectedDBMS === 'MSSQL') {
        return await queryMSSQL(query, params);
    }
    else {
        console.error('Invalid DBMS selected');
    }
}