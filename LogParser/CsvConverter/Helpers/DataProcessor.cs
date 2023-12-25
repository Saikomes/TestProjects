using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
namespace CsvConverter
{
    class DataProcessor
    {
        public static List<List<string>> SplitBy(List<string> source, string separator)
        {
            int c = 0;
            return
                source.GroupBy(val => (val == separator) ? ++c : c)
                    .Select(g => (g.Key == 0 ? g : g.Skip(1)).ToList()).ToList();
        }

        public static List<string> InitialData(string path, Encoding encoding)
        {
            var input = File.ReadLines(path, encoding);
            var inputList = input.ToList();
            if (inputList[inputList.Count - 1] == "")
            {
                inputList.RemoveAt(inputList.Count - 1);
            }

            return inputList;
        }


        public static string ConvertTxtLines(List<string> chunk, DateTime minDate)
        {
            if (chunk.Count < 2)
            {
                return null;
            }
            var firstDate = Date.GetFirstDate(chunk[0]);
            var secondDate = Date.GetSecondDate(chunk[1]);
            var dif1 = (firstDate - minDate).TotalMilliseconds;
            var dif2 = (secondDate - minDate).TotalMilliseconds;
            return TransformToCsvFormat(chunk, firstDate, secondDate, dif1, dif2);
        }

        public static string TransformToCsvFormat(List<string> chunk, DateTime firstDate, DateTime secondDate, double firstDif, double secondDif)
        {
            var sb = new StringBuilder();
            for (var i = 2; i < chunk.Count; i++)
            {
                var statement = chunk[i];
                sb.Append(statement + " ");
            }
            sb.Replace(';', '/');
            return string.Concat(firstDate.ToString(), ";", secondDate.ToString(), ";", firstDif.ToString(), ";", secondDif.ToString(), ";", sb.ToString());
        }

    }
}
