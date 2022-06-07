import { Ball } from "./ball";
import { dummyRenderer, objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

const ball = new Ball(
	new vector(0, 0),
	[new vector(0, 0), new vector(10, 10)],
	new dummyRenderer()
);

ball.moveByForce(new vector(1, 1));
