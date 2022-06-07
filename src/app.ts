import { Ball } from "./ball";
import { objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

class dummyRenderer implements Renderer {
	objects: Object = {};
	move(name: string, position: vector): void {
		console.log("move", name, position);
	}
	make(name: string, type: objTypes, height: number, width: number): void {
		console.log("make", name, type, height, width);
	}
}

const ball = new Ball(
	new vector(0, 0),
	[new vector(0, 0), new vector(10, 10)],
	new dummyRenderer()
);

ball.moveByForce(new vector(1, 1));
