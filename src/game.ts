import { Ball } from "./ball";
import { Paddle } from "./paddle";
import { Renderer } from "./renderer";
import { Box, isBetween, isInside } from "./helpers";
import { vector } from "./vector";

export class Game {
	ball: Ball;
	lPaddle: Paddle;
	lPaddleMove = 0;
	rPaddle: Paddle;
	rPaddleMove = 0;
	renderer: Renderer;

	constructor(
		ball: Ball,
		lPaddle: Paddle,
		rPaddle: Paddle,
		renderer: Renderer
	) {
		this.ball = ball;
		this.lPaddle = lPaddle;
		this.rPaddle = rPaddle;
		this.renderer = renderer;
	}

	tick() {
		this.handlePaddleCollision();
		this.ball.tick();
		this.lPaddle.moveY(this.lPaddleMove);
		this.rPaddle.moveY(this.rPaddleMove);
	}

	computeBox(obj: { height: number; width: number; position: vector }): Box {
		return [
			new vector(
				Math.floor(obj.position.x - obj.width / 2),
				Math.floor(obj.position.y - obj.height / 2)
			),
			new vector(
				Math.floor(obj.position.x + obj.width / 2),
				Math.floor(obj.position.y + obj.height / 2)
			),
		];
	}

	handlePaddleCollision() {
		if (
			isInside(this.ball.position, this.computeBox(this.lPaddle)) ||
			isInside(this.ball.position, this.computeBox(this.rPaddle))
		) {
			this.ball.dirForce.x *= -1;
		}
	}

	start(ms: number) {
		this.renderer.setInterval(this.tick.bind(this), ms);
	}

	stop() {
		this.renderer.stopInterval();
	}
}
