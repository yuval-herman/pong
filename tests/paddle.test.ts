import { Paddle } from "./../src/paddle";
import { dummyRenderer } from "./../src/renderer";
import { vector } from "./../src/vector";

const paddleProps = { height: 2, width: 1, moveLimit: 2 };
const paddle = new Paddle(
	new vector(0, 0),
	[new vector(0, 0), new vector(10, 10)],
	new dummyRenderer(),
	"lPaddle",
	paddleProps
);

describe("test paddle movements", () => {
	it("test manual position change", () => {
		expect(paddle.position).toStrictEqual(new vector(0, 0));
		paddle.position = new vector(10, 10);
		expect(paddle.position).toStrictEqual(new vector(10, 10));
	});
	it("test moveY method", () => {
		paddle.moveY(-5);
		expect(paddle.position).toStrictEqual(new vector(10, 5));
	});
	it("test limits are working", () => {
		paddle.moveY(-10);
		expect(paddle.position).toStrictEqual(new vector(10, 3));
		paddle.moveY(20);
		expect(paddle.position).toStrictEqual(new vector(10, 7));
	});
});
