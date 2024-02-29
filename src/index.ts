import Gravity from "./core/gravity";
import DefaultMap from "./core/map/map";

function main() {
  let game = new Gravity(100);
  game.start();
  //while (document.getElementById("root") === null) {setTimeout(() => {return}, 1000)}
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyR") {
      location.reload();
    }
  });
}

main();
