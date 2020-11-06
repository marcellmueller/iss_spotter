const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

// const filterWords = words.filter((word) => word.length < 7);
// console.log(filterWords);

const mFilter = (array, cb) => {
  let newArray = [];
  for (const item of array) {
    console.log(cb(item));
    if (cb(item)) {
      newArray.push(item);
    }
  }
  console.log(newArray);
  return newArray;
};

const filtered = mFilter(words, (word) => {
  return word.length < 7;
});

console.log(filtered);
