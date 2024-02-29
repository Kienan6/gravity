import Game from "../engine/game";
import CanvasRenderer from "../engine/renderer/canvas";
import DefaultMap from "./map/map";

//TODO - need configuration for game director
class Gravity extends Game {
  //TODO - interface
  map: DefaultMap;

  constructor(maxPlayers: number) {
    super(new CanvasRenderer("root", 1400, 788), []);
    this.map = new DefaultMap(this.renderer, maxPlayers);
  }

  start() {
    this.renderer.createView();
    //top level game objects
    this.addGameObject(this.map);
  }
}

export default Gravity;
