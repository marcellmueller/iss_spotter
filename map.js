const numbers = [2, 4, 6, 7, 9];

const map = (numbers, cb) => {
  const newArr = [];
  for (const item of numbers) {
    newArr.push(cb(item));
  }
  return newArr;
};

const newMap = map(numbers, (number) => {
  return number * 2;
});

console.log(newMap);
