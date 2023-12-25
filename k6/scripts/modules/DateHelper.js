
class DateHelper {
  static getCurrentDayBeginning() {
    const now = new Date();
    return DateHelper.formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }

  static getCurrentMonthBeginning() {
    const now = new Date();
    return DateHelper.formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  static getDateOneMonthAgo(dateString) {
    const date = new Date(dateString)
    return DateHelper.formatDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  }

  static getDateOneMonthAfter(dateString) {
    const date = new Date(dateString)
    return DateHelper.formatDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00`;
  }
}

export default DateHelper