import Gravity from "./core/gravity";
import DefaultMap from "./core/map/map";

function main() {
    //while (document.getElementById("root") === null) {setTimeout(() => {return}, 1000)}
    const game = new Gravity(1);
    game.start()
}

main();