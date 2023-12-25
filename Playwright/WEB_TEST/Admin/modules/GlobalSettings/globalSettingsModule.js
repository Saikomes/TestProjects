import {expect} from '@playwright/test';
import TaskManagerRowActions from '../../actions/TaskManager/taskManagerRowActions';
import EditScheduleDialogActions from '../../actions/TaskManager/editScheduleDialogActions';
import EditScheduleDialogElements from '../../elements/TaskManager/editScheduleDialogElements';
import ExpandedHistoryDialogElements from '../../elements/TaskManager/expandedHistoryDialogElements';
import ExpandedHistoryDialogActions from '../../actions/TaskManager/expandedHistoryDialogActions';
import TaskManagerRowElements from '../../elements/TaskManager/taskManagerRowElements';
import ClientTestConfig from '../../../Client/config/clientTestConfig';
import TaskManagerConfig from '../../config/taskManagerConfig';
import EditTaskDialogActions from '../../actions/TaskManager/editTaskDialogActions';
import EditTaskDialogElements from '../../elements/TaskManager/editTaskDialogElements';
import GlobalSettingsConfig from '../../config/globalSettingsConfig';
import SQL from '../../../Common/SQL/SQL';

export class GlobalSettingsModule {

     static async getOriginalDBValues(config) {
        let originalValues = {}
        for (const configValue of config) {
            const dbConfig = configValue.db;
            const originalValue = await SQL.getValue(dbConfig.table, dbConfig.keyColumn, dbConfig.keyValue, dbConfig.valueColumn);
            originalValues[configValue.id] = originalValue;
            
        }
        return originalValues;
    }

    static async restoreOriginalDBValues(originalValues, config) {
        for (const configItem of config) {
            const dbConfig = configItem.db;
            const originalValue = originalValues[configItem.id];
    
            if (originalValue !== undefined) { 
                await SQL.setValue(dbConfig.table, dbConfig.keyColumn, dbConfig.keyValue, dbConfig.valueColumn, originalValue);
            }
        }
        return originalValues;
    }

    static async checkDBForExpectedValues(config) {
        for (const configItem of config) {
            const dbConfig = configItem.db;
            const expectedValue = configItem.ui.value
    
            if (expectedValue !== undefined) { 
                const dbValue = await SQL.getValue(dbConfig.table, dbConfig.keyColumn, dbConfig.keyValue, dbConfig.valueColumn);
                expect(dbValue.toString()).toEqual(expectedValue)
            }
        }
    }

}

export default GlobalSettingsModule;
