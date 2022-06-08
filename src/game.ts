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
		// if (isInside(this.ball.position, this.computeBox(this.lPaddle))) {
		//   this.ball.dirForce.x *= -1;
		// }
		// console.log(this.lPaddle.position.x, this.ball.position);
		if (
			this.lPaddle.isColliding(this.ball.position, true) ||
			this.rPaddle.isColliding(this.ball.position, false)
		)
			this.ball.dirForce.x *= -1;
		// if (
		//   this.ball.position.x < this.lPaddle.position.x + this.lPaddle.width ||
		//   this.ball.position.x > this.rPaddle.position.x - this.rPaddle.width
		// )
	}

	start(ms: number) {
		this.renderer.setInterval(this.tick.bind(this), ms);
	}

	stop() {
		this.renderer.stopInterval();
	}
}
