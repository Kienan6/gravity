import Gravity from "./core/gravity";

function main() {
  let game = new Gravity(20);
  game.start();
  //while (document.getElementById("root") === null) {setTimeout(() => {return}, 1000)}
  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyR") {
      location.reload();
    }
  });
}

main();
