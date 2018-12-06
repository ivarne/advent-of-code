const fs = require("fs");
const path = require("path");

const codes = fs
  .readFileSync(path.join(__dirname, "data2"))
  .toString()
  .split("\n");

let twos = 0;
let threes = 0;
codes.forEach(code => {
  const letters = {};
  code.split("").forEach(l => {
    if (letters[l]) {
      letters[l]++;
    } else {
      letters[l] = 1;
    }
  });
  const counts = Object.values(letters);
  if (counts.indexOf(2) !== -1) twos++;
  if (counts.indexOf(3) !== -1) threes++;
});
console.log(twos, threes, twos * threes);
codes.forEach(code1 =>
  codes.forEach(code2 => {
    if (code1.length !== code2.length) return;
    let numUnequal = 0;
    for (let i = 0; i < code1.length; i++) {
      if (code1[i] !== code2[i]) {
        numUnequal++;
      }
    }
    if (numUnequal === 1) {
      console.log(code1, code2);
    }
  })
);

ighfbsyijnoumxjlxevacpwqtr 
ighfbyijnoumxjlxevacpwqtr