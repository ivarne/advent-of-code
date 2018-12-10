const fs = require("fs");
const path = require("path");

const data = fs
  .readFileSync(path.join(__dirname, "data10"))
  .toString()
  .split("\n")
  .map(line => {
    const match = line.match(
      /position=< *(-?\d+), *(-?\d+)> velocity=< *(-?\d+), *(-?\d+)>/
    );
    // if(!match) return line;
    return {
      x: parseInt(match[1]),
      y: parseInt(match[2]),
      dx: parseInt(match[3]),
      dy: parseInt(match[4])
    };
  });

function printPositions(positions, minX, maxX, minY, maxY) {
  const res = [];
  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(" ");
    }
    res.push(row);
  }
  positions.forEach(p => {
    res[p.y - minY][p.x - minX] = "X";
  });
  res.forEach(row => {
    console.log("row", row.join(""));
  });
}

let prevDeltaX = Infinity;
let prevDeltaY = Infinity;

let found = false;

for (let i = 0; i < 100005; i++) {
  let maxX = -Infinity,
    maxY = -Infinity,
    minX = Infinity,
    minY = Infinity;
  const positions = data.map(row => {
    const x = row.x + i * row.dx;
    const y = row.y + i * row.dy;
    if (maxX < x) maxX = x;
    if (maxY < y) maxY = y;
    if (minX > x) minX = x;
    if (minY > y) minY = y;
    return { x, y };
  });
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;
  if (found) {
      console.log(i);
    printPositions(positions, minX, maxX, minY, maxY);
    break;
  }
  if (deltaX > prevDeltaX || deltaY > prevDeltaY) {
    i -= 2;
    found = true;
  }
  prevDeltaX = deltaX;
  prevDeltaY = deltaY;
}

