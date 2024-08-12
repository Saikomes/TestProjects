from .dataPanelElements import DataPanelElements
from .panelWrapperElements import PanelWrapperElements
from .controlPanelElements import ControlPanelElements
from .paramPanelElements import ParamPanelElements
from .dashboardContentElements import DashboardContentElements

class DashboardPageElements:
    def __init__(self, page):
        self.page = page
        self.dashboard_content_elements = DashboardContentElements(page)
        self.data_panel_elements = DataPanelElements(page)
        self.panel_wrapper_elements = PanelWrapperElements(page)
        self.control_panel_elements = ControlPanelElements(page)
        self.param_panel_elements = ParamPanelElements(page)