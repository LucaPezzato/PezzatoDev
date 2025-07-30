import { Component, signal } from '@angular/core';
import * as d3 from 'd3-shape';
import $ from 'jquery';

@Component({
  selector: 'pez-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  #documentObserver = ResizeObserver;
  #resizeTimeout: any;
  isMobile = signal<boolean>(false);

  ngOnInit() {
    new this.#documentObserver((entries) => {
      clearTimeout(this.#resizeTimeout);
      this.#resizeTimeout = window.setTimeout(() => {
        this.isMobile.set($('#hero-section').width()! < 768);
        for (const entry of entries) {
          let imgAreaWidth = $('#hero-section').width()! / 3;
          if (imgAreaWidth <= 768 / 3) {
            imgAreaWidth = $('#hero-section').width()!;
          }
          let imgAreaHeight = imgAreaWidth * 2;

          console.log(imgAreaWidth, imgAreaHeight);
          this.imgWidth.set(imgAreaWidth!);
          this.imgHeight.set(imgAreaHeight!);
          this.imgNormalBlobPath = this.generateBlobPath(
            10,
            imgAreaWidth,
            imgAreaHeight,
          );
        }
      }, 200);
    }).observe(document.body);
  }
  imgWidth = signal<number>(0);
  imgHeight = signal<number>(0);
  imgNormalBlobPath = this.generateBlobPath(10);
  textNormalBlobPath = this.generateBlobPath(4);

  hoverImg = signal<boolean>(false);
  hoverText = signal<boolean>(false);

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
  ngOnDestroy() {
    clearTimeout(this.#resizeTimeout);
  }
}
