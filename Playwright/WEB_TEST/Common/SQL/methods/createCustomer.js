import { queryDatabase } from "./executeQuery";
import dbConfig from "../dbConfig";
import ClientTestConfig from "../../../Client/config/clientTestConfig";
export async function createCustomer(clientName, clientEmail, password, state=3) {
    let query
    if (dbConfig.selectedDBMS === 'PGSQL') {
        query = `DO $$
        DECLARE
          var_id_useraccount bigint;
        BEGIN
          CALL dbo.useraccountforcustomer_add('${clientName}', '${clientEmail}', decode('${password}', 'hex'), ${state}, 0, var_id_useraccount);
        EXCEPTION WHEN unique_violation THEN
          RAISE NOTICE 'A user with this email already exists.';
        END $$;        
        `
    }
  else {
    query = `
        IF NOT EXISTS (SELECT 1 FROM dbo.UserAccount WHERE Email = '${clientEmail}')
      BEGIN
        DECLARE @ID_UserAccount bigint;
        EXEC dbo.UserAccountForCustomer_Add 
        @Name = '${clientName}',
        @Email = '${clientEmail}', 
        @PasswordHash = 0x${password}, 
        @State = ${state}, 
        @IsInternal = 0, 
        @ID_UserAccount = @ID_UserAccount OUTPUT;
        SELECT @ID_UserAccount AS ID_UserAccount;
      END
    `;
  }
  const result = await queryDatabase(query)
}