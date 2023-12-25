import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";

export async function getUserAccountId(email) {
     const query = `SELECT id_useraccount FROM dbo.useraccount where email='${email}'`;

     const result = await queryDatabase(query);
     return result[0]['id_useraccount'];
}