import { box, isInside } from "./helpers";
import { objTypes, Renderer as Renderer } from "./renderer";
import { vector } from "./vector";

export class Ball {
	private _position:vector;
	renderer: Renderer;
	dirForce: vector;
    box:[vector,vector];
    radius: number
	constructor(position: vector, box:box, renderer: Renderer) {
		this._position = position;
		this.dirForce = new vector(0, 0);
		this.renderer = renderer;
        this.box = box;
        this.radius = 1;
		renderer.make("ball", objTypes.ball, this.radius, this.radius);
	}

	public get position(): vector {
		return this._position;
	}

	public set position(v: vector) {
		this._position = v;
		this.renderer.move("ball", this._position);
	}

    moveByForce(dirForce:vector = this.dirForce) {
        const newPos = this.position.add(dirForce);
        if (isInside(newPos, this.box)) {
            this.position = newPos;
        }
    }

	tick() {
        this.moveByForce();
    }
}
