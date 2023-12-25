const { readFileSync } = require('fs');
const { resolve } = require('path');

const filePath = resolve(__dirname, '../data/events.json');
const rawData = readFileSync(filePath, 'utf8');

const jsonData = JSON.parse(rawData);

const commentsDict = {};

for (const event of jsonData) {
  const source = event.device;
  const actions = event.actions;

  if (!commentsDict[source]) {
    commentsDict[source] = [];
  }

  for (const actionData of actions) {
    commentsDict[source].push(actionData);
  }
}

export default commentsDict;
