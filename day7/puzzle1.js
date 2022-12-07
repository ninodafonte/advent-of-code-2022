const input = require("./input");

let device = [];
let currentDir = '';
let lines = input.split('\n');

function parseCommands() {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].substring(0, 1) === '$') {
      let command = lines[i].substring(2).split(' ');
      switch (command[0]) {
        case 'cd':
          switch (command[1]) {
            case '/':
              currentDir = '/';
              break;
            case '..':
              currentDir = currentDir.substring(0, currentDir.lastIndexOf('/'))
              break;
            default:
              currentDir = currentDir !== '/' ? currentDir + '/' + command[1] : currentDir + command[1];
              break;
          }
          break;
        case 'ls':
          device.push({"path": currentDir, "files": [], "total": 0});
          break;
      }
    } else {
      let infoLine = lines[i].split(' ');
      if (infoLine[0] !== 'dir') {
        let node = device.find((elem) => {
          return elem.path === currentDir
        });
        node.files.push(infoLine[1]);
        node.total += Number(infoLine[0]);
      }
    }
  }
}

function summarizeTotalsByParentFolder() {
  device.sort((elemA, elemB) => elemA.path > elemB.path ? 1 : 0).reverse();
  let pathsAndSizes = device.map((elem) => {
    return {"path": elem.path, "total": elem.total}
  });

  for (let i = 0; i < pathsAndSizes.length; i++) {
    let children = pathsAndSizes.filter((elem) => elem.path.includes(pathsAndSizes[i].path));
    let sumChildren = children.reduce((acc, next) => {
      return acc + next.total
    }, 0);
    pathsAndSizes[i].total = sumChildren;
  }
  return pathsAndSizes;
}

parseCommands();
let total = summarizeTotalsByParentFolder().filter((elem) => { return elem.total <= 100000 && elem.total > 0 })
    .map((elem) => elem.total)
    .reduce((acc, item) => { return acc + item });

console.log(total);

