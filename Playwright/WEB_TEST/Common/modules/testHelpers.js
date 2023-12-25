export class TestHelpers {

    static getLinkedLocator(parentLocator, childLocator) {
        return parentLocator.locator(childLocator);
    }

    static getLinkedFrameLocator(parentLocator, childLocator) {
        return parentLocator.frameLocator(childLocator);
    }

}

export default TestHelpers