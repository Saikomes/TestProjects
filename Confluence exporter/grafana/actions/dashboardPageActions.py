from .controlPanelActions import ControlPanelActions
from .dataPanelActions import DataPanelActions
from .panelWrapperActions import PanelWrapperActions
from .paramPanelActions import ParamPanelActions
from src.modules.grafana.elements.dashboardPageElements import DashboardPageElements
from .dashboardContentActions import DashboardContentActions

class DashboardPageActions:
    def __init__(self, page):
        self.page = page
        self.control_panel_actions = ControlPanelActions(page)
        self.data_panel_actions = DataPanelActions(page)
        self.panel_wrapper_actions = PanelWrapperActions(page)
        self.param_panel_actions = ParamPanelActions(page)
        self.dashboard_content_actions = DashboardContentActions(page)
        self.dashboard_page_elements = DashboardPageElements(page)



