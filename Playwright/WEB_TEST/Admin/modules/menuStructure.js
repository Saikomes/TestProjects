const { readFileSync } = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, '../data/menuStructure.json');
const rawData = readFileSync(filePath, 'utf8');

const menuStructure = JSON.parse(rawData);

export default menuStructure;
