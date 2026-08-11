import { Component, input } from '@angular/core';

export interface BackgroundItem {
  id: number;
  type: 'ghost' | 'bat';
  variant: 1 | 2 | 3;
  left: string;
  top: string;
  size: number;
  opacity: number;
  color: string;
  animClass: string;
  animDelay: string;
  parallaxFactor: number;
}

@Component({
  selector: 'pez-ghost-background',
  standalone: true,
  templateUrl: './ghost-background.html',
  styleUrl: './ghost-background.css'
})
export class PezGhostBackground {
  parallaxX = input<number>(0);
  parallaxY = input<number>(0);
  cursorX = input<number>(-1000);
  cursorY = input<number>(-1000);

  items: BackgroundItem[] = [
    // GHOSTS (Slow floating in ambient background with mouse avoidance)
    {
      id: 1,
      type: 'ghost',
      variant: 1,
      left: '6%',
      top: '12%',
      size: 90,
      opacity: 0.28,
      color: 'var(--color-dracula-purple, #bd93f9)',
      animClass: 'float-slow-1',
      animDelay: '0s',
      parallaxFactor: -0.6
    },
    {
      id: 2,
      type: 'ghost',
      variant: 2,
      left: '84%',
      top: '18%',
      size: 110,
      opacity: 0.25,
      color: 'var(--color-dracula-cyan, #8be9fd)',
      animClass: 'float-slow-2',
      animDelay: '-3s',
      parallaxFactor: -1.0
    },
    {
      id: 3,
      type: 'ghost',
      variant: 3,
      left: '12%',
      top: '72%',
      size: 100,
      opacity: 0.3,
      color: 'var(--color-dracula-pink, #ff79c6)',
      animClass: 'float-slow-3',
      animDelay: '-1.5s',
      parallaxFactor: -0.8
    },
    {
      id: 4,
      type: 'ghost',
      variant: 1,
      left: '80%',
      top: '70%',
      size: 120,
      opacity: 0.22,
      color: 'var(--color-dracula-green, #50fa7b)',
      animClass: 'float-slow-1',
      animDelay: '-5s',
      parallaxFactor: -1.3
    },
    {
      id: 5,
      type: 'ghost',
      variant: 2,
      left: '46%',
      top: '6%',
      size: 70,
      opacity: 0.18,
      color: 'var(--color-dracula-yellow, #f1fa8c)',
      animClass: 'float-slow-2',
      animDelay: '-2s',
      parallaxFactor: -0.5
    },
    {
      id: 6,
      type: 'ghost',
      variant: 3,
      left: '52%',
      top: '84%',
      size: 85,
      opacity: 0.2,
      color: 'var(--color-dracula-purple, #bd93f9)',
      animClass: 'float-slow-3',
      animDelay: '-4s',
      parallaxFactor: -0.7
    },
    {
      id: 13,
      type: 'ghost',
      variant: 1,
      left: '26%',
      top: '38%',
      size: 95,
      opacity: 0.26,
      color: 'var(--color-dracula-pink, #ff79c6)',
      animClass: 'float-slow-2',
      animDelay: '-7.5s',
      parallaxFactor: -0.9
    },
    {
      id: 14,
      type: 'ghost',
      variant: 2,
      left: '70%',
      top: '44%',
      size: 105,
      opacity: 0.24,
      color: 'var(--color-dracula-cyan, #8be9fd)',
      animClass: 'float-slow-3',
      animDelay: '-5.5s',
      parallaxFactor: -1.1
    },
    {
      id: 15,
      type: 'ghost',
      variant: 3,
      left: '36%',
      top: '64%',
      size: 80,
      opacity: 0.22,
      color: 'var(--color-dracula-purple, #bd93f9)',
      animClass: 'float-slow-1',
      animDelay: '-3.5s',
      parallaxFactor: -0.65
    },

    // BATS (Fast full-screen flights)
    {
      id: 7,
      type: 'bat',
      variant: 1,
      left: '0%',
      top: '0%',
      size: 75,
      opacity: 0.45,
      color: 'var(--color-dracula-purple, #bd93f9)',
      animClass: 'bat-fly-fast-1',
      animDelay: '0s',
      parallaxFactor: -1.4
    },
    {
      id: 8,
      type: 'bat',
      variant: 2,
      left: '0%',
      top: '0%',
      size: 85,
      opacity: 0.4,
      color: 'var(--color-dracula-pink, #ff79c6)',
      animClass: 'bat-fly-fast-2',
      animDelay: '-2.5s',
      parallaxFactor: -1.6
    },
    {
      id: 9,
      type: 'bat',
      variant: 1,
      left: '0%',
      top: '0%',
      size: 65,
      opacity: 0.42,
      color: 'var(--color-dracula-cyan, #8be9fd)',
      animClass: 'bat-fly-fast-3',
      animDelay: '-4.2s',
      parallaxFactor: -1.2
    },
    {
      id: 10,
      type: 'bat',
      variant: 2,
      left: '0%',
      top: '0%',
      size: 70,
      opacity: 0.45,
      color: 'var(--color-dracula-orange, #ffb86c)',
      animClass: 'bat-fly-fast-4',
      animDelay: '-1.8s',
      parallaxFactor: -1.5
    },
    {
      id: 11,
      type: 'bat',
      variant: 1,
      left: '0%',
      top: '0%',
      size: 60,
      opacity: 0.38,
      color: 'var(--color-dracula-red, #ff5555)',
      animClass: 'bat-fly-fast-1',
      animDelay: '-3.5s',
      parallaxFactor: -1.0
    },
    {
      id: 12,
      type: 'bat',
      variant: 2,
      left: '0%',
      top: '0%',
      size: 80,
      opacity: 0.4,
      color: 'var(--color-dracula-purple, #bd93f9)',
      animClass: 'bat-fly-fast-3',
      animDelay: '-1.0s',
      parallaxFactor: -1.3
    }
  ];

  getItemTransform(item: BackgroundItem): string {
    let px = this.parallaxX() * item.parallaxFactor;
    let py = this.parallaxY() * item.parallaxFactor;

    // Mouse repulsion logic for ghosts
    const cx = this.cursorX();
    const cy = this.cursorY();

    if (cx > 0 && cy > 0 && item.type === 'ghost') {
      const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
      const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

      const itemLeftPx = (parseFloat(item.left) / 100) * winW + px;
      const itemTopPx = (parseFloat(item.top) / 100) * winH + py;

      const dx = itemLeftPx - cx;
      const dy = itemTopPx - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const repelRadius = 220; // Repulsion trigger radius in pixels
      if (dist < repelRadius && dist > 0.1) {
        const force = Math.pow((repelRadius - dist) / repelRadius, 1.2);
        const pushStrength = 140; // Max push distance in pixels
        px += (dx / dist) * force * pushStrength;
        py += (dy / dist) * force * pushStrength;
      }
    }

    return `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0px)`;
  }
}
