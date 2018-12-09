const partLength = 700;
class Game {
  constructor() {
    this.parts = [[0, 1]];
    this.currentPart = 0;
    this.currentPartPos = 1;
  }

  _insertAtCurrentPos(marbleNumber) {
    const part = this.parts[this.currentPart];
    part.splice(this.currentPartPos, 0, marbleNumber);
    if (part.length > partLength) {
      this._splitCurrentPart();
    }
  }
  _splitCurrentPart() {
    // console.log("split current part");

    const part = this.parts[this.currentPart];
    // console.log(part, this.currentPartPos);
    const splitIndex = Math.floor(partLength / 2);
    const first = part.slice(0, splitIndex);
    const last = part.slice(splitIndex);
    this.parts.splice(this.currentPart, 1, first, last);
    if (this.currentPartPos > splitIndex) {
      this.currentPartPos -= splitIndex;
      this.currentPart = (this.currentPart + 1) % this.parts.length;
    }
    // console.log(
    //   this.parts[this.currentPart - 1],
    //   this.parts[this.currentPart],
    //   this.parts[this.currentPart + 1],
    //   this.currentPartPos
    // );
  }
  _addPos2() {
    this.currentPartPos += 2;
    if (this.currentPartPos > this.parts[this.currentPart].length) {
      this.currentPartPos %= this.parts[this.currentPart].length;
      this.currentPart += 1;
      if (this.currentPart >= this.parts.length) {
        this.currentPart = 0;
      }
    }
  }
  _addPosMinus7() {
    this.currentPartPos -= 7;
    if (this.currentPartPos < 0) {
      this.currentPart -= 1;
      if (this.currentPart < 0) {
        this.currentPart = this.parts.length - 1;
      }
      this.currentPartPos =
        this.parts[this.currentPart].length + this.currentPartPos;
    }
  }

  addMarble(marbleNumber) {
    this._addPos2();
    this._insertAtCurrentPos(marbleNumber);
  }
  removeMarble() {
    this._addPosMinus7();
    return this.parts[this.currentPart].splice(this.currentPartPos, 1)[0];
  }
  print() {
    console.log();
    console.log(this.parts.map(part => part.join(", ")).join(", "));
  }
}

function main() {
  const players = 405;
  const lastMarble = 7095300;
  let prevTime = new Date().getTime();
//   const players = 13;
//   const lastMarble = 7999;

  const scores = Array(players).fill(0);
  const game = new Game();
  for (let i = 2; i < lastMarble; i++) {
    if (i % 23 !== 0) {
      game.addMarble(i);
    } else {
      const marble = game.removeMarble(i);
      scores[i % players] += i + marble;
    }
    // // game.print();
    // if (i % 10000 == 0) {
    //   currentTime = new Date().getTime();
    //   console.log(i / 10000, currentTime - prevTime);
    //   prevTime = currentTime;
    // }
  }
//   console.log(scores);
  console.log(scores.sort()[scores.length - 1]);
}
main();
