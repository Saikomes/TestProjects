import { queryDatabase } from "./executeQuery";
import mssql from 'mssql';
import dbConfig from "../dbConfig";
import ClientTestConfig from "../../../Client/config/clientTestConfig";
import DateHelper from "../../modules/dateHelper";
export async function getAccountingDataIndications(parameters) {
  let query
  const params = [
    { name: 'var_SecurityToken', value: parameters.SecurityToken, type: mssql.BigInt },
    { name: 'var_RootPointIDs', value: parameters.RootPointIDs, type: mssql.NVarChar(4000) },
    { name: 'var_DataKind', value: parameters.DataKind, type: mssql.Int },
    { name: 'var_StartDT', value: dbConfig.selectedDBMS == "PGSQL" ? parameters.StartDT : DateHelper.convertDateToMSSQLFormat(parameters.StartDT), type: mssql.DateTime2(7) },
    { name: 'var_EndDT', value: dbConfig.selectedDBMS == "PGSQL" ? parameters.EndDT : DateHelper.convertDateToMSSQLFormat(parameters.EndDT), type: mssql.DateTime2(7) },
    { name: 'var_PeriodType', value: parameters.PeriodType, type: mssql.Int },
    { name: 'var_ID_TimeSchema', value: parameters.ID_TimeSchema, type: mssql.Int },
    { name: 'var_SumPoints', value: parameters.SumPoints, type: mssql.Int },
    { name: 'var_RateCount', value: parameters.RateCount, type: mssql.Int },
    { name: 'var_UseMeaCoeffs', value: parameters.UseMeaCoeffs, type: mssql.Int },
    { name: 'var_ParamTypes', value: parameters.ParamTypes, type: mssql.NVarChar(4000) },
    { name: 'var_RestrictType', value: parameters.RestrictType, type: mssql.Int },
    { name: 'var_GetTotalsOnly', value: parameters.GetTotalsOnly, type: mssql.Int },
    { name: 'var_Options', value: parameters.Options, type: mssql.NVarChar(4000) }
  ];
  if (dbConfig.selectedDBMS === 'PGSQL') {
    query = `DROP TABLE IF EXISTS tmptablevar_t;
      CREATE TEMPORARY TABLE tmptablevar_t (
          PointName VARCHAR,
          ID_Point VARCHAR,
          RateNumber INT,
          ID_Param INT,
          ID_Linked_Param INT,
          ParameterOrder INT,
          ParameterName VARCHAR,
          ParameterUnitsName VARCHAR,
          DT TIMESTAMP(3),
          Value FLOAT,
          State INT,
          OverflowWarning INT,
          StableDT_End TIMESTAMP(3),
          LinkedParameterName VARCHAR,
          LinkedParameterUnitsName VARCHAR
      );
      INSERT INTO tmptablevar_t
      SELECT * FROM dbo.ReportLD(
          var_SecurityToken => ${parameters.SecurityToken},
          var_RootPointIDs => '${parameters.RootPointIDs}',
          var_DataKind => '${parameters.DataKind}',
          var_StartDT => '${parameters.StartDT}',
          var_EndDT => '${parameters.EndDT}',
          var_PeriodType => '${parameters.PeriodType}',
          var_ID_TimeSchema => ${parameters.ID_TimeSchema},         
          var_SumPoints => '${Number(parameters.SumPoints)}',
          var_RateCount => '${Number(parameters.RateCount)}',
          var_UseMeaCoeffs => '${Number(parameters.UseMeaCoeffs)}',
          var_ParamTypes => '${parameters.ParamTypes}',
          var_RestrictType => '${Number(parameters.RestrictType)}',
          var_GetTotalsOnly => '${Number(parameters.GetTotalsOnly)}',
          var_Options => '${parameters.Options}'
      );
      SELECT 
          ID_Param AS "ParameterTypeId",
          ID_Point AS "PointId",
          RateNumber AS "RateNumber",
          DT AS "Date",
          ParameterOrder AS "ParameterOrder",
          ParameterName AS "ParameterName",
          ParameterUnitsName AS "ParameterUnitsName",
          PointName AS "PointName",
          Value AS "Value",
          State AS "State",
          OverflowWarning AS "OverflowWarning",
          ID_Linked_Param AS "LinkedId",
          LinkedParameterName AS "LinkedParameterName",
          LinkedParameterUnitsName AS "LinkedParameterUnitsName"
      FROM tmptablevar_t
      WHERE StableDT_End IS NULL;
      `
  }
  else {
    query =
      `  
     exec sp_executesql N'
     SET NOCOUNT ON;
     DECLARE @t TABLE(
         PointName varchar(max),
         ID_Point varchar(max),
         RateNumber int,
        ID_Param int,
        ID_Linked_Param int,
        ParameterOrder int,
        ParameterName varchar(max),
        ParameterUnitsName varchar(max),
        DT datetime,
        [Value] float,
        [State] int,
        OverflowWarning int,
        StableDT_End datetime,
        LinkedParameterName varchar(max),
        LinkedParameterUnitsName varchar(max)
    )
        INSERT INTO @t EXEC dbo.ReportLD
            @SecurityToken = @var_SecurityToken,
            @RootPointIDs = @var_RootPointIDs,
            @DataKind = @var_DataKind,
            @StartDT = @var_StartDT,
            @EndDT = @var_EndDT,
            @PeriodType = @var_PeriodType,
            @ID_TimeSchema = @var_ID_TimeSchema,
            @SumPoints = @var_SumPoints,
            @RateCount = @var_RateCount,
            @UseMeaCoeffs = @var_UseMeaCoeffs,
            @ParamTypes = @var_ParamTypes,
            @RestrictType = @var_RestrictType,
            @GetTotalsOnly = @var_GetTotalsOnly,
            @Options = @var_Options;
        
        SELECT
            ID_Param as ParameterTypeId,
            ID_Point as PointId,
            RateNumber as RateNumber,
            DT as Date,
            ParameterOrder as ParameterOrder,
            ParameterName as ParameterName,
            ParameterUnitsName as ParameterUnitsName,
            PointName as PointName,
            [Value] as [Value],
            [State] as [State],
            OverflowWarning as OverflowWarning,
            ID_Linked_Param as LinkedId,
            LinkedParameterName as LinkedParameterName,
            LinkedParameterUnitsName as LinkedParameterUnitsName
        FROM @t
        WHERE StableDT_End IS NULL',
        N'@var_SecurityToken bigint, @var_RootPointIDs nvarchar(4000), @var_DataKind int, @var_StartDT datetime2(7), @var_EndDT datetime2(7), @var_PeriodType int, @var_ID_TimeSchema int, @var_SumPoints int, @var_RateCount int, @var_UseMeaCoeffs int, @var_ParamTypes nvarchar(4000), @var_RestrictType int, @var_GetTotalsOnly int, @var_Options nvarchar(4000)',
        @var_SecurityToken, @var_RootPointIDs, @var_DataKind, @var_StartDT, @var_EndDT, @var_PeriodType, @var_ID_TimeSchema, @var_SumPoints, @var_RateCount, @var_UseMeaCoeffs, @var_ParamTypes, @var_RestrictType, @var_GetTotalsOnly, @var_Options
      `;
  }
  const result = dbConfig.selectedDBMS == "MSSQL" ? await queryDatabase(query, params) : await queryDatabase(query);
  return result;
}