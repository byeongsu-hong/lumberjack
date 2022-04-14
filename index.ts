import { getPixelColor, getMousePos, keyTap } from "robotjs";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const TREE_INTERVAL = 100;
const TREE_RANGE = 6;

enum INSTRUCTION {
  EMPTY = "empty",
  TREE = "tree",
  NONE = "none",
}

let currentTreeId = 0;
const status: { [id: number]: { [status in INSTRUCTION]: number } } = {};

function getStatus(): INSTRUCTION[] {
  const { x, y } = getMousePos();

  const instructions = Array.from({ length: TREE_RANGE })
    .map((_, i) => i * TREE_INTERVAL)
    .map((v) => getPixelColor(x, y - v))
    .map((v) => {
      switch (v) {
        case "daf6fe":
        case "cfeff8":
          return INSTRUCTION.EMPTY;
        case "9a7642":
          return INSTRUCTION.TREE;
        default:
          return INSTRUCTION.NONE;
      }
    });

  return instructions;
}

function loop() {
  getStatus().forEach((instruction, index) => {
    if (!status[currentTreeId + index]) {
      status[currentTreeId + index] = { empty: 0, none: 0, tree: 0 };
    }
    status[currentTreeId + index][instruction]++;
  });

  let key =
    status[currentTreeId].empty > status[currentTreeId].tree ? "left" : "right";

  keyTap(key);
  keyTap(key);

  currentTreeId++;

  key =
    status[currentTreeId].empty > status[currentTreeId].tree ? "left" : "right";

  keyTap(key);
  keyTap(key);

  currentTreeId++;

  key =
    status[currentTreeId].empty > status[currentTreeId].tree ? "left" : "right";

  keyTap(key);
  keyTap(key);

  currentTreeId++;
}

async function main() {
  console.log("please your cursor to tree");
  await sleep(3000);

  while (true) {
    loop();
    await sleep(90);
  }
}

main()
  .then(() => console.log("Done"))
  .catch(console.error);
