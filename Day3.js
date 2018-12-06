const fs = require("fs");
const path = require("path");

const claims = fs
  .readFileSync(path.join(__dirname, "data3"))
  .toString()
  .split("\n");

const fabric = {};
const noCollisions = {};

claims.forEach(claim => {
  const [id, rest] = claim.split(" @ ");
  const [pos, size] = rest.split(": ");
  const [posx, posy] = pos.split(",").map(p => parseInt(p));
  const [sizex, sizey] = size.split("x").map(p => parseInt(p));
  let collision = false;
  for (let x = posx; x < posx + sizex; x++) {
    for (let y = posy; y < posy + sizey; y++) {
      const i = `${x}*${y}`;
      if (fabric[i]) {
        fabric[i]++;
        collision = true;
      } else {
        fabric[i] = 1;
      }
    }
  }
  if(!collision) noCollisions[id] = {posx, posy, sizex, sizey}
});
// solution 1
console.log(Object.values(fabric).filter(f => f> 1).length);
Object.keys(noCollisions).filter(key=>{
    const {posx, posy, sizex, sizey} = noCollisions[key];
    let allClear = true;
    for (let x = posx; x < posx + sizex; x++) {
        for (let y = posy; y < posy + sizey; y++) {
          const i = `${x}*${y}`;
          if (fabric[i] !== 1) {
            allClear = false;
          } 
        }
      }
      if(allClear) console.log(key)
})