const fs = require("fs");
const path = require("path");

const data = fs
  .readFileSync(path.join(__dirname, "data8"))
  .toString()
  .split(" ")
  .map(d => parseInt(d));

function getNode(i) {
  let numChilds = data[i++];
  let numMetadata = data[i++];
  let sumMetadata = 0;
  const children = [];
  const metadata = [];
  // while (numChilds-- > 0) {
  for (let j = 0; numChilds > j; j++) {
    const node = getNode(i);
    children.push(node);
    i = node.i;
  }
  // while (numMetadata-- > 0) {
  for (let j = 0; j < numMetadata; j++) {
    metadata.push(data[i++]);
  }
  if (numChilds > 0) {
    sumMetadata = metadata.reduce((acc, m) => {
      if (children[m-1]) {
        console.log(children[m-1].sumMetadata);
        return acc + children[m-1].sumMetadata;
      }
      return acc;
    }, 0);
  } else {
    sumMetadata = metadata.reduce((acc, m) => acc + m, 0);
  }
  if (sumMetadata > 0) console.log(sumMetadata);
  return { sumMetadata, i, metadata, children };
}
const node = getNode(0);

// console.log(node);
console.log(node.sumMetadata);
