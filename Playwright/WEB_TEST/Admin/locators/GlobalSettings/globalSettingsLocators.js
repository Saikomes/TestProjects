import CommonElementsLocators from "../Common/commonElementsLocators"
export class GlobalSettingsLocators {
    static globalSettingsPageLocators = {
        globalSettingsTab: {
            alias: 'Вкладка "Общесистемные настройки"',
            locator: 'a[href="#tabs-GlobalGeneralSettings"]'
        },
        mailTemplateSettingsTab: {
            alias: 'Вкладка "настройки почтовых шаблонов"',
            locator: 'a[href="#tabs-EmailTemplateList"]'
        },
        outgoingEmailSettingsTab: {
            alias: 'Вкладка "Настройки email исходящей почты"',
            locator: 'a[href="#tabs-OutgoingEmailAccountList"]'
        },
    }

    static globalSettingsTabLocators = {
        globalSettingsTabContent: {
            alias: 'Содержимое вкладки "Общесистемные настройки"',
            locator: '#tabs-GlobalGeneralSettings'
        },
        saveChangesBtn: {
            alias: 'Кнопка "Сохранить внесенные в настройки изменения"',
            locator: '#btnOk'
        },
        cancelChangesBtn: {
            alias: 'Кнопка "Отменить внесенные изменения"',
            locator: '#btnClose'
        },
    }

    static outgoingEmailSettingsLocators = {
        outgoingEmailTabContent: {
            alias: 'Содержимое вкладки "Настройки исходящей почты"',
            locator: '#outgoing-email-accounts-container'
        },
        addAccountBtn: {
            alias: 'Кнопка добавить аккаунт',
            locator: '.addAccountBtn'
        },
        accountRowBySmtpAddress: {
            alias: 'Строка аккаунта по адресу smtp сервера',
            locator: (address) => `tr:has(td[aria-describedby="outgoing-email-accounts-grid_Host"]:is(:text("${address}")))`
        },
        editAccountButton: {
            alias: 'Кнопка редактирования аккаунта',
            locator: '.editAccount'
        },
        deleteAccountButton: {
            alias: 'Кнопка удаления аккаунта',
            locator: '.deleteAccount'
        },
    }

    
    static emailTemplatesTabLocators = {
        emailTemplatesTabContent: {
            alias: 'Содержимое вкладки "Настройки почтовых шаблонов"',
            locator: '#tabs-EmailTemplateList'
        },
    }

    static editAccountDialogLocators = {
        editAccountDialog: {
            alias: 'Диалог настроек аккаунта',
            locator: CommonElementsLocators.uiDialogLocators.dialogByLabel.locator('ui-dialog-title-dlgSetupTask')
        },
        inputElementById: {
            alias: 'Элемент ввода по id',
            locator: (id) => `input#${id}`
        },
        defaultToggle: {
            alias: 'Переключатель "По умолчанию"',
            locator: 'label:has(:text("Использовать по умолчанию"))'
        }
    }
};

export default GlobalSettingsLocators