import json
import argparse


class AppConfig:
    def __init__(self):
        self.args = self.init_args()

    @staticmethod
    def init_args():
        parser = argparse.ArgumentParser()
        parser.add_argument('--dashboard_url', help='Url of target dashboard')
        parser.add_argument('--start', help='Start date in format YYYY-MM-DD HH:MM:ss')
        parser.add_argument('--end', help='End date in format YYYY-MM-DD HH:MM:ss')
        parser.add_argument('--params', help='Json string with params', type=str)
        args = parser.parse_args()
        if args.params:
            args.params = json.loads(args.params)
        return args

    @property
    def dashboard_url(self):
        return self.args.dashboard_url

    @property
    def start_date(self):
        return self.args.start

    @property
    def end_date(self):
        return self.args.end

    @property
    def params(self):
        return self.args.params
