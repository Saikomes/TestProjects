using System;
namespace CsvConverter
{
    public class Logger
    {
        public static void WriteError(string message)
        {
            Console.Error.WriteLine("[{0}] {1} ", DateTime.Now.TimeOfDay, message);
        }

        public static void WriteMessage(string message)
        {
            Console.WriteLine("[{0}] {1} ", DateTime.Now.TimeOfDay, message);
        }
    }
}