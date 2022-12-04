# Day 4: Camp Cleanup

You can find the puzzles [here](https://adventofcode.com/2022/day/4).

## ✍🏼 Input

Space needs to be cleared before the last supplies can be unloaded from the ships, and so several Elves have been assigned the job of cleaning up sections of the camp. Every section has a unique ID number, and each Elf is assigned a range of section IDs.

However, as some of the Elves compare their section assignments with each other, they've noticed that many of the assignments overlap. To try to quickly find overlaps and reduce duplicated effort, the Elves pair up and make a big list of the section assignments for each pair (your puzzle input).

Example:

```text
5-96,6-99
29-97,80-97
3-87,3-4
12-12,6-12
64-65,24-66
52-54,1-53
86-89,85-88
37-69,38-38
81-96,47-75
```

## 🧩 First puzzle

### Objective

In how many assignment pairs does one range fully contain the other?

### Solution

The main work here is in isolate the min and max values from the strings.
For that, I apply a filter function, extracting the members and comparing them to find the overlaps and count them.

```js
const isContainedInPairs = (elem) => {
  const [min1, max1] = elem[0].split('-').map((elem) => Number(elem));
  const [min2, max2] = elem[1].split('-').map((elem) => Number(elem));

  return (min1 >= min2) && (max1 <= max2) || (min2 >= min1) && (max2 <= max1)
};

let data = input.split('\n')
  .map((elem) => { return elem.split(',') })
  .filter(isContainedInPairs)
  .length;

console.log(data);
```

## 🧩 Second puzzle

### Objective

Now, instead of looking for a full overlap, the partial ones are also needed.

### Solution

The main change in this second puzzle is to refactor the filter function to compare inside both pair of boundaries (to duplicate our previous comparison with both pairs so to say.)

```js
const isContainedPartiallyInPairs = (elem) => {
  const [min1, max1] = elem[0].split('-').map((elem) => Number(elem));
  const [min2, max2] = elem[1].split('-').map((elem) => Number(elem));

  return (
    (min1 >= min2) && (min1 <= max2) || (max1 >= min2) && (max1 <= max2) ||
    (min2 >= min1) && (min2 <= max1) || (max2 >= min1) && (max2 <= max1)
  );
};

let data = input.split('\n')
  .map((elem) => { return elem.split(',') })
  .filter(isContainedPartiallyInPairs)
  .length;

console.log(data);
```
