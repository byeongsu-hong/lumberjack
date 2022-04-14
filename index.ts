import { getPixelColor, getMousePos, keyTap } from "robotjs";

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

async function main() {
  console.log("please your cursor to tree");
  await sleep(3000);

  while (true) {
    const { x, y } = getMousePos();
    const color = getPixelColor(x, y);

    switch (color) {
      case "daf6fe": // nope
        keyTap("left");
        keyTap("left");
        break;
      case "9a7642": // tree
        keyTap("right");
        keyTap("right");
        break;
      default:
    }

    await sleep(220);
  }
}

main()
  .then(() => console.log("Done"))
  .catch(console.error);
