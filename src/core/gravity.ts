import { scaleDefault } from "../engine/common/scaler";
import Game from "../engine/game";
import CircleCollider from "../engine/physics/collider";
import GravityPhysics from "../engine/physics/gravity";
import RigidBody from "../engine/physics/rigidbody";
import CanvasRenderer from "../engine/renderer/canvas";
import DefaultMap from "./map/map";
import PlayerController from "./player/controller";
import DefaultPlayer from "./player/player";

const defaultMass = 20;
const scale = 6;
//TODO - need configuration for game director
class Gravity extends Game {
  //TODO - interface
  map: DefaultMap;
  maxPlayers: number;

  constructor(maxPlayers: number) {
    super(new CanvasRenderer("root", 1920, 1080), []);
    this.maxPlayers = maxPlayers;
  }

  start() {
    this.renderer.createView();
    this.map = new DefaultMap(this.renderer);

    //initialize players
    for (let i = 0; i < this.maxPlayers; i++) {
      const rb = new RigidBody();
      const p = new DefaultPlayer(this.renderer, this.map, {
        startX: Math.random() * this.renderer.getWidth(),
        startY: Math.random() * this.renderer.getHeight(),
        color: "#000000",
        mass: defaultMass,
        minMass: 5,
        scaleFn: scaleDefault(scale),
      });
      p.addComponent(rb);

      this.map.addGameObject(p);
    }

    const p = new DefaultPlayer(this.renderer, this.map, {
      startX: Math.random() * this.renderer.getWidth(),
      startY: Math.random() * this.renderer.getHeight(),
      color: "#325ca8",
      mass: 50,
      minMass: 5,
      scaleFn: scaleDefault(scale),
      isSelf: true,
    });

    //const playerCollider = new PlayerCollider(this.map, scaleDefault(scale));
    const controller = new PlayerController();
    const rigidBody = new RigidBody();
    const collider = new CircleCollider(
      this.map,
      scaleDefault(scale)(50),
      "player",
    );
    const gravity = new GravityPhysics(this.map.getGameObjectsByTag("player"), {
      maxDist: 400,
      minDist: 5,
      gravity: 2,
    });

    p.addComponents([collider, rigidBody, controller, gravity]);

    //add player to scene
    this.map.addGameObject(p);

    //add scene to game

    this.addObject(this.map);
  }
}

export default Gravity;
