export default class ParticleGenerator {
  constructor() {
    this.particles = [];
  }

  updateAndDraw(ctx) {
    // Create new particles occasionally.
    if (Math.random() * 100 < 13) {
      const x = 0;
      const y = Math.random() * ctx.canvas.height;
      const size = Math.random() * 3 + 2; // Random size
      const speed = {
        x: Math.random() * 2 + 1,
        y: Math.random() * 2 - 1,
      }; // Speed towards right with slight vertical randomness
      const life = 1000;
      this.particles.push(new Particle(x, y, size, speed, life));
    }

    // Update and draw particles. Remove dead ones.
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      particle.draw(ctx);
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class Particle {
  constructor(x, y, size, speed, life) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.life = life;
    this.maxLife = life;
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.life--;
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(15, 56, 15, ${this.life / this.maxLife})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  isDead() {
    return this.life <= 0;
  }
}
