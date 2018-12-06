const fs = require("fs");
const path = require("path");

const data = fs
  .readFileSync(path.join(__dirname, "data6"))
  .toString()
  .split("\n")
  .map(line => line.split(",").map(c => parseInt(c)));

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
const deltaX = maxX - minX;
const deltaY = maxY - minY;

let distances = Array(deltaX).fill(Array(deltaY).fill(-1));
// set initial distances
data.forEach((p, i) => {
  const [x_raw, y_raw] = p;
  const x = x_raw - minX;
  const y = y_raw - minY;
  distances[x][y] = i;
});

distances = distances.map((arr, x) =>
  arr.map((value, y) => {
    if (value > 0) {
      // Don't process finiched cells
      return value;
    }
    if(x === 0 || y === 0 || x === deltaX || y === deltaY){
        return -2
    }
    const newValue = [];
    if(arr[x-1][y-1] > -1) newValue.push(arr[x-1][y-1])
    if(arr[x  ][y-1] > -1) newValue.push(arr[x  ][y-1])
    if(arr[x+1][y-1] > -1) newValue.push(arr[x+1][y-1])
    if(arr[x-1][y  ] > -1) newValue.push(arr[x-1][y  ])
//  if(arr[x  ][y  ] > -1) newValue.push(arr[x  ][y  ])
    if(arr[x+1][y  ] > -1) newValue.push(arr[x+1][y  ])
    if(arr[x-1][y+1] > -1) newValue.push(arr[x-1][y+1])
    if(arr[x  ][y+1] > -1) newValue.push(arr[x  ][y+1])
    if(arr[x+1][y+1] > -1) newValue.push(arr[x+1][y+1])
    if(newValue.length === 0) return -1;
    if(newValue.every(v=>v === newValue[0])) return newValue[0]
    return -2
  })
);

console.log(distances);

console.log(minX, maxX, minY, maxY);
console.log(deltaX, deltaY);
