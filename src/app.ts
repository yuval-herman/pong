import { Ball } from "./ball";
import { Game } from "./game";
import { Paddle } from "./paddle";
import { dummyRenderer, objTypes, Renderer } from "./renderer";
import { vector } from "./vector";
import { Box } from "./helpers";

const field: Box = [new vector(0, 0), new vector(100, 100)];
const renderer = new dummyRenderer();

const ball = new Ball(field[1].div(2), field, renderer);
const lPaddle = new Paddle(
	new vector(0, field[1].y / 2),
	5,
	1,
	3,
	"lPaddle",
	field,
	renderer
);
const rPaddle = new Paddle(
	new vector(field[1].x, field[1].y / 2),
	5,
	1,
	3,
	"rPaddle",
	field,
	renderer
);
const game = new Game(ball, lPaddle, rPaddle, renderer);
game.start((1 / 60) * 1000);
