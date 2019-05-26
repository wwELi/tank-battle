

import { getShootingDirection } from './tools';

export default class Bullet {

    static width = 5;
    direction;
    clears = [];

    constructor(x, y, direction, ctx) {
        Object.assign(this, { x, y, direction, ctx });
        requestAnimationFrame(() => this.move())
    }

    clear() {
        const { x, y, ctx } = this;
        while(this.clears.length) {
            this.clears.pop()();
        }
    }

    move() {

        const { x, y, direction, ctx } = this;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        this.clear();
        const [cx, cy] = getShootingDirection(x, y, direction, 2);

        if (cx < 0 || cy < 0 || cx > width || cy > height) {
            return;
        }

        this.x = cx;
        this.y = cy;
        this.drow();

        requestAnimationFrame(() => this.move());
    }

    drow() {
        const { x, y, ctx } = this;
        const lineWidth = 1;

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(x, y, Bullet.width, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        this.clears.push(() => {
            ctx.clearRect(x - Bullet.width - lineWidth, y - Bullet.width - lineWidth, (Bullet.width + 1) * 2, (Bullet.width + 1) * 2)
        })
    }
}