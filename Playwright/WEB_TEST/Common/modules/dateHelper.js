export class DateHelper {

    static convertDateToMSSQLFormat(dateString) {
        const parts = dateString.split('.');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        } else {
            throw new Error('Invalid date format');
        }
    }

    static formatDateToString(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}.${month}.${year}`;
    }

    static formatStringToDate(dateString, dateFormat = 'dd.mm.yyyy') {
        const dateParts = {};
        const formatParts = dateFormat.split(/\W+/);
        const dateValues = dateString.split(/\W+/);
        
        for (let i = 0; i < formatParts.length; i++) {
            dateParts[formatParts[i]] = dateValues[i];
        }
        
        const { yyyy: year, mm: month, dd: day } = dateParts;

        return new Date(year, month - 1, day);
    }

    static formatStringToFullDate(dateString, dateFormat = 'yyyy.mm.dd hh:mm:ss.ms') {
        let milliseconds = 0;
        
        const [date, time] = dateString.split(" ");
        
        const [dateFormatPart, timeFormatPart] = dateFormat.split(" ");
        
        const dateParts = {};
        const formatParts = dateFormatPart.split(/\W+/);
        const dateValues = date.split(/\W+/);
        
        for (let i = 0; i < formatParts.length; i++) {
            dateParts[formatParts[i]] = dateValues[i];
        }
        
        const { yyyy: year, mm: month, dd: day } = dateParts;

        const timeParts = time.split(":");
        const hours = timeParts[0];
        const minutes = timeParts[1];
        let seconds = 0;
    
        if (timeParts[2]) {
            const secondsParts = timeParts[2].split("[.:]");
            seconds = secondsParts[0];
            
            if (secondsParts[1]) {
                milliseconds = secondsParts[1];
            }
        }
        
        return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
    }

    static daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    static daysInQuarter(month, year) {
        const firstMonthDays = daysInMonth(month, year);
        const secondMonthDays = daysInMonth((month + 1) % 12, year);
        const thirdMonthDays = daysInMonth((month + 2) % 12, year);
        const totalQuarterDays = firstMonthDays + secondMonthDays + thirdMonthDays;
        return totalQuarterDays
    }

    static daysInYear(year) {
        const isLeapYear = (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
        const daysInYear = isLeapYear ? 366 : 365;
        return daysInYear
    }

    static getExpectedDifference(periodType, startDate) {
        const DAY_IN_MS = 24 * 60 * 60 * 1000;
        const HOUR_IN_MS = 60 * 60 * 1000; 
        const HALF_HOUR_IN_MS = 30 * 60 * 1000;
    
        let expectedDifference = 0;
    
        switch (periodType) {
            case '1': // halfHour
                expectedDifference = HALF_HOUR_IN_MS;
                break;
            case '2': // hour
                expectedDifference = HOUR_IN_MS;
                break;
            case '3': // day
                expectedDifference = DAY_IN_MS;
                break;
            case '4': // month
                const daysInMonth = this.daysInMonth(startDate.getMonth(), startDate.getFullYear());
                expectedDifference = daysInMonth * DAY_IN_MS;
                break;
            case '5': // quartal
                const daysInCurrentQuarter = this.daysInQuarter(startDate.getMonth(), startDate.getFullYear());
                expectedDifference = daysInCurrentQuarter * DAY_IN_MS;
                break;
            case '6': // year
                const daysInYear = this.daysInYear(startDate.getFullYear());
                expectedDifference = daysInYear * DAY_IN_MS;
                break;
            default:
                throw new Error(`Unsupported period type: ${periodType}`);
        }
    
        return expectedDifference;
    }

}

export default DateHelper