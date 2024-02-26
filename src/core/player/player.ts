
import DefaultGameObject from "../../engine/component/default";
import { CollisionInfo } from "../../engine/physics/types";
import { Renderer } from "../../engine/renderer/types";
import { Player } from "./types";

class DefaultPlayer extends DefaultGameObject implements Player {
    renderer: Renderer
    radius: number;

    constructor(renderer: Renderer, startX: number, startY: number, size: number) {
        super("player")
        this.renderer = renderer
        this.x = startX
        this.y = startY
        this.radius = size
        this.components = []
    }

    getRadius() {
        return this.radius
    }

    onCollision(collision: CollisionInfo): void {
        this.renderer.createCircle(this.x, this.y, this.radius, "#ff5599")
    }

    onDeath: () => void;
    onSpawn: () => void;
    onContact() {
        this.renderer.createCircle(this.x, this.y, this.radius, "#555222")
    }

    fixedUpdate(): void {
        this.updateFixedComponents()
    }
    
    update(time: number) {
        this.renderer.createCircle(this.x, this.y, this.radius, "#000000")
        this.updateComponents(time)
    }
}

export default DefaultPlayer;