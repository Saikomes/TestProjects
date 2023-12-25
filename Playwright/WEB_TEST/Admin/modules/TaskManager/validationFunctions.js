import { expect } from "@playwright/test";
export class ValidationFunctions {
    static autoDeleteValidationFactory = (message) => (historyText) => {
        const regex = new RegExp(message)
        const match = historyText.match(regex)
        expect(match, `Expected text to match ${regex}, but got ${historyText}`).not.toBeNull()
        const deletedAccounts = parseInt(match[1], 10)
        expect(deletedAccounts, `Expected number of deleted accounts to be greater than 0, but got ${deletedAccounts}`).toBeGreaterThan(0);
    }

    static refreshDbValidationFactory = (message) => (historyText) => {
        const regex = new RegExp(message)
        const match = historyText.match(regex)
        expect(match, `Expected text to match ${regex}, but got ${historyText}`).not.toBeNull()
    }

    static mailServiceValidationFactory = (message) => (historyText) => {
        const regex = new RegExp(message)
        const errorPattern = /\d\sнеудачных/;
        const match = historyText.match(regex)
        expect(match, `Expected text to match ${regex}, but got ${historyText}`).not.toBeNull()
        const sendedMessages = parseInt(match[1], 10)
        expect(sendedMessages, `Expected number of sended messages to be greater than 0, but got ${sendedMessages}`).toBeGreaterThan(0);
        expect(historyText.match(errorPattern), "Not sended message is not found").toBeNull();
    }

    static importOsmValidationFactory = this.refreshDbValidationFactory
    static assignAddressValidationFactory = this.refreshDbValidationFactory
}
export default ValidationFunctions