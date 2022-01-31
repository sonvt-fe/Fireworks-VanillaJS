import { random } from "./ultils.js";
import Particle from "./particle.js";

const createParticles = (x, y, particles, hue, ctx) => {
  let particleCount = 30;
  while (particleCount--) {
    particles.push(new Particle(x, y, hue, ctx, particles));
  }
};

const calculateDistance = (p1x, p1y, p2x, p2y) => {
  const xDistance = p1x - p2x;
  const yDistance = p1y - p2y;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

class Firework {
  constructor(sx, sy, tx, ty) {
    this.x = sx;
    this.y = sy;

    this.sx = sx;
    this.sy = sy;

    this.tx = tx;
    this.ty = ty;

    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;

    this.coordinates = [];
    this.coordinateCount = 3;

    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 2;
    this.acceleration = 1.05;
    this.brightness = random(50, 70);

    this.draw = function (ctx, hue) {
      ctx.beginPath();

      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
      ctx.stroke();
    };

    this.update = function (index, particles, hue, fireworks, ctx) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      this.speed *= this.acceleration;

      let vx = Math.cos(this.angle) * this.speed, vy = Math.sin(this.angle) * this.speed;

      this.distanceTraveled = calculateDistance(
        this.sx,
        this.sy,
        this.x + vx,
        this.y + vy
      );

      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty, particles, hue, ctx);

        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    };
  }
}

export default Firework;
