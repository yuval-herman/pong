import { Box, isBetween } from "./helpers";
import { objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

export class Paddle {
	private _position: vector;
	renderer: Renderer;
	box: Box;
	name: string;
	height: number;
	width: number;
	moveLimit: number;
	constructor(
		position: vector,
		height: number,
		width: number,
		moveLimit: number,
		name: string,
		box: Box,
		renderer: Renderer
	) {
		this._position = position;
		this.height = height;
		this.width = width;
		this.name = name;
		this.box = box;
		this.moveLimit = moveLimit;
		this.renderer = renderer;
		this.renderer.make(this.name, objTypes.paddle, height, width);
		this.renderer.move(this.name, this._position);
	}

	public get position(): vector {
		return this._position;
	}

	public set position(v: vector) {
		this._position = v;
		this.renderer.move(this.name, this._position);
	}

	moveY(amount: number) {
		const newYPos = this.position.y + amount;
		if (
			isBetween(
				newYPos,
				this.box[0].y + this.moveLimit,
				this.box[1].y - this.moveLimit
			)
		) {
			this.position.y = newYPos;
		} else if (newYPos < 0) {
			this.position.y = this.box[0].y + this.moveLimit;
		} else {
			this.position.y = this.box[1].y - this.moveLimit;
		}
		this.renderer.move(this.name, this._position);
	}
}
