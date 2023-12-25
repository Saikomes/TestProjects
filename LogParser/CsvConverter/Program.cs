using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CsvConverter
{
    class Program
    {
        static int Main(string[] args)
        {
            // Verify the command line
            if (args.Length != 1)
            {
                Logger.WriteError("missing argument: path to txt folder");
                return -2;
            }

            string path = args[0];
            try
            {
                Encoding win1251 = Encoding.GetEncoding("Windows-1251");
                DirectoryInfo di = new DirectoryInfo(path);
                FileInfo[] txtFiles = di.GetFiles("Sexec_*.txt");
                foreach (FileInfo fi in txtFiles)
                {
                    Logger.WriteMessage(String.Format("Found file {0}, trying to convert", fi.Name));
                    var inputList = DataProcessor.InitialData(fi.FullName, win1251);
                    var stringChunks = DataProcessor.SplitBy(inputList, "");
                    if (stringChunks.Count == 0)
                    {
                        throw new Exception(String.Format("Strings in file {0} have wrong format and cannot be formatted", fi.Name));
                    }
                    var fullCsvName = Path.ChangeExtension(fi.FullName, ".csv");
                    if (File.Exists(fullCsvName))
                    {
                        File.Delete(fullCsvName);
                    }
                    var minDate = Date.GetMinDate(stringChunks[0]);
                    List<Task<string>> convertChunkTasks = new List<Task<string>>();
                    foreach (var chunk in stringChunks)
                    {
                        var outputListTask = Task.Factory.StartNew(() => DataProcessor.ConvertTxtLines(chunk, minDate));
                        convertChunkTasks.Add(outputListTask);
                    }

                    Task.WaitAll(convertChunkTasks.ToArray());
                    var sb = new StringBuilder();
                    foreach (var task in convertChunkTasks)
                    {
                        sb.AppendLine(task.Result);
                    }
                    File.AppendAllText(fullCsvName, sb.ToString(), Encoding.UTF8);
                    if (new FileInfo(fullCsvName).Length > 0)
                    {
                        Logger.WriteMessage(String.Format("File {0} is created, conversion successful", new FileInfo(fullCsvName).Name));
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.WriteError(ex.Message);
            }

            return 0;
        }
    }
}
