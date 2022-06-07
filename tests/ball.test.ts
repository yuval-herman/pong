import { Ball } from "./../src/ball";
import { dummyRenderer } from "./../src/renderer";
import { vector } from "./../src/vector";

const ball = new Ball(
  new vector(0, 0),
  [new vector(0, 0), new vector(10, 10)],
  new dummyRenderer()
);
describe("test ball movements", () => {
  it("try moving (1,1)", () => {
    expect(ball.position).toStrictEqual(new vector(0, 0));
    ball.moveByForce(new vector(1, 1));
    expect(ball.position).toStrictEqual(new vector(1, 1));
  });
  it("test manual position change", () => {
    ball.position = new vector(7, 7);
    expect(ball.position).toStrictEqual(new vector(7, 7));
  });
  it("test ball moves when ticking", () => {
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(8, 8));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(9, 9));
  });
  it("test ball collision handling", () => {
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(8, 8));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(7, 7));
  });
  it("test everything together", () => {
    ball.position = new vector(8, 5);
    ball.moveByForce(new vector(1, -1));
    expect(ball.position).toStrictEqual(new vector(9, 4));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(8, 3));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(7, 2));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(6, 1));
    ball.tick();
    expect(ball.position).toStrictEqual(new vector(5, 2));
    ball.tick();
  });
});
