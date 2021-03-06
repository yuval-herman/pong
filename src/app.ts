import { Ball } from "./ball";
import { Game } from "./game";
import { Paddle } from "./paddle";
import { vector } from "./vector";
import { HTMLRenderer } from "./htmlRenderer";

const renderer = new HTMLRenderer(true);

// this will always be the same
const field = renderer.getField();

const ball = new Ball(field[1].div(2), field, renderer);
const paddleProps = { height: 10, width: 3, moveLimit: 3 };
const lPaddle = new Paddle(
	new vector(30, field[1].y / 2),
	field,
	renderer,
	"lPaddle",
	paddleProps
);
const rPaddle = new Paddle(
	new vector(field[1].x - 30, field[1].y / 2),
	field,
	renderer,
	"rPaddle",
	paddleProps
);
const game = new Game(ball, lPaddle, rPaddle, renderer);

// this will not be the same

window.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "ArrowUp":
			game.rPaddleMove = -1;
			break;

		case "ArrowDown":
			game.rPaddleMove = 1;
			break;

		case "KeyW":
			game.lPaddleMove = -1;
			break;

		case "KeyS":
			game.lPaddleMove = 1;
			break;

		default:
			break;
	}
});

window.addEventListener("keyup", (e) => {
	switch (e.code) {
		case "ArrowUp":
			game.rPaddleMove = 0;
			break;

		case "ArrowDown":
			game.rPaddleMove = 0;
			break;

		case "KeyW":
			game.lPaddleMove = 0;
			break;

		case "KeyS":
			game.lPaddleMove = 0;
			break;

		default:
			break;
	}
});

// game.start((1 / 60) * 1000);

document.getElementById("btn_start")?.addEventListener("click", () => {
	const btn = document.getElementById("btn_start")!;
	if (btn.innerText === "start") {
		game.start((1 / 30) * 1000);
		btn.innerText = "stop";
	} else {
		game.stop();
		btn.innerText = "start";
	}
});
