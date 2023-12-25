const AngTableLocators = {
    treeById: {
        alias: 'дерево точек по id',
        locator: (id) => `${id}`
    },
    treeNodeById: {
        alias: 'Узел дерева по id',
        locator: (id) => `.ui-treenode[nodeid="${id}"] > .ui-treenode-content`
    },
    treeNodeByLabel: {
        alias: 'Узел дерева по имени точки',
        locator: (label) =>  `.ui-treenode > div[aria-label="${label}"]`
    },
    treeNode: {
        alias: 'Узел дерева',
        locator: `.ui-treenode`
    },
    treeNodeContent: {
        alias: 'Содержимое узла дерева',
        locator: `.ui-treenode > .ui-treenode-content`
    },
    leafNode: {
        alias: 'Листья дерева',
        locator: `.ui-treenode-leaf`
    },
    expandNodeButton: {
        alias: 'Кнопка раскрытия узла',
        locator: `.ui-tree-toggler`
    },
    expandedNode: {
        alias: 'Раскрытый узел',
        locator: `.ui-treenode > div[aria-expanded="true"]`
    },
    slickedNode: {
        alias: 'Свернутый узел',
        locator: `.ui-treenode > div[aria-expanded="false"]`
    }
}

export default AngTableLocators