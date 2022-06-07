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
    height: number,
    width: number,
    moveLimit: number,
    name: string,
    box: Box,
    renderer: Renderer
  ) {
    this._position = position;
    this.height = height;
    this.width = width;
    this.name = name;
    this.box = box;
    this.moveLimit = moveLimit;
    this.renderer = renderer;
    this.renderer.make(this.name, objTypes.paddle, height, width);
    this.renderer.move(this.name, this._position);
    console.log(this._position, this.height, this.width);
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
    if (
      isBetween(
        newYPos,
        this.box[0].y + this.moveLimit,
        this.box[1].y - this.moveLimit
      )
    ) {
      this.position.y = newYPos;
    } else if (newYPos < 0) {
      this.position.y = this.box[0].y + this.moveLimit;
    } else {
      this.position.y = this.box[1].y - this.moveLimit;
    }
    this.renderer.move(this.name, this._position);
  }

  isColliding(pos: vector, isLeft: boolean): boolean {
    if (
      !isBetween(
        pos.y,
        this.position.y - this.height / 2,
        this.position.y + this.height / 2
      )
    )
      return false;
    if (isLeft) console.log(pos.x, this.position.x);

    // console.log(pos.x < this.position.x + this.width);
    // console.log(isLeft && pos.x < this.position.x + this.width);
    if (isLeft && pos.x < this.position.x + this.width) return true;
    else if (!isLeft && pos.x > this.position.x - this.width / 2) return true;

    return false;
  }
}
