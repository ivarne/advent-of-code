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
maxPower = -Infinity;
for (let x = 0; x < 300 - 2; x++) {
  for (let y = 0; y < 300 - 2; y++) {
    const power = 
        grid[x][y] +
        grid[x+1][y] +
        grid[x+2][y] +
        grid[x][y+1] +
        grid[x+1][y+1] +
        grid[x+2][y+1] +
        grid[x][y+2] +
        grid[x+1][y+2] +
        grid[x+2][y+2] 
    if(power > maxPower){
        maxX = x+1;
        maxY = y+1;
        maxPower = power;
    }
  }
}
console.log(grid[3][5])
console.log(maxX, maxY, maxPower)
