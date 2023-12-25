const UiFormLocators = {
    selectMenu: {
        locator: (id) => `select${id}`
    },
    inputById: {
        locator: (id) => `${id}`
    },
    checkboxById: {
        locator: (id) => `${id}`
    },
    dropdownItemById: {
        locator: (id) => `${id}`
    },
    toggleByLabelFor: {
        locator: (id) => `label[for="${id.replace('#', '')}"]`
    },
    dropdownButtonById: {
        locator: (id) => `${id}-button`
    },
    dropdownMenuById: {
        locator: (id) => `${id}-menu`
    },
    inputByTitle : {
        locator: (title) => `//tr[td/label[text()="${title}"]]//input`
    }
};

export default UiFormLocators;