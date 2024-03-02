import DefaultScene from "../../engine/component/defaults/scene";
import { Renderer } from "../../engine/renderer/types";

class DefaultMap extends DefaultScene {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    super("player-map", renderer);
    this.renderer = renderer;
  }
}

export default DefaultMap;
