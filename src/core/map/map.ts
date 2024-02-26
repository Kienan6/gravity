import DefaultGameObject from "../../engine/component/default";
import { Renderer } from "../../engine/renderer/types";
import DefaultPlayer from "../player/player";

class DefaultMap extends DefaultGameObject {
    renderer: Renderer
    constructor(renderer: Renderer) {
        super("player-map")
        this.renderer = renderer
    }

    initialize() {
        this.addComponent(new DefaultPlayer(this.renderer, Math.random() * 1024, Math.random() * 576, 20))
    }
    fixedUpdate() {
        this.updateFixedComponents()
    }
    update(time: number) {
        this.updateComponents(time)
    }
}

export default DefaultMap;