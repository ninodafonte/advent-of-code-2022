const input = require("./input");

const MESSAGE_SIZE = 14;

let chunk = '';
for (let i = 0; i < input.length; i++) {
  chunk = input.substring(i, i + MESSAGE_SIZE);
  if (new Set(chunk.split("")).size === MESSAGE_SIZE) break;
}

console.log(input.indexOf(chunk) + MESSAGE_SIZE)
