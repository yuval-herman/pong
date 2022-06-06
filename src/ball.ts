import { box, isInside } from "./helpers";
import { objTypes, renderer as Renderer } from "./renderer";
import { vector } from "./vector";

export class Ball {
	renderer: Renderer;
	dirForce: vector;
    box:[vector,vector];
    radius: number
	constructor(position: vector, box:box, renderer: Renderer) {
		this.position = position;
		this.dirForce = new vector(0, 0);
		this.renderer = renderer;
        this.box = box;
        this.radius = 1;
		renderer.make("ball", objTypes.ball, this.radius, this.radius);
	}

	public get position(): vector {
		return this.position;
	}

	public set position(v: vector) {
		this.position = v;
		this.renderer.move("ball", this.position);
	}

    handleCollision() {

    }

    moveByForce() {
        const newPos = this.position.add(this.dirForce);
        if (isInside(newPos, this.box)) {
            this.position = newPos;
        } else {
            this.handleCollision()
        }
    }

	tick() {
        this.moveByForce();
    }
}
