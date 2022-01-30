import Firework from './firework.js';
import { random } from './ultils.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const cw = window.innerWidth;
const ch = window.innerHeight;

let hue = 120;
let fireworks = [];
let particles = [];
let timerTotal = 10;
let timerTick = 0;

const loop = () => {
  window.requestAnimationFrame(loop);

  hue = random(0, 360);

  ctx.globalCompositeOperation = 'destination-out';

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, cw, ch);

  ctx.globalCompositeOperation = 'lighter';

  var i = fireworks.length;
  while (i--) {
    fireworks[i].draw(ctx, hue);
    fireworks[i].update(i, particles, hue, fireworks, ctx);
  }

  var i = particles.length;
  while (i--) {
    particles[i].draw(ctx, hue);
    particles[i].update(i, particles, hue, fireworks, ctx);
  }

  if (timerTick >= timerTotal) {
    fireworks.push(new Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
    timerTick = 0;
  } else {
    timerTick++;
  }
};
(() => {
  canvas.width = cw;
  canvas.height = ch;
  window.addEventListener('load', loop);
})();
