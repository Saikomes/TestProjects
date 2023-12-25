import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
export async function createEmployee(userName, userPassword, type) {
  let query
  if (dbConfig.selectedDBMS === 'PGSQL') {
    query = `
        DO $$
        DECLARE
          var_id_useraccount bigint;
        BEGIN
          CALL dbo.db_addlogin('${userName}', 1, '${userPassword}');
          CALL dbo.login_useraccountforemployee_add('${userName}', ${type}, 'Test test test', '${userName}_email@example.com', var_id_useraccount, 1);
          CALL dbo.db_adddbuser('${userName}');
        END $$;
        `
  }
  else {
    query =
      `DECLARE @ID_UserAccount bigint;

       EXEC dbo.DB_AddLogin         
       @login_name = '${userName}',
       @password = '${userPassword}'

       EXEC dbo.Login_UserAccountForEmployee_Add
       @LoginName = '${userName}',
       @Roles = ${type}, 
       @Name = 'Test Test Test', 
       @Email = '${userName}_email@example.com', 
       @ID_UserAccount = @ID_UserAccount OUTPUT;

       EXEC dbo.DB_AddDBUser
       @user_name = '${userName}';
    `;
  }

  const result = await queryDatabase(query)
}