const JsTreeTableLocators = {
    treeById: {
        alias: 'дерево точек по id',
        locator: (id) => `${id}`
    },
    treeNodeRow: {
        alias: 'Узел дерева',
        locator: `.jstree-opened`
    },
    treeNodeContent: {
        alias: 'Содержимое узла дерева',
        locator: `a`
    },
    treeNodeCheckBox: { 
        alias: 'Чекбокс выбора элемента', 
        locator: '.jstree-checkbox'
    },
    treeNodeById: {
        alias: 'Узел дерева по id',
        locator: (id) => `li[nodeobjectid="${id}"]`
    },
    treeRootByLabel: {
        alias: 'Узел дерева по имени точки',
        locator: (text) => `li[title="${text}"]:has(.jstree-leaf)`,
    },
    treeNodeByLabel: {
        alias: 'Узел дерева по имени точки',
        locator: (text) => `.jstree-leaf:has(a:text-is("${text}"))`,
    },
    leafNode: {
        alias: 'Лист дерева',
        locator: `.jstree-leaf`
    },
    expandNodeButton: {
        alias: 'Кнопка раскрытия узла',
        locator: `ins.jstree-icon`
    },
    expandedNode: {
        alias: 'Раскрытый узел',
        locator: `.jstree-open`
    },
    slickedNode: {
        alias: 'Свернутый узел',
        locator: `.jstree-closed`
    }
}

export default JsTreeTableLocators