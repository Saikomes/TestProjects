using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Net.Sockets;
using System.IO;
using AZRep;
using MiscHelpers;
using TestHelpers;

namespace TestHelpers
{
    public class Playwright
    {
        public string playwrightDir;
        public string reportServer;
        public string reportServerDir;
        public bool uploadToServer;
        public int daysToKeepReport;

        public Playwright(string playwrightDir, string reportServer, string reportServerDir, bool uploadToServer, int daysToKeepReport)
        {
            this.playwrightDir = playwrightDir;
            this.reportServer = reportServer;
            this.reportServerDir = reportServerDir;
            this.uploadToServer = uploadToServer;
            this.daysToKeepReport = daysToKeepReport;
        }

        public void RunTest(string fTestDir, string testScript, string testArgs, Dictionary<string, string> envVars, int timeout)
        {
            using (Report.Group("Run Playwright test"))
            {
                try
                {
                    string command = String.Format("npx playwright test {0} {1}", testScript, testArgs);
                    var process = new ConsoleProcess()
                    {
                        FileName = "cmd.exe",
                        Arguments = String.Format("/C \"{0}\"", command),
                        WorkFolder = fTestDir,
                        Timeout = TimeSpan.FromSeconds(timeout),
                        Encoding = Encoding.UTF8,
                    };

                    process.EnvironmentVariables = new Dictionary<string, string>();
                    foreach (var kvp in envVars)
                    {
                        process.EnvironmentVariables.Add(kvp.Key, kvp.Value);
                    }

                    process.Exec();
                }
                catch (Exception ex)
                {
                    Report.Text(1, ex.ToString());
                }
                finally
                {
                    var reportUploader = new ReportUploader(reportServer, reportServerDir, daysToKeepReport, uploadToServer);
                    reportUploader.GetReport(fTestDir, uploadToServer);
                }
            }
        }
    }
}
