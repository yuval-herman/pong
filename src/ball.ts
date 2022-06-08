import { Box, isBetween, isInside, shrinkBox } from "./helpers";
import { objTypes, Renderer as Renderer } from "./renderer";
import { vector } from "./vector";

export class Ball {
	private _position: vector;
	renderer: Renderer;
	dirForce: vector;
	box: Box;
	radius: number;
	constructor(position: vector, box: Box, renderer: Renderer) {
		this._position = position;
		this.dirForce = new vector(1, 1);
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
		// console.log(this._position);
	}

	moveByForce(dirForce: vector = this.dirForce) {
		this.dirForce = dirForce;
		const newPos = this.position.add(dirForce);
		const shrunkBox = shrinkBox(this.box, this.radius / 2);
		if (isInside(newPos, shrunkBox)) {
			this.position = newPos;
		} else {
			if (this.handleCollision(newPos, shrunkBox)) return;
			this.moveByForce();
		}
	}

	handleCollision(pos: vector = this.position, box = this.box) {
		if (!isBetween(pos.x, box[0].x, box[1].x)) {
			// collision in vertical axis
			this.dirForce.x *= -1;
		} else if (!isBetween(pos.y, box[0].y, box[1].y)) {
			// collision in horizontal axis
			this.dirForce.y *= -1;
		}
		return true;
	}

	tick() {
		this.moveByForce();
	}
}
