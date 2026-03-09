import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import * as d3 from 'd3-shape';
import $ from 'jquery';
import { PezKnowledge } from "../../components/knowledge/knowledge";
import { Social } from '../../services/social';
import { PezCv } from "../cv/cv";

@Component({
  selector: 'pez-business-card',
  imports: [PezKnowledge, PezCv],
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
  isAnimating = signal<boolean>(false);


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
        this.updateCardHeight();
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
  frontRef = viewChild<ElementRef<HTMLDivElement>>('frontFace');
  backRef = viewChild<ElementRef<HTMLDivElement>>('backFace');

  cardHeight = signal<number | undefined>(undefined);

  ngAfterViewInit() {
    setTimeout(() => this.updateCardHeight(), 1000);
  }

  updateCardHeight() {
    const front = this.frontRef()?.nativeElement;
    const back = this.backRef()?.nativeElement;

    if (this.flipped() && back) {
      this.cardHeight.set(back.scrollHeight);
    } else if (!this.flipped() && front) {
      this.cardHeight.set(front.scrollHeight);
    }
  }

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
    // - Y-axis rotation is driven by X-axis mouse movement. We invert it if on the backface to feel natural.
    // - X-axis rotation is driven by Y-axis mouse movement (inverted).
    const directionY = this.flipped() ? -1 : 1;
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation * directionY;
    const rotateX = -(mouseY / (rect.height / 2)) * maxRotation;

    // 6. Clamp the values to ensure we don't exceed maxRotation 
    // if the mouse moves very fast outside the card.
    const clampedRotateX = Math.max(-maxRotation, Math.min(maxRotation, rotateX));
    const clampedRotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));

    // 7. Update the signal
    const baseRotateY = this.flipped() ? 180 : 0;
    this.transformStyle.set(`rotateX(${clampedRotateX}deg) rotateY(${baseRotateY + clampedRotateY}deg)`);
  }

  onMouseLeave() {
    // Smoothly snap the card back to center when the mouse leaves the container
    const baseRotateY = this.flipped() ? 180 : 0;
    this.transformStyle.set(`rotateX(0deg) rotateY(${baseRotateY}deg)`);
  }

  flipCard() {
    this.isAnimating.set(true);
    this.flipped.update((flipped) => !flipped);
    this.updateCardHeight();

    const baseRotateY = this.flipped() ? 180 : 0;
    this.transformStyle.set(`rotateX(0deg) rotateY(${baseRotateY}deg)`);

    // reset animation state after 1s (matching transition duration)
    let timeout = setTimeout(() => {
      this.isAnimating.set(false);
    }, 1000);
    this.#destroyRef.onDestroy(() => clearTimeout(timeout));
  }
}
