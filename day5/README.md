# Day 5: Supply Stacks

You can find the puzzles [here](https://adventofcode.com/2022/day/5).

## ✍🏼 Input

The expedition can depart as soon as the final supplies have been unloaded from the ships. Supplies are stored in stacks of marked crates, but because the needed supplies are buried under many other crates, the crates need to be rearranged.

The ship has a giant cargo crane capable of moving crates between stacks. To ensure none of the crates get crushed or fall over, the crane operator will rearrange them in a series of carefully-planned steps. After the crates are rearranged, the desired crates will be at the top of each stack.

The Elves don't want to interrupt the crane operator during this delicate procedure, but they forgot to ask her which crate will end up where, and they want to be ready to unload them as soon as possible so they can embark.

They do, however, have a drawing of the starting stacks of crates and the rearrangement procedure (your puzzle input). For example:

```text
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
```

## 🧩 First puzzle

### Objective

After the rearrangement procedure completes, what crate ends up on top of each stack?

### Solution

Divide and conquer, a walk to the park, some fresh air and a bit of refactoring. This was a tricky one.
The goal was to think about how to parse the data.

After a first try that worked but was sort of smelly (you could check the commits if you are curious), I took a different direction: instead of trying to use the layout as it was provided, I transformed it before parsing it.

- Replace all the unimportant characters.
- Use the ones I cared to symbolize the stacks.
- Reduce to the only useful things I need to parse.

That creates something more simple, like:

```text
#D
N#C
Z#M#P
```

Where my parser knew that # means (stack++) for the next value.

```js
function parseCrates() {
  let data = initCratesContainer();
  let cratesData = input.split('\n')
    .filter((elem, index) => index < END_OF_CRATES_DEFINITION)
    .reverse()
    .map((elem) => {
      return elem.replace(/ |\[|]/gi, (sym) => mappedValues[sym])
        .replaceAll('----', '#')
        .replaceAll('-', '')
        .substring(1)
    });

  for (let i = 0; i < cratesData.length; i++) {
    let crateIndex = 0;
    for (let x = 0; x < cratesData[i].length; x++) {
      if (cratesData[i][x] === '#') { crateIndex++; continue; }
      data[crateIndex].push(cratesData[i][x]);
    }
  }

  return data;
}
```

The second need was to parse the commands. Way easier this time. I used an array filter function with a regex so I can extract the values from the text to issue the commands.

```js
function parseCommands() {
  const commands = input.split('\n')
    .filter((elem) => { return elem.substring(0, 4) === 'move' })
    .map((elem) => {
      let matches = elem.match(/move\s(\d*)\sfrom\s(\d*)\sto\s(\d*)/);
      return [matches[1], matches[2], matches[3]]
    });

  return commands;
}
```

Last action, execute the commands, quite easy as well, only thing to be aware was to respect the fifo / stack behaviour.

```js
function executeCommands(crates, commands) {
    for (let command in commands) {
        const [numBoxes, srcStack, destStack] = commands[command];
        for (let i = 0; i < numBoxes; i++) {
            let elem = crates[srcStack - 1].pop();
            crates[destStack - 1].push(elem);
        }
    }
    
  return crates;
}
```

## 🧩 Second puzzle

### Objective

For this second puzzle, the trick is only how the boxes move between them.

### Solution

Changing this last method for something that can simulate moving several boxes at once, worked very well.

```js
function executeCommands(crates, commands) {
  for (let command in commands) {
    const [numBoxes, srcStack, destStack] = commands[command];
    let tempElems = [];
    for (let i = 0; i < numBoxes; i++) {
      tempElems.push(crates[srcStack - 1].pop());
    }

    crates[destStack - 1].push(...tempElems.reverse());
  }

  return crates;
}
```