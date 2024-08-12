from .controlPanelLocators import ControlPanelLocators
from .dashboardContentLocators import DashboardContentLocators
from .paramPanelLocators import ParamPanelLocators


class DashboardLocators(ControlPanelLocators, DashboardContentLocators, ParamPanelLocators):
    pass
