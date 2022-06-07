import { Ball } from "./ball";
import { Paddle } from "./paddle";
import { dummyRenderer, objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

const paddle = new Paddle(
	new vector(0, 0),
	2,
	1,
	2,
	"right",
	[new vector(0, 0), new vector(10, 10)],
	new dummyRenderer()
);

paddle.position = new vector(1, 1);

paddle.moveY(3);
paddle.moveY(-3);
