import { colors } from './colors';
import { GameAudio } from './audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  size: number;
  active: boolean;
  settled: boolean;
}

export class FireworksEffect {
  private particles: Particle[] = [];
  private readonly groundLevel: number;
  private readonly canvasWidth: number;
  
  constructor() {
    // Get canvas dimensions for ground level calculation
    const canvas = document.querySelector('canvas');
    this.groundLevel = canvas ? canvas.height * 0.9 : window.innerHeight * 0.9; // 90% of height
    this.canvasWidth = canvas ? canvas.width : window.innerWidth;
  }
  
  async createExplosion(x: number, y: number) {
    const particleCount = 150; // Increased particle count
    const colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
      '#ff00ff', '#00ffff', '#ff8c00', '#ff1493'
    ];
    
    await GameAudio.playFireworkSound();
    
    // Create multiple explosion points
    for (let j = 0; j < 3; j++) { // Create 3 clustered explosions
      const offsetX = x + (Math.random() - 0.5) * 100;
      const offsetY = y + (Math.random() - 0.5) * 100;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 5 + Math.random() * 8; // Increased speed range
        
        this.particles.push({
          x: offsetX,
          y: offsetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // Initial upward boost
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 200 + Math.random() * 100, // Longer life
          size: 3 + Math.random() * 5,
          active: true,
          settled: false
        });
      }
    }
  }
  
  update() {
    this.particles.forEach(p => {
      if (p.active) {
        p.x += p.vx;
        p.y += p.vy;
        
        // Add gravity and air resistance
        p.vy += 0.15; // Increased gravity
        p.vx *= 0.99; // Air resistance
        
        // Check if particle hits the ground
        if (p.y >= this.groundLevel) {
          p.y = this.groundLevel;
          p.active = false;
          p.settled = true;
          p.vy = 0;
          p.vx *= 0.3; // Reduce horizontal movement on impact
        }
        
        // Bounce off walls
        if (p.x < 0 || p.x > this.canvasWidth) {
          p.vx *= -0.5;
        }
        
        p.life -= 1;
        if (p.life <= 0) {
          p.active = false;
        }
      } else if (p.settled) {
        // Settled particles slowly fade out
        p.life -= 0.1;
      }
    });
    
    // Remove completely faded particles
    this.particles = this.particles.filter(p => p.life > 0);
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    // Draw active particles
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      
      if (p.active) {
        // Active particles have a glowing effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.life / 200;
      } else if (p.settled) {
        // Settled particles are more subtle
        ctx.shadowBlur = 0;
        ctx.globalAlpha = Math.min(0.7, p.life / 100);
      }
      
      // Draw particle
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Reset canvas settings
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
  
  isActive(): boolean {
    return this.particles.length > 0;
  }
}