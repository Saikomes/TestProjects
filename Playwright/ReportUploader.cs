using AZRep;
using MiscHelpers;
using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
namespace TestHelpers
{
    public class ReportUploader
    {
        public string reportServer;
        public string reportServerDir;
        public bool uploadToServer;
        public int daysToKeepReport;

        public ReportUploader(string reportServer, string reportServerDir, int daysToKeepReport, bool uploadToServer)
        {
            this.reportServer = reportServer;
            this.reportServerDir = reportServerDir;
            this.uploadToServer = uploadToServer;
            this.daysToKeepReport = daysToKeepReport;
        }

        public void GetReport(string fTestDir, bool uploadToServer)
        {
            using (Report.Group("Get Playwright Report"))
            {
                if (uploadToServer)
                {
                    var status = ServiceInstaller.GetServiceStatus("nginx");
                    if (status != ServiceInstaller.ServiceState.Running)
                    {
                        using (Report.Group("Start njinx service"))
                        {
                            string command = "nginx_svc.exe start";
                            var process = new ConsoleProcess()
                            {
                                FileName = "cmd.exe",
                                Arguments = String.Format("/C \"{0}\"", command),
                                WorkFolder = fTestDir,
                                Timeout = TimeSpan.FromSeconds(30),
                                Encoding = Encoding.UTF8,
                            };

                            process.Exec();
                            Condition.Verify("Succesfull njinx start", true, ServiceInstaller.GetServiceStatus("njinx") == ServiceInstaller.ServiceState.Running);
                        }
                    }
                    EraseOldReports();
                    string reportFolder = Path.Combine(fTestDir, "playwright-report");
                    var serverReportFolder = DateTime.Now.ToString("yyyyMMddHHmmss");
                    var reportPath = Path.Combine(reportServerDir, "playwright-report", serverReportFolder);
                    FileIO.DirectoryCopy(reportFolder, reportPath, true);
                    Report.Link("Web Gui Report", Path.Combine(reportServer, serverReportFolder, "index.html"));
                }
                else
                {
                    string reportFolder = Path.Combine(fTestDir, "playwright-report");
                    var miscReportFolder = Report.Directory();
                    FileIO.DirectoryCopy(reportFolder, miscReportFolder, true);
                    Report.Link("Web Gui Report",
                        Path.Combine(Report.CurGroup.Report.MiscDirectories.CurDir, "index.html"));
                }
            }
        }

        public void EraseOldReports()
        {
            using (Report.Group("Erase old reports"))
            {
                DateTime dtThreshold = DateTime.Now.AddDays(-daysToKeepReport);
                foreach (string directory in Directory.GetDirectories(Path.Combine(reportServerDir, "playwright-report")))
                {
                    if (Directory.GetLastWriteTime(directory) < dtThreshold)
                    {
                        Report.Text(directory);
                        try
                        {
                            Directory.Delete(directory, true);
                        }
                        catch (Exception ex)
                        {
                            Report.Pause(TimeSpan.FromSeconds(1));
                            if (Directory.Exists(directory))
                            {
                                Report.Text(2, ex.ToString());
                            }
                        }
                    }
                }
            }
        }
    }
}
