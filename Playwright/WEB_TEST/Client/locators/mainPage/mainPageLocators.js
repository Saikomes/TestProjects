export class MainPageLocators {

    static controlPaneLocators = {
        cabinetTitle: { alias: "Заголовок кабинета", locator: '.b-index-title'},
    };
    static mainPageMenuLocators = {
        mainPageMenuArea: { alias: "Область главного меню", locator: '.b-index-blocks'},
        mainMenuPageItem: { alias: 'Элемент главного меню', locator: 'a.b-index-blocks-item' },
        mainMenuPageItemByName: {
            alias: 'Элемент главного меню по имени', 
            locator: (title) => `a.b-index-blocks-item:has(:text("${title}"))`},
        menuItemTitle: { 
            alias: 'Заголовок элемента главного меню',
            locator: 'span'
        }
    };
    static mainPageNewsLocators = {
        newsArea: { alias: "Область новостей", locator: '.b-index-news'},
        newsItemByTitle: {
            alias: 'Новость по заголовку', 
            locator: (title) => `.b-index-news-item:has(.b-index-news-item-title:has-text("${title}"))`},
        allNewsButton: { 
            alias: 'Переход на просмотр всех новостей',
            locator: '.b-index-news-archive-link >> a'
        }
    };
}

export default MainPageLocators;
