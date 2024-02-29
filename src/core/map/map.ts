import DefaultGameObject from "../../engine/component/default";
import GravityPhysics from "../../engine/physics/gravity";
import RigidBody from "../../engine/physics/rigidbody";
import { Renderer } from "../../engine/renderer/types";
import PlayerCollider from "../player/collider";
import PlayerController from "../player/controller";
import DefaultPlayer from "../player/player";

const defaultPlayerSize = 20;

class DefaultMap extends DefaultGameObject {
  renderer: Renderer;
  maxPlayers: number;

  constructor(renderer: Renderer, maxPlayers: number) {
    super("player-map");
    this.renderer = renderer;
    this.maxPlayers = maxPlayers;
  }

  initialize() {
    //setup players and player controllers
    for (let i = 0; i < this.maxPlayers; i++) {
      const rb = new RigidBody();
      const p = new DefaultPlayer(
        this.renderer,
        Math.random() * this.renderer.getWidth(),
        Math.random() * this.renderer.getHeight(),
        defaultPlayerSize,
        "#000000",
      );
      p.addComponent(rb);
      this.addComponent(p);
    }

    const p = new DefaultPlayer(
      this.renderer,
      Math.random() * this.renderer.getWidth(),
      Math.random() * this.renderer.getHeight(),
      defaultPlayerSize,
      "#325ca8",
      true,
    );

    const playerCollider = new PlayerCollider(this, defaultPlayerSize);
    const controller = new PlayerController();
    const rigidBody = new RigidBody();
    const gravity = new GravityPhysics(this.getComponentsByTag("player"));

    p.addComponents([playerCollider, rigidBody, controller, gravity]);
    this.addComponent(p);
  }

  fixedUpdate() {
    this.updateFixedComponents();
  }
  update(time: number) {
    this.updateComponents(time);
  }
}

export default DefaultMap;
