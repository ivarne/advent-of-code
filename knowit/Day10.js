const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.spp")).toString();

let stack = [];
for (let i = 0; i < input.length; i++) {
  const code = input[i];
  switch (code) {
    case " ":
      stack.push(31);
      break;
    case ":":
      stack = [stack.reduce((acc, v) => acc + v)];
      break;
    case "|":
      stack.push(3);
      break;
    case "'": {
      const A = stack.pop();
      const B = stack.pop();
      stack.push(A + B);
      break;
    }
    case ".": {
      const A = stack.pop();
      const B = stack.pop();
      stack.push(A - B);
      stack.push(B - A);
      break;
    }
    case "_":
      {
        const A = stack.pop();
        const B = stack.pop();
        stack.push(A * B);
        stack.push(A);
        break;
      }
      break;
    case "/":
      stack.pop();
      break;
    case "i":
      {
        const v = stack.pop();
        stack.push(v);
        stack.push(v);
      }
      break;
    case "\\":
      {
        const v = stack.pop();
        stack.push(v + 1);
      }
      break;
    case "*":
      {
        const A = stack.pop();
        const B = stack.pop();
        stack.push(Math.floor(A / B));
        break;
      }

      break;
    case "]":
      {
        const A = stack.pop();
        if (A % 2 == 0) stack.push(1);
      }
      break;
    case "[":
      {
        const A = stack.pop();
        if (A % 2 == 1) stack.push(A);
      }
      break;
    case "~":
      {
        const A = [stack.pop(), stack.pop(), stack.pop()];
        stack.push(A.reduce((p, n) => (p > n ? p : n)));
      }
      break;
    case "K":
      while (input[i] !== "\n") i++;
      break;
      
  }
}
console.log(stack.reduce((p, n) => (p > n ? p : n)));