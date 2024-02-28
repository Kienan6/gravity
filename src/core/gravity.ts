import Game from "../engine/game";
import CircleCollider from "../engine/physics/collider";
import CanvasRenderer from "../engine/renderer/canvas";
import DefaultMap from "./map/map";
import PlayerCollider from "./player/collider";
import PlayerController from "./player/controller";
import DefaultPlayer from "./player/player";
import { Player } from "./player/types";

const defaultPlayerSize = 20;

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
