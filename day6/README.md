# Day 6: Tuning Trouble

You can find the puzzles [here](https://adventofcode.com/2022/day/6).

## ✍🏼 Input

The device will send your subroutine a datastream buffer (your puzzle input); your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

For example, suppose you receive the following datastream buffer:

mjqjpqmgbljsphdztnvjfqwrcgsmlb
After the first three characters (mjq) have been received, there haven't been enough characters received yet to find the marker. The first time a marker could occur is after the fourth character is received, making the most recent four characters mjqj. Because j is repeated, this isn't a marker.

The first time a marker appears is after the seventh character arrives. Once it does, the last four characters received are jpqm, which are all different. In this case, your subroutine should report the value 7, because the first start-of-packet marker is complete after 7 characters have been processed.

Example:

```text
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
```

## 🧩 First puzzle

How many characters need to be processed before the first start-of-packet marker is detected?

### Objective

Compare chunks of text to identify one without repetition.
Any language withe Sets make this a no brainer. Easy one to start the day.

### Solution

Set to compare sizes and not much more.

```js

const MESSAGE_SIZE = 4;

let chunk = '';
for (let i = 0; i < input.length; i++) {
  chunk = input.substring(i, i + MESSAGE_SIZE);
  if ([...new Set(chunk.split(""))].join('').length === MESSAGE_SIZE) break;
}

console.log(input.indexOf(chunk) + MESSAGE_SIZE)
```

## 🧩 Second puzzle

### Objective

Here the message to look for changes from 4 to 14.

### Solution

Adjusting the const with the message size and that's it.

```js
const MESSAGE_SIZE = 14;
```
