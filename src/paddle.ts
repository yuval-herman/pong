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
		box: Box,
		renderer: Renderer,
		name: string,
		properties: {
			height: number;
			width: number;
			moveLimit: number;
		}
	) {
		this._position = position;
		this.height = properties.height;
		this.width = properties.width;
		this.name = name;
		this.box = box;
		this.moveLimit = properties.moveLimit;
		this.renderer = renderer;
		this.renderer.make(
			this.name,
			objTypes.paddle,
			properties.height,
			properties.width
		);
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
		this.position.y = Math.min(
			Math.max(newYPos, this.moveLimit + this.height / 2),
			this.box[1].y - (this.moveLimit + this.height / 2)
		);
		this.renderer.move(this.name, this._position);
	}
}
