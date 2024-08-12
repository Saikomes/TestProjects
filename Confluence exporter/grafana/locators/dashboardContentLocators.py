class DashboardContentLocators:
    GRID_LAYOUT = '.react-grid-layout'
    DATA_PANEL = 'div.react-grid-item >> internal:has-not=".dashboard-row"'
    DATA_ROW = 'div[data-panelid] >> internal:has=".dashboard-row"'
    CONTENT_WRAPPER = '.rc-drawer-content-wrapper'
    DATA_ROW_TITLE = '.dashboard-row__title'
    SAVE_DASHBOARD_BUTTON = 'button[aria-label="Save dashboard"]'
