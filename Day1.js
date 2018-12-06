const fs = require("fs");
const path = require("path");

const frequencyChanges = fs
  .readFileSync(path.join(__dirname, "data1"))
  .toString()
  .split("\n")
  .map(s => parseInt(s));

const sums = frequencyChanges.reduce(
  (acc, f) => (acc.push(acc[acc.length - 1] + f), acc),
  [0]
);

const sum = sums[sums.length - 1];

let iter = 0;
let acc = sum;
while (true) {
  iter++;
  acc = frequencyChanges.reduce((acc, delta_f) => {
    const ret = acc + delta_f;
    sums.forEach(s => {
      if (s === ret) {
        console.log(s, acc, iter);
        throw new Error(s);
      }
    });
    return ret;
  }, acc);
  //   sums.forEach((s1, i1) =>
  //     sums.forEach((s2, i2) => {
  //       if (s1 == s2 + sum * iter) {
  //         console.log(s1, s2, i1, i2, iter);
  //         throw new Error("Finished");
  //       }
  //     })
  //   );
}

// console.log(differences);
