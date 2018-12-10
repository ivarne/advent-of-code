function main() {
  const players = 405;
  const lastMarble = 7095300;
    // const players = 10;
    // const lastMarble = 50;
  const nextIndex = [1,0];
  const prevIndex = [1,0];
  let pos = 1;
  const scores = Array(players).fill(0);

  for (let i = 2; i < lastMarble; i++) {
    if (i % 23 !== 0) {
      pos = nextIndex[pos];
      const prev = pos;
      const next = nextIndex[pos];
      prevIndex.push(prev);
      nextIndex.push(next);
      prevIndex[next] = i;
      nextIndex[pos] = i;
      pos = i;
    } else {
      pos =
        prevIndex[
          prevIndex[prevIndex[prevIndex[prevIndex[prevIndex[prevIndex[pos]]]]]]
        ];
      
      scores[i % players] += i + pos;
      const next = nextIndex[pos];
      const prev = prevIndex[pos];

      prevIndex.push(prev);
      nextIndex.push(next);
      nextIndex[prev] = next;
      prevIndex[next] = prev;
      pos = next;
    }
    //   {
    // //     console.log(i, pos)
    // //     console.log( prevIndex.join(" "))
    // //     console.log( nextIndex.join(" "));
    //     let p = prevIndex[0];
    //     let game = [];
    //     do{
    //         p = nextIndex[p];
    //         game.push(p)
    //     }while(p!== prevIndex[0])
    //     console.log(game.join(" "));
    // //     p = 0;
    // //     console.log(prevIndex.map(_=>{
    // //         p = prevIndex[p];
    // //         return p;
    // //     }).reverse().join(" "));


    //  }
  }
  //   console.log(scores);
  return scores.sort()[scores.length - 1];
}
let maxScore = main();
const start = new Date().getTime();
 maxScore = main();
const end = new Date().getTime();
console.log(maxScore);
console.log("Tid millisekunder: ",end-start)

