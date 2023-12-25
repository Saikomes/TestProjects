const CommonElementsLocators = {
    checkBoxByTitle: { alias: 'Чекбокс по заголовку', locator: (label) => `p-checkbox:has(label:text-is("${label}"))` }
}

export default CommonElementsLocators