import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import * as d3 from 'd3-shape';
import $ from 'jquery';
import { PezKnowledge } from "../../components/knowledge/knowledge";
import { Social } from '../../services/social';

@Component({
  selector: 'pez-business-card',
  imports: [PezKnowledge],
  templateUrl: './business-card.html',
  styleUrl: './business-card.css'
})
export class PezBusinessCard {

  #documentObserver = ResizeObserver;
  #resizeTimeout: any;
  #socialService = inject(Social);
  #destroyRef = inject(DestroyRef);
  socials = this.#socialService.getSocialMedia();
  isMobile = signal<boolean>(false);
  imgWidth = signal<number>(0);
  imgHeight = signal<number>(0);
  imgNormalBlobPath = this.generateBlobPath(10);
  flipped = signal<boolean>(false);
  hidden = signal<boolean>(false);


  ngOnInit() {
    new this.#documentObserver((entries) => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = window.setTimeout(() => {
        this.isMobile.set($('body').width()! < 768);
        if (this.isMobile()) {
          this.imgWidth.set($('body').width()! / 1.5);
          this.imgHeight.set($('body').width()! / 1.5);
        } else {
          this.imgWidth.set(200);
          this.imgHeight.set(200);
        }
        this.imgNormalBlobPath = this.generateBlobPath(
          10,
          this.imgWidth(),
          this.imgHeight(),
        );
      }, 200);
    }).observe(document.body);
  }


  generateBlobPath(
    numberOfPoints = 10,
    width = 500,
    height = 500,
    padding = 10,
  ): string {
    const center = width * 0.5;
    const fullTurn = 2 * Math.PI;
    const division = fullTurn / numberOfPoints;
    const maxRadius = width * 0.5 - padding;
    const minRadius = width * 0.4;
    const angleModifier = () => Math.min(0.3, Math.random());
    const randomRadius = () =>
      Math.min(maxRadius, Math.max(minRadius, Math.random() * maxRadius));
    const points: [number, number][] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      const angle = i * division;
      const radius = randomRadius();
      const modifier = angleModifier();
      const x = center + radius * Math.cos(angle + modifier);
      const y = center + radius * Math.sin(angle + modifier);
      points.push([x, y]);
    }
    const line = d3
      .line<[number, number]>()
      .curve(d3.curveCatmullRomClosed.alpha(0.5))
      .x((d: [number, number]) => d[0])
      .y((d: [number, number]) => d[1]);
    return line(points) || '';
  }

  cardRef = viewChild<ElementRef<HTMLDivElement>>('card');

  transformStyle = signal('rotateX(0deg) rotateY(0deg)');

  onMouseMove(event: MouseEvent) {
    const cardEl = this.cardRef()?.nativeElement;
    if (!cardEl) return;

    // 1. Get the card's dimensions and position on the screen
    const rect = cardEl.getBoundingClientRect();

    // 2. Find the exact center point of the card
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // 3. Calculate mouse position relative to the center of the card
    const mouseX = event.clientX - cardCenterX;
    const mouseY = event.clientY - cardCenterY;

    // 4. Define the maximum rotation angle (in degrees)
    const maxRotation = 4;

    // 5. Calculate the rotation. 
    // - Y-axis rotation is driven by X-axis mouse movement.
    // - X-axis rotation is driven by Y-axis mouse movement (inverted).
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    const rotateX = -(mouseY / (rect.height / 2)) * maxRotation;

    // 6. Clamp the values to ensure we don't exceed maxRotation 
    // if the mouse moves very fast outside the card.
    const clampedRotateX = Math.max(-maxRotation, Math.min(maxRotation, rotateX));
    const clampedRotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));

    // 7. Update the signal
    this.transformStyle.set(`rotateX(${clampedRotateX}deg) rotateY(${clampedRotateY}deg)`);
  }

  onMouseLeave() {
    // Smoothly snap the card back to center when the mouse leaves the container
    this.transformStyle.set('rotateX(0deg) rotateY(0deg)');
  }

  flipCard() {
    this.flipped.update((flipped) => !flipped);
    let timeout = setTimeout(() => {
      this.hidden.set(true);
    }, 1000);
    this.#destroyRef.onDestroy(() => {
      clearTimeout(timeout);
    });
  }

}
