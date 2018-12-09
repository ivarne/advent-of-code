function insertMarble(game, currentMarbleIndex, marbleNumber) {
  const length = game.length;
  let nextMarbleIndex = currentMarbleIndex + 2;
  if (nextMarbleIndex > length) {
    nextMarbleIndex = nextMarbleIndex % length;
  }
  game.splice(nextMarbleIndex, 0, marbleNumber);
  return nextMarbleIndex;
}

function takeMarble(game, scores, players, currentMarbleIndex, i) {
  scores[i % players] += i; // take current marble
  let removeMarbleFrom = currentMarbleIndex - 7;
  if (removeMarbleFrom < 0) {
    removeMarbleFrom += game.length;
  }
  scores[i % players] += game.splice(removeMarbleFrom, 1)[0];
  return removeMarbleFrom;
}



function main() {
  const players = 405;
  const lastMarble = 70953;
  let prevTime = new Date().getTime();
  // const players = 30;
  // const lastMarble = 5807;

  const scores = Array(players).fill(0);
  const game = [0,1];
  let currentMarbleIndex = 1;
  for (let i = 2; i < lastMarble; i++) {
    if (i % 23 !== 0) {
      currentMarbleIndex = insertMarble(game, currentMarbleIndex, i);
      // console.log(currentMarbleIndex, game)
    } else {
      currentMarbleIndex = takeMarble(
        game,
        scores,
        players,
        currentMarbleIndex,
        i
      );
    }
    if (i % 10000 == 0) {
      currentTime = new Date().getTime();
      console.log(i / 10000, currentTime - prevTime);
      prevTime = currentTime;
    }
  }
  console.log(scores.sort()[scores.length - 1]);
}
main();
