const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, "data5")).toString();

// let data = "aAbcAaCBdDe";

// console.log("a".charCodeAt(0) - "A".charCodeAt(0));
function react(data) {
  let i = 0;
  while (i + 1 < data.length) {
    const a = data.charCodeAt(i);
    const b = data.charCodeAt(i + 1);
    if (Math.abs(a - b) === 32) {
      // console.log(data,i)
      if (i + 1 === data.length) {
        data = data.slice(0, i);
      }
      if (i == 0) {
        data = data.slice(i + 2);
      } else {
        data = data.slice(0, i) + data.slice(i + 2);
        i--;
      }
    } else {
      i++;
    }
  }
  return data.length;
}
// task1
console.log("task1 ",react(data));
//task2
function removeChar(data, char){
    const capital = String.fromCharCode(char.charCodeAt(char) - 32)
    return react(data.split("").filter(d=>d !==char && d !== capital).join(""))
}
// console.log(data)
const res = "abcdefghijklmnopqrstuvwxyz".split("").map(c=>removeChar(data, c));
let shortest = 100000000;
res.forEach(len=>{
    if(len<shortest)  shortest = len;
})
console.log("task2 ", shortest)