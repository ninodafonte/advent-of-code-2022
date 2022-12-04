const input = require("./input");

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
