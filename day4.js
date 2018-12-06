const fs = require("fs");
const path = require("path");

const logs = fs
  .readFileSync(path.join(__dirname, "data4"))
  .toString()
  .split("\n")
  .sort();

let guard;
let day = [];
let prevMessage = undefined;
let guardDays = {};
logs.forEach(log => {
  const match = log.match(/\[\d{4}-\d{2}-\d{2} \d\d:(\d\d)\] (.*)/);
  const [_, minutes, message] = match;
  if ((group = message.match(/(#\d+)/))) {
    // new guard on duty
    if (guard) {
      // store days on all but first iteration
      if (!guardDays[guard]) guardDays[guard] = [];
      guardDays[guard].push([...day]);
      day = [];
    }
    guard = group[0];
  } else {
    day.push(parseInt(minutes));
  }
});
guardDays[guard].push(day);
const guardDatas = Object.keys(guardDays).map(guard => {
  const days = guardDays[guard];
  let minutesSlept = 0;
  const sleepSchedule = Array(60).fill(0);
  days.forEach(day => {
    for (let i = 0; i < day.length; i++) {
      const startSleep = day[i];
      const endSleep = day[++i];
      minutesSlept += endSleep - startSleep;
      for (let j = startSleep; j < endSleep; j++) {
        sleepSchedule[j] += 1;
      }
    }
  });
  return {
    id: guard,
    minutesSlept,
    days,
    sleepPerDay: minutesSlept / days.length,
    sleepSchedule
  };
});
//console.log(guardDatas.sort((a, b) => a.sleepPerDay < b.sleepPerDay?-1:1).map(g=>`${g.id} ${g.minutesSlept} ${g.sleepPerDay}`))
const tmp = guardDatas.sort((a, b) => a.minutesSlept < b.minutesSlept?-1:1)
const lazyGuard = tmp[tmp.length-1];
// console.log(lazyGuard.id)
lazyGuard.sleepSchedule.forEach((d, i)=>console.log( i, d))
// console.log(1987*34)

// part 2
let sleepyGuardid;
let sleepyGuardMinute;
let sleepyGuardTimes = 0;
console.log(guardDatas)
guardDatas.forEach(g=>{
    g.sleepSchedule.forEach((times, minute)=>{
        if(times > sleepyGuardTimes){
            sleepyGuardTimes = times;
            sleepyGuardMinute = minute;
            sleepyGuardid = g.id;
        }
    })
})


console.log(sleepyGuardid, sleepyGuardTimes, sleepyGuardMinute, sleepyGuardMinute*sleepyGuardTimes)
console.log(2633 *  30)