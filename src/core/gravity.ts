import Game from "../engine/game";
import CircleCollider from "../engine/physics/collider";
import CanvasRenderer from "../engine/renderer/canvas";
import DefaultMap from "./map/map";
import PlayerCollider from "./player/collider";
import PlayerController from "./player/controller";
import DefaultPlayer from "./player/player";
import { Player } from "./player/types";

const defaultPlayerSize = 20

//TODO - need configuration for game director
class Gravity extends Game {
    //TODO - interface
    map: DefaultMap
    maxPlayers: number

    constructor(maxPlayers: number) {
        super(new CanvasRenderer("root", 1024, 576), [])
        this.maxPlayers = maxPlayers
        this.map = new DefaultMap(this.renderer)
    }

    start() {
        this.renderer.createView()
        //test map
        this.addGameObject(this.map)
        //test player

        //setup players and player controllers
        for(let i = 0; i < this.maxPlayers; i++) {
            const p = new DefaultPlayer(this.renderer, Math.random() * 1024, Math.random() * 576, defaultPlayerSize)
            const playerCollider = new PlayerCollider(this.map, defaultPlayerSize)
            const c = new PlayerController()

            p.addComponents([playerCollider, c])
            this.addGameObject(p)
        }

    }
}

export default Gravity;