import { box, isBetween, isInside } from "./helpers";
import { objTypes, Renderer as Renderer } from "./renderer";
import { vector } from "./vector";

export class Ball {
	private _position: vector;
	renderer: Renderer;
	dirForce: vector;
	box: [vector, vector];
	radius: number;
	constructor(position: vector, box: box, renderer: Renderer) {
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

	moveByForce(dirForce: vector = this.dirForce) {
		const newPos = this.position.add(dirForce);
		if (isInside(newPos, this.box)) {
			this.position = newPos;
		} else this.handleCollision(newPos);
	}

	handleCollision(pos: vector = this.position) {
		if (!isBetween(pos.x, this.box[0].x, this.box[1].x)) {
			// collision in vertical axis
			this.dirForce.x *= 1;
		} else if (!isBetween(pos.y, this.box[0].y, this.box[1].y)) {
			// collision in horizontal axis
			this.dirForce.y *= -1;
		}
	}

	tick() {
		this.moveByForce();
	}
}
