# Day 2: Rock Paper Scissors

You can find the puzzles [here](https://adventofcode.com/2022/day/2).

## ✍🏼 Input

It's a Rock Paper Scissors strategy to follow.
First A,B,C is the corresponding shape that our component is going to play.
Second letter (X,Y,Z) is assumed to be what we play (again corresponding to Rock, Paper, Scissors)

Example:

```text
B Y
A X
C Z
A Z
B Y
B Y
```

## 🧩 First puzzle

### Objective

Calculate the total amount of points if the strategy plays out as expected.

### Solution

The only design decision here was to replace the letter/shapes with the integer values corresponding to their scores so it's easy to calculate the total score at the end of the strategy.

```js
const mappedValues = {
  'A': 1,
  'B': 2,
  'C': 3,
  'X': 1,
  'Y': 2,
  'Z': 3
}

const sumUp = (tmpSum, nextNum) => tmpSum + nextNum;
const calculatePointsFunc = (element) => {
  const item1 = Number(element[0]);
  const item2 = Number(element[2]);

  if (item1 === item2) return (item2 + 3);

  if (item1 === 1) return item2 === 2 ? item2 + 6 : item2;
  if (item1 === 2) return item2 === 3 ? item2 + 6 : item2;

  return item2 === 1 ? item2 + 6 : item2;
};

let data = input.replace(/A|B|C|X|Y|Z/gi, (letter) => mappedValues[letter])
  .split('\n')
  .map(calculatePointsFunc)
  .reduce(sumUp, 0);
```

## 🧩 Second puzzle

### Objective

In the second puzzle they clarify that the second column of the input it was not about a correspondence with Rock, Paper, Scissors. The 'X' means you should lose the turn, the 'Y' draw, and the 'Z' means you should win.
Now, taking that into account, recalculate the scores if everything goes perfectly align with the strategy.

### Solution

The only change is needed inside the calculatePoints function.
There I just use a dictionary to make my life easy and decide: "Ok, I have to lose and they are giving me Paper, so I send back Scissors".

The two arrays at the top are premade decisions that are chosen based on the outcome you want to get and the item your opponent is trying.

To be more explicit (and for my future self: the maps already include the calculations of the scores based on the choice to win or lose and the item offered. Nobody will understand it in two weeks xD)

```js
const calculatePointsFunc = (element) => {
  const mapsForLosses = [3, 1, 2];
  const mapsForWins = [8, 9, 7];
  const item1 = Number(element[0]);
  const item2 = element[2];

  if (item2 === 'Y') return item1 + 3;
  if (item2 === 'X') return mapsForLosses[item1 - 1];

  return mapsForWins[item1 - 1];
};
```
