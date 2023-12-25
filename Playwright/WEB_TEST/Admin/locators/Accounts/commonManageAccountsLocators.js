export const groupListLocators = {
    groupListArea: { 
        alias: 'Список групп', 
        locator: '.group-list-container'
    },

    groupListItemByName: {
        alias: 'Группа разрешений по имени',
        locator: (groupName) => `xpath=//li[contains(@class, "group-elt") and starts-with(normalize-space(.//span[@class="nq-name"]), "${groupName}")]`
    },

    addToGroupButton: {
        alias: 'Кнопка добавления в группу',
        locator: 'button.group-include'
    },

    removeFromGroupButton: {
        alias: 'Кнопка удаления из группы',
        locator: 'button.group-exclude'
    }
};