import { expect } from "@playwright/test";

const scrollingTimeout = (ms) => {
    const state = {
        done: false,
        promise: new Promise((res) => setTimeout(res, ms)).then(() => {
            state.done = true;
        }),
    };
    return state;
};

export class TableHelper {
    constructor(page) { 
        this.page = page;
    }

        /**
 * @param {Object} options
 * @param {number} [options.deltaX=0]
 * @param {number} [options.deltaY=20]
 * @param {number} [options.timeout=5000]
 */
    async scrollUntil(scrollContainer, scrollUntilElement, options = {}) {
        options.deltaX = options.deltaX ?? 0;
        options.deltaY = options.deltaY ?? 20;
        options.timeout = options.timeout ?? 15000;
        const indefinite = options.timeout === 0;
        const timer = scrollingTimeout(options.timeout);
        await scrollContainer.hover();
        let elementVisible = false;
        while (
            (indefinite || !timer.done) &&
            !(elementVisible = await scrollUntilElement.isVisible())
        ) {
            await this.page.mouse.wheel( options.deltaX, options.deltaY);
        }
        expect(elementVisible).toBeTruthy()
        return await scrollContainer.locator(scrollUntilElement).first();
    }

    async scrollToEnd(viewportElement) {
        const result = await viewportElement.evaluate((el) => {
            if (el) {
                el.scrollTop = el.scrollHeight;
                return el.scrollTop + el.clientHeight >= el.scrollHeight;
            }
            return false;
        });
    
        expect(result).toBeTruthy();
        await this.page.waitForTimeout(5000);
    }

    async scrollToStart(viewportElement) {
        await viewportElement.hover()
        const result = await viewportElement.evaluate((el) => {
            if (el) {
                el.scrollTop = 0;
                return el.scrollTop === 0;
            }
            return false;
        });
    
        expect(result).toBeTruthy();
        const firstRow = viewportElement.locator('.row0');
        await firstRow.waitFor();
    }
    

    //Прокручиваем до конца таблицы, в ходе этого ищем все интересующие элементы
    //Выполняем с каждым элементом переданное действие
    /**
 * @param {Object} options
 * @param {number} [options.deltaX=0]
 * @param {number} [options.deltaY=20]
 * @param {number} [options.timeout=5000]
 * @param {boolean} [options.skipFirst=false]
 */
    async scrollAndAct(scrollContainer, elementLocator, action, options = {}) {
        options.deltaX = options.deltaX ?? 0;
        options.deltaY = options.deltaY ?? 20;
        options.timeout = options.timeout ?? 5000;
        options.skipFirst = options.skipFirst ?? false; 

        let isScrollEndReached = false;
    
        const checkScrollEnd = async () => {
            return await scrollContainer.evaluate((el) => {
                if (el) {
                    return el.scrollTop + el.clientHeight >= el.scrollHeight;
                }
                return false;
            });
        };
    
        while (!isScrollEndReached) {
            // Скроллим до элемента
            await scrollContainer.hover();
            if(await scrollContainer.locator(elementLocator).count()>0) {
                let actionRow = await scrollContainer.locator(elementLocator).first()
                if(await actionRow.isVisible()) {
                    if(options.skipFirst) {
                        const elementClass = await actionRow.getAttribute('class');
                        if(elementClass.includes('row0')) {
                            await this.page.mouse.wheel(options.deltaX, options.deltaY);
                            isScrollEndReached = await checkScrollEnd(scrollContainer);
                            continue;
                        }
                    }
                    await action(actionRow);
                    // Проверяем, достигнут ли конец скролла
                }
            }
            await this.page.mouse.wheel( options.deltaX, options.deltaY);
            isScrollEndReached = await checkScrollEnd(scrollContainer);
        }
    }
    
}

export default TableHelper;
