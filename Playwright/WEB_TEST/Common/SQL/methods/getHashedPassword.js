import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
// Pg
// select
// encode(sha256(convert_to(encode('\x3632623932633230353961633562303739363462303731353264323334623730', 'escape') || '12345678', 'UTF8')), 'hex');
// Ms sql
// select HASHBYTES('SHA2_256'
// , '62b92c2059ac5b07964b07152d234b70' -- добавка
// + 'mypassword123' -- пароль
// )
export async function getHashedPassword(password) {
  let query
  if (dbConfig.selectedDBMS === 'PGSQL') {
    query = `select encode(sha256(convert_to(encode('\\x3632623932633230353961633562303739363462303731353264323334623730', 'escape') || '${password}', 'UTF8')), 'hex');
    `
  }
  else {
    query =
      ` select HASHBYTES('SHA2_256', '62b92c2059ac5b07964b07152d234b70' + '${password}') AS hashed_password;
    `;
  }

  const result = await queryDatabase(query)
  if (dbConfig.selectedDBMS === 'PGSQL') {
    return result[0].encode;
  }
  else {
    return result[0].hashed_password.toString('hex');
  }
}