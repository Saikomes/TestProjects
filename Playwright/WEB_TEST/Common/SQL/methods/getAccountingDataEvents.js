import { queryDatabase } from "./executeQuery";
import mssql from 'mssql';
import dbConfig from "../dbConfig";
import ClientTestConfig from "../../../Client/config/clientTestConfig";
import DateHelper from "../../modules/dateHelper";
export async function getAccountingDataEvents(parameters) {
  let query
  const params = [
    { name: 'var_SecurityToken', value: parameters.SecurityToken, type: mssql.BigInt },
    { name: 'var_RootPointIDs', value: parameters.RootPointIDs, type: mssql.NVarChar(4000) },
    { name: 'var_EventCategories', value: parameters.EventCategories, type: mssql.NVarChar(4000) },
    { name: 'var_LinkedParams', value: parameters.LinkedParams, type: mssql.Int },
    { name: 'var_Importances', value: parameters.Importances, type: mssql.NVarChar(4000) },
    { name: 'var_StartDT', value: dbConfig.selectedDBMS == "PGSQL" ? parameters.StartDT : DateHelper.convertDateToMSSQLFormat(parameters.StartDT), type: mssql.DateTime2(7) },
    { name: 'var_EndDT', value: dbConfig.selectedDBMS == "PGSQL" ? parameters.EndDT : DateHelper.convertDateToMSSQLFormat(parameters.EndDT), type: mssql.DateTime2(7) },
    { name: 'var_JoinPairEvents', value: parameters.JoinPairEvents, type: mssql.Int },
    { name: 'var_ID_TimeSchema', value: parameters.ID_TimeSchema, type: mssql.Int },
    { name: 'var_MaxCount', value: parameters.MaxCount, type: mssql.Int },
    { name: 'var_GetPointName', value: parameters.GetPointName, type: mssql.Int },
  ];
  if (dbConfig.selectedDBMS === 'PGSQL') {
    query = `select * from dbo.ReportEvents(

        var_SecurityToken => ${parameters.SecurityToken},

        var_RootPointIDs => '${parameters.RootPointIDs}',

        var_EventCategories => '${parameters.EventCategories}',

        var_LinkedParams => ${parameters.LinkedParams},

        var_Importances => '${parameters.Importances}',

        var_StartDT => '${parameters.StartDT}',

        var_EndDT => '${parameters.EndDT}',

        var_JoinPairEvents => '${Number(parameters.JoinPairEvents)}',

        var_ID_TimeSchema => ${parameters.ID_TimeSchema},

        var_MaxCount => '${parameters.MaxCount}',

        var_GetPointName => '${parameters.GetPointName}' );
      `
  }
  else {
    query =
    `
    exec sp_executesql N'set nocount on;
    exec dbo.ReportEvents
    @SecurityToken = @var_SecurityToken
    , @RootPointIDs = @var_RootPointIDs
    , @EventCategories = @var_EventCategories
    , @LinkedParams = @var_LinkedParams
    , @Importances = @var_Importances
    , @StartDT = @var_StartDT
    , @EndDT = @var_EndDT
    , @JoinPairEvents = @var_JoinPairEvents
    , @ID_TimeSchema = @var_ID_TimeSchema
    , @MaxCount = @var_MaxCount
    , @GetPointName = @var_GetPointName', 
    N'@var_SecurityToken bigint, @var_RootPointIDs nvarchar(4000), @var_EventCategories nvarchar(4000), @var_LinkedParams nvarchar(4000),  @var_Importances nvarchar(4000), @var_StartDT datetime2(7), @var_EndDT datetime2(7), @var_JoinPairEvents int, @var_ID_TimeSchema int, @var_MaxCount int, @var_GetPointName int',
    @var_SecurityToken, @var_RootPointIDs, @var_EventCategories, @var_LinkedParams, @var_Importances, @var_StartDT, @var_EndDT, @var_JoinPairEvents, @var_ID_TimeSchema, @var_MaxCount, @var_GetPointName
  `;
  }
  const result = dbConfig.selectedDBMS == "MSSQL" ? await queryDatabase(query, params) : await queryDatabase(query);
  return result;
}