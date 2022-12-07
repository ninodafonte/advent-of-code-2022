# Day 7: No Space Left On Device

You can find the puzzles [here](https://adventofcode.com/2022/day/7).

## ✍🏼 Input

You can hear birds chirping and raindrops hitting leaves as the expedition proceeds. Occasionally, you can even hear much louder sounds in the distance; how big do the animals get out here, anyway?

The device the Elves gave you has problems with more than just its communication system. You try to run a system update:

$ system-update --please --pretty-please-with-sugar-on-top
Error: No space left on device
Perhaps you can delete some files to make space for the update?

You browse around the filesystem to assess the situation and save the resulting terminal output (your puzzle input). For example:

Example:

```text
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
```

## 🧩 First puzzle

### Objective

To begin, find all of the directories with a total size of at most 100000, then calculate the sum of their total sizes. In the example above, these directories are a and e; the sum of their total sizes is 95437 (94853 + 584). (As in this example, this process can count files more than once!)

Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?

### Solution

I got it working with some ugly parsing, array sorting and grouping. Probably not the best option but I wasn't very motivated today (and quite bored with the challenge to be honest.). There is probably a big bug with the sums of the parent folders but I don't plan to invest more time on this. Let's see tomorrow.

## 🧩 Second puzzle

A bit more filtering with Math min and done.

### Objective

Find the smalles folder we need to delete to have enough free space

### Solution

```js
let spaceFree = 70000000 - pathsAndSizes.filter((elem) => elem.path === '/')[0].total;
let spaceNeeded = 30000000 - spaceFree;

let folderToDelete = Math.min(
  ...pathsAndSizes.filter((elem) => elem.total > spaceNeeded)
    .map((elem) => elem.total)
);

console.log(folderToDelete);
```
