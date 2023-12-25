using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;

namespace CsvConverter
{
    public class Date
    {
        public static DateTimeFormatInfo DateProvider()
        {
            CultureInfo ci = CultureInfo.CreateSpecificCulture("ru-RU");
            DateTimeFormatInfo dtfi = ci.DateTimeFormat;
            dtfi.AbbreviatedMonthNames = new string[] { "янв", "фев", "мар",
                "апр", "май", "июн",
                "июл", "авг", "сен",
                "окт", "ноя", "дек", "" };
            dtfi.AbbreviatedMonthGenitiveNames = dtfi.AbbreviatedMonthNames;
            return dtfi;
        }

        public static DateTime ParseString(string[] formats, string date)
        {
            DateTime resultDate = new DateTime(1900, 1, 1);
            var provider = DateProvider();
            foreach (var format in formats)
            {
                if (DateTime.TryParseExact(date, format, provider, DateTimeStyles.None,
                        out resultDate))
                {
                    return resultDate;
                }
            }
            throw new Exception(String.Format("String {0} to date conversion failed. Unknown format!", date));
        }

        public static DateTime GetFirstDate(string fullDate)
        {
            int index = fullDate.IndexOf(" ", StringComparison.Ordinal) + 1;
            string date = fullDate.Substring(index, fullDate.Length - index);
            string[] formats = { "MMM dd HH:mm:ss:fff" };
            var firstDate = ParseString(formats, date);
            return firstDate;
        }

        public static DateTime GetSecondDate(string fullDate)
        {
            var matchResult = Regex.Match(fullDate, @"\d{2}\W\d{2}\W\d{4}\s\d{2}:\d{2}:\d{2}:\d*");
            var formattedDate = matchResult.ToString().Replace('/', '.');
            string[] formats = { "MM.dd.yyyy HH:mm:ss:fff", "MM.dd.yyyy HH:mm:ss:ff"};
            var secondDate = ParseString(formats, formattedDate);
            return secondDate;
        }

        public static DateTime TruncateMs(DateTime dateTime)
        {
            return dateTime.AddTicks(-(dateTime.Ticks % TimeSpan.TicksPerSecond));
        }

        public static DateTime GetMinDate(List<string> chunk)
        {
            var minDate = GetSecondDate(chunk[1]);
            minDate = TruncateMs(minDate);
            return minDate;
        }
    }
}
