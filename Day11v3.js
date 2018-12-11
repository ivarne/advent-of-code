const input = 9995;
// const input = 8;

const grid = [];
// The power level in a given fuel cell can be found through the following process:
for (let x = 1; x <= 300; x++) {
  const column = [];
  for (let y = 1; y <= 300; y++) {
    // Find the fuel cell's rack ID, which is its X coordinate plus 10.
    const RackID = x + 10;
    // Begin with a power level of the rack ID times the Y coordinate.
    let powerLevel = RackID * y;
    // Increase the power level by the value of the grid serial number (your puzzle input).
    powerLevel += input;
    // Set the power level to itself multiplied by the rack ID.
    powerLevel *= RackID;
    // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
    const pls = powerLevel.toString();
    const hundreds = pls[pls.length - 3];
    powerLevel = parseInt(hundreds || "0");
    // Subtract 5 from the power level.
    powerLevel -= 5;
    column.push(powerLevel);
  }
  grid.push(column);
}
maxX = 0;
maxY = 0;
maxSize = 0;
maxPower = -Infinity;
powerCache = {};
for (let size = 1; size <= 300; size++) {
  powerCache[size] = {};
  for (let x = 0; x <= 300 - size; x++) {
    for (let y = 0; y <= 300 - size; y++) {
      let power = 0;
      let pc;
      if ((pc = powerCache[size / 2])) {
        const halfSizeX = x + size / 2;
        const halfSizeY = y + size / 2;
        power =
          pc[`${x},${y}`] +
          pc[`${halfSizeX},${y}`] +
          pc[`${x},${halfSizeY}`] +
          pc[`${halfSizeX},${halfSizeY}`];
      } else if ((pc = powerCache[size / 3])) {
        const thirdSize = size / 3;
        power =
          pc[`${x},${y}`] +
          pc[`${x + thirdSize},${y}`] +
          pc[`${x + 2 * thirdSize},${y}`] +
          pc[`${x},${y + thirdSize}`] +
          pc[`${x},${y + 2 * thirdSize}`] +
          pc[`${x + thirdSize},${y + thirdSize}`] +
          pc[`${x + 2 * thirdSize},${y + thirdSize}`] +
          pc[`${x + thirdSize},${y + 2 * thirdSize}`] +
          pc[`${x + 2 * thirdSize},${y + 2 * thirdSize}`];
      } else if (size > 1) {
        pc = powerCache[size - 1];
        power = pc[`${x},${y}`];
        for (x_offset = 0; x_offset < size; x_offset++) {
          power += grid[x_offset + x][size - 1 + y];
        }
        for (y_offset = 0; y_offset < size - 1; y_offset++) {
          power += grid[size - 1 + x][y_offset + y];
        }
      } else {
        power += grid[x][y];
        // for (x_offset = 0; x_offset < size; x_offset++) {
        //   for (y_offset = 0; y_offset < size; y_offset++) {
            // power += grid[x_offset + x][y_offset + y];
        //   }
        // }
      }
      powerCache[size][`${x},${y}`] = power;

      if (power > maxPower) {
        maxX = x + 1;
        maxY = y + 1;
        maxSize = size;
        maxPower = power;
      }
    }
  }
}

console.log(
  "maxX:",
  maxX,
  " maxY:",
  maxY,
  " maxPower:",
  maxPower,
  " maxSize:",
  maxSize
);
