const fs = require("fs");
const path = require("path");

const data = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`
  // const data = fs
  //   .readFileSync(path.join(__dirname, "data6"))
  .toString()
  .split("\n")
  .map(line => line.split(",").map(c =>  parseInt(c)));

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;
data.forEach(p => {
  const [x, y] = p;
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
});
const deltaX = maxX - minX +2;
const deltaY = maxY - minY +2;

console.log(minX, maxX, deltaX);
console.log(minY, maxY, deltaY);

let distances = Array(deltaX + 1)
  .fill(0)
  .map(() => Array(deltaY +1).fill(" ").join(""));
// console.log(distances)
// set initial distances
data.forEach((p, i) => {
  const [x_raw, y_raw] = p;
  const x = x_raw - minX +1;
  const y = y_raw - minY +1;
  // console.log(x,y)
  const row = distances[x];
  distances[x] = row.substr(0,x) String.fromCharCode( 32 +i);
});
 console.log(distances)

// for(let i = 0; i<3; i++){
while (distances.some(str => str.indexOf(" ") === -1)) {
  distances = distances.map((arr, x) =>
    arr.map((value, y) => {
      if (value > 0) {
        // Don't process finiched cells
        return value;
      }
      const newValue = [];
      if (distances[x][y - 1] > 0) newValue.push(distances[x][y - 1]);
      if (distances[x - 1][y] > 0) newValue.push(distances[x - 1][y]);
      if (distances[x + 1][y] > 0) newValue.push(distances[x + 1][y]);
      if (distances[x][y + 1] > 0) newValue.push(distances[x][y + 1]);
      if (newValue.length === 0) return -1;
      if (newValue.every(v => v === newValue[0])) return newValue[0];
      return 0;
    })
  );
}

console.log(distances);

console.log(minX, maxX, minY, maxY);
console.log(deltaX, deltaY);
