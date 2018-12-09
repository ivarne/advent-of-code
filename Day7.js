const fs = require("fs");
const path = require("path");

const data = {};
fs.readFileSync(path.join(__dirname, "data7"))
  .toString()
  .split("\n")
  .forEach(line => {
    const match = line.match(
      /Step ([A-Z]) must be finished before step ([A-Z]) can begin./
    );
    if (data[match[2]]) {
      data[match[2]].add(match[1]);
    } else {
      data[match[2]] = new Set(match[1]);
    }
    if (!data[match[1]]) {
      data[match[1]] = new Set();
    }
  });
const chars = [];

const workersTask = [null, null, null, null, null];
function getNextWork() {
  const nextChars = Object.keys(data)
    .filter(key => data[key].size == 0 && workersTask.indexOf(key) === -1)
    .sort();
  if (nextChars.length > 0) {
    chars.push(nextChars[0]);
    return nextChars[0];
  }
}
function finishWork(work) {
  if (!work) return;
  delete data[work];
  Object.values(data).forEach(s => s.delete(work));
}

let workersTime = [0, 0, 0, 0, 0];
let prevWorkersTime = [...workersTime];
let time = 0;
while (Object.keys(data).length > 0) {
  workersTime = workersTime.map((timeLeft, i) => {
    if (timeLeft == 0) {
      finishWork(workersTask[i]);
      workersTask[i] = ".";
      const work = getNextWork();
      if (work) {
        workersTask[i] = work;
        return 60 + work.charCodeAt(0) - 64-1;
      }
      return 0;
    }
    return timeLeft - 1;
  });
  if (workersTime.some((v, i) => v > prevWorkersTime[i])){
      console.log(data)
    console.log(time, workersTask.join("") + " " + workersTime.join(" " ));
  }
  prevWorkersTime = [...workersTime];
  time++;
}
console.log(chars.join(""));
console.log(time);
