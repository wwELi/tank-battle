import { getShootingDirection } from './tools';

export default class Tank {

  static width = 30;
  static barrelWith = 20;

  headerX;
  headerY;
  x;
  y;
  ctx;
  direction;
  clears = [];

  constructor(x, y, direction, ctx) {
    Object.assign(this, { x, y, direction, ctx });
  }

  /**
   *  tank move function 
   */
  move(speed) {
    this.clear();
    const { x, y, direction } = this;
    const [sx, sy] = getShootingDirection(x, y, direction, speed);
    this.x = sx;
    this.y = sy;

    this.drow();
  };

  clear() {
    while(this.clears.length) {
      this.clears.pop()();
    }
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  /**
   *  drow tank
   */
  drow() {
    const { x, y, direction, ctx } = this;
    const centerX = x + Tank.width / 2;
    const centerY = y + Tank.width / 2;

    const [hx, hy] = getShootingDirection(centerX, centerY, direction, Tank.barrelWith);
    this.headerX = hx;
    this.headerY = hy;

    ctx.fillRect(x, y, Tank.width, Tank.width);

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'red';
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(hx, hy);

    ctx.stroke();
    ctx.closePath();

    this.clears.push(() => ctx.clearRect(x, y, Tank.width, Tank.width));
    this.clears.push(() => {

      const w = Tank.barrelWith - Tank.width / 2;
      ctx.clearRect(x, y, Tank.width, Tank.width);

      switch(direction) {
        case 'UP':
          ctx.clearRect(x, y - w, Tank.width, w);
          break;
        case 'RIGHT':
          ctx.clearRect(x + Tank.width, y, w, Tank.width);
          break;
        case 'DOWN':
          ctx.clearRect(x, y + Tank.width, Tank.width, w);
          break;
        case 'LEFT':
          ctx.clearRect(x - w, y, w, Tank.width);
          break;
      }
    });
  };
}

