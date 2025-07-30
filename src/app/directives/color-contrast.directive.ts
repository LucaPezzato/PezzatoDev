import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { PezThemeService } from '../services/theme.service';

@Directive({ selector: '[colorContrast]' })
export class ColorContrastDirective {
  #el = inject(ElementRef);
  #renderer = inject(Renderer2);
  #themeService = inject(PezThemeService);

  contrastMode = input<'auto' | 'shade' | 'tint' | 'adaptive'>('auto');

  // Minimum contrast ratio to meet (WCAG AA requires 3:1 for large text)
  #minContrastRatio: number = 3.0;

  #observer: MutationObserver | null = null;
  #lastBackgroundColor: string = '';
  #bgPollIntervalId: any = null;

  constructor() {
    this.#updateTextColor();
    effect(() => {
      this.#themeService.isDarkMode();
      this.#updateTextColor();
    });
  }
  ngOnInit() {
    // Initial color update
    this.#updateTextColor();

    // Set up observer to detect background color changes
    this.#setupBackgroundObserver();

    // Set up polling as a fallback for inherited/bg changes
    this.#setupBackgroundPolling();
  }

  ngOnDestroy() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }
    if (this.#bgPollIntervalId) {
      clearInterval(this.#bgPollIntervalId);
      this.#bgPollIntervalId = null;
    }
  }

  #setupBackgroundObserver() {
    // Use MutationObserver to watch for style attribute changes
    this.#observer = new MutationObserver((mutations) => {
      let backgroundChanged = false;

      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'style' ||
            mutation.attributeName === 'class')
        ) {
          backgroundChanged = true;
          break;
        }
      }

      if (backgroundChanged) {
        const currentBgColor = this.#getBackgroundColor();
        console.log('ambiato sfondo', currentBgColor);
        if (currentBgColor !== this.#lastBackgroundColor) {
          this.#lastBackgroundColor = currentBgColor;

          // Run inside Angular zone when updating DOM
          this.#updateTextColor();
        }
      }
    });

    this.#observer.observe(this.#el.nativeElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Store initial background color
    this.#lastBackgroundColor = this.#getBackgroundColor();
  }

  // Polling fallback for background color changes (handles inherited/bg changes)
  #setupBackgroundPolling() {
    this.#bgPollIntervalId = setInterval(() => {
      const currentBgColor = this.#getBackgroundColor();
      if (currentBgColor !== this.#lastBackgroundColor) {
        this.#lastBackgroundColor = currentBgColor;
        this.#updateTextColor();
      }
    }, 1000);
  }

  #updateTextColor() {
    const bgColor = this.#getBackgroundColor();
    const rgb = this.#parseColor(bgColor);
    const hexColor = this.#rgbToHex(rgb);
    const luminance = this.#calculateLuminance(bgColor);

    let textColor: string;

    switch (this.contrastMode()) {
      case 'shade':
        textColor = '#' + this.#shadeColor(hexColor);
        break;
      case 'tint':
        textColor = '#' + this.#tintColor(hexColor);
        break;
      case 'adaptive':
        // If background is dark, lighten it; if light, darken it
        if (luminance <= 0.179) {
          textColor = '#' + this.#tintColor(hexColor);
        } else {
          textColor = '#' + this.#shadeColor(hexColor);
        }
        break;
      case 'auto':
      default:
        textColor = luminance > 0.179 ? '#000000' : '#ffffff';
        break;
    }

    this.#renderer.setStyle(this.#el.nativeElement, 'color', textColor);
  }

  #getBackgroundColor(): string {
    const computedStyle = getComputedStyle(this.#el.nativeElement);
    return (
      computedStyle.backgroundColor ??
      computedStyle.background ??
      'rgb(255, 255, 255)' // fallback to white
    );
  }

  #calculateLuminance(color: string): number {
    const rgb = this.#parseColor(color);
    const [r, g, b] = rgb.map((c) => {
      const normalized = c / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  #parseColor(colorStr: string): number[] {
    if (colorStr.startsWith('#')) {
      return this.#hexToRgb(colorStr);
    }

    // Check for OKLCH color format
    const oklchMatch = colorStr.match(/oklch\(\s*([^)]+)\s*\)/);
    if (oklchMatch) {
      return this.#oklchToRgb(oklchMatch[1]);
    }

    const rgbMatch = colorStr.match(/(\d+),\s*(\d+),\s*(\d+)/);
    return rgbMatch
      ? [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])]
      : [0, 0, 0];
  }

  #hexToRgb(hex: string): number[] {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  }

  // Convert RGB array to hex string (without #)
  #rgbToHex(rgb: number[]): string {
    return rgb
      .map((x) => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  }

  // Darken a color by the specified percentage with enhanced contrast
  #shadeColor(hexcolor: string): string {
    // Remove # if present
    hexcolor = hexcolor.replace('#', '');

    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);

    // Convert to HSL for better color manipulation
    const hsl = this.#rgbToHsl(r, g, b);
    const bgLuminance = this.#relativeLuminance([r, g, b]);

    // If the color is achromatic (gray/white/black), keep it gray
    let newHue = hsl[0];
    let newSaturation = hsl[1];
    if (hsl[1] < 0.1) {
      newHue = 0; // hue doesn't matter for gray
      newSaturation = 0; // keep it gray
    } else {
      // For already colorful backgrounds, enhance saturation
      newSaturation = Math.min(1, hsl[1] * 1.5);
    }

    // Start with a reasonable darkening
    let newLightness = Math.max(0.1, hsl[2] * 0.4); // More aggressive darkening

    // Convert to RGB to check contrast
    let rgb = this.#hslToRgb(newHue, newSaturation, newLightness);
    let rgbNormalized = rgb.map((v) =>
      Math.max(0, Math.min(255, Math.round(v))),
    );
    let textLuminance = this.#relativeLuminance(rgbNormalized);

    // Ensure we meet minimum contrast ratio
    let contrastRatio = this.#calculateContrastRatio(
      bgLuminance,
      textLuminance,
    );

    // If contrast isn't sufficient, adjust lightness until it is
    if (contrastRatio < this.#minContrastRatio) {
      // Binary search to find appropriate lightness
      let minL = 0;
      let maxL = Math.min(hsl[2], 0.5); // Don't go lighter than the background

      for (
        let attempts = 0;
        attempts < 8 && contrastRatio < this.#minContrastRatio;
        attempts++
      ) {
        // Try a lightness halfway between min and max
        newLightness = (minL + maxL) / 2;

        rgb = this.#hslToRgb(newHue, newSaturation, newLightness);
        rgbNormalized = rgb.map((v) =>
          Math.max(0, Math.min(255, Math.round(v))),
        );
        textLuminance = this.#relativeLuminance(rgbNormalized);
        contrastRatio = this.#calculateContrastRatio(
          bgLuminance,
          textLuminance,
        );

        if (contrastRatio >= this.#minContrastRatio) {
          // We've found a good lightness, but is there a better one?
          minL = newLightness;
        } else {
          // This lightness is too bright, try darker
          maxL = newLightness;
        }
      }

      // If we still can't achieve contrast, go to black as fallback
      if (contrastRatio < this.#minContrastRatio) {
        return '000000';
      }
    }

    // Convert final values to RGB
    rgb = this.#hslToRgb(newHue, newSaturation, newLightness);

    // Ensure RGB values are in valid range and convert to hex
    return rgb
      .map((v) => {
        const colorValue = Math.max(0, Math.min(255, Math.round(v)));
        return colorValue.toString(16).padStart(2, '0');
      })
      .join('');
  }

  // Lighten a color by the specified percentage with enhanced contrast
  #tintColor(hexcolor: string): string {
    // Remove # if present
    hexcolor = hexcolor.replace('#', '');

    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);

    // Convert to HSL for better color manipulation
    const hsl = this.#rgbToHsl(r, g, b);
    const bgLuminance = this.#relativeLuminance([r, g, b]);

    // If the color is achromatic (gray/white/black), keep it gray
    let newHue = hsl[0];
    let newSaturation = hsl[1];
    if (hsl[1] < 0.1) {
      newHue = 0; // hue doesn't matter for gray
      newSaturation = 0; // keep it gray
    } else {
      // For already colorful backgrounds, enhance saturation
      newSaturation = Math.min(1, hsl[1] * 1.5);
    }

    // Start with a reasonable lightening
    let newLightness = Math.min(0.9, 0.6 + hsl[2] * 0.4); // More aggressive lightening

    // Convert to RGB to check contrast
    let rgb = this.#hslToRgb(newHue, newSaturation, newLightness);
    let rgbNormalized = rgb.map((v) =>
      Math.max(0, Math.min(255, Math.round(v))),
    );
    let textLuminance = this.#relativeLuminance(rgbNormalized);

    // Ensure we meet minimum contrast ratio
    let contrastRatio = this.#calculateContrastRatio(
      bgLuminance,
      textLuminance,
    );

    // If contrast isn't sufficient, adjust lightness until it is
    if (contrastRatio < this.#minContrastRatio) {
      // Binary search to find appropriate lightness
      let minL = Math.max(hsl[2], 0.5); // Don't go darker than the background
      let maxL = 1;

      for (
        let attempts = 0;
        attempts < 8 && contrastRatio < this.#minContrastRatio;
        attempts++
      ) {
        // Try a lightness halfway between min and max
        newLightness = (minL + maxL) / 2;

        rgb = this.#hslToRgb(newHue, newSaturation, newLightness);
        rgbNormalized = rgb.map((v) =>
          Math.max(0, Math.min(255, Math.round(v))),
        );
        textLuminance = this.#relativeLuminance(rgbNormalized);
        contrastRatio = this.#calculateContrastRatio(
          bgLuminance,
          textLuminance,
        );

        if (contrastRatio >= this.#minContrastRatio) {
          // We've found a good lightness, but is there a better one?
          maxL = newLightness;
        } else {
          // This lightness is not bright enough, try brighter
          minL = newLightness;
        }
      }

      // If we still can't achieve contrast, go to white as fallback
      if (contrastRatio < this.#minContrastRatio) {
        return 'ffffff';
      }
    }

    // Convert final values to RGB
    rgb = this.#hslToRgb(newHue, newSaturation, newLightness);

    // Ensure RGB values are in valid range and convert to hex
    return rgb
      .map((v) => {
        const colorValue = Math.max(0, Math.min(255, Math.round(v)));
        return colorValue.toString(16).padStart(2, '0');
      })
      .join('');
  }

  // Calculate the relative luminance of a color (WCAG formula)
  #relativeLuminance(rgb: number[]): number {
    // Normalize RGB values to 0-1 range
    const [r, g, b] = rgb.map((v) => {
      const normalized = v / 255;
      // Apply sRGB gamma correction
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    // WCAG relative luminance formula
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Calculate contrast ratio between two luminance values
  #calculateContrastRatio(luminance1: number, luminance2: number): number {
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Convert RGB to HSL
  #rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }

  // Convert HSL to RGB
  #hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }

  // Convert RGB to OKLCH
  #rgbToOklch(r: number, g: number, b: number): [number, number, number] {
    // First convert RGB to linear RGB
    const toLinear = (c: number) => {
      c = c / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);

    // Convert linear RGB to OKLab using the matrix transformation
    const l =
      0.4122214708 * rLinear + 0.5363325363 * gLinear + 0.0514459929 * bLinear;
    const m =
      0.2119034982 * rLinear + 0.6806995451 * gLinear + 0.1073969566 * bLinear;
    const s =
      0.0883024619 * rLinear + 0.2817188376 * gLinear + 0.6299787005 * bLinear;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    const okL = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const okA = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const okB = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

    // Convert OKLab to OKLCH
    const C = Math.sqrt(okA * okA + okB * okB);
    const H = (Math.atan2(okB, okA) * 180) / Math.PI;
    const normalizedH = H < 0 ? H + 360 : H;

    return [okL, C, normalizedH];
  }

  // Convert OKLCH to RGB
  #oklchToRgb(oklchStr: string): number[] {
    // Parse OKLCH values from string like "0.7 0.15 180" or "70% 0.15 180deg"
    const parts = oklchStr.trim().split(/\s+/);
    if (parts.length !== 3) return [0, 0, 0];

    let L = parseFloat(parts[0].replace('%', ''));
    if (parts[0].includes('%')) L = L / 100;

    const C = parseFloat(parts[1]);
    let H = parseFloat(parts[2].replace('deg', ''));

    // Convert OKLCH to OKLab
    const hRad = (H * Math.PI) / 180;
    const okA = C * Math.cos(hRad);
    const okB = C * Math.sin(hRad);

    // Convert OKLab to linear RGB
    const l_ = L + 0.3963377774 * okA + 0.2158037573 * okB;
    const m_ = L - 0.1055613458 * okA - 0.0638541728 * okB;
    const s_ = L - 0.0894841775 * okA - 1.291485548 * okB;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    const rLinear = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const gLinear = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bLinear = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    // Convert linear RGB to sRGB
    const fromLinear = (c: number) => {
      c = Math.max(0, Math.min(1, c));
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    const r = Math.round(fromLinear(rLinear) * 255);
    const g = Math.round(fromLinear(gLinear) * 255);
    const b = Math.round(fromLinear(bLinear) * 255);

    return [
      Math.max(0, Math.min(255, r)),
      Math.max(0, Math.min(255, g)),
      Math.max(0, Math.min(255, b)),
    ];
  }

  // Convert RGB to OKLCH string format
  #rgbToOklchString(r: number, g: number, b: number): string {
    const [L, C, H] = this.#rgbToOklch(r, g, b);
    return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
  }

  // Public method to get the current background color in OKLCH format (useful for debugging)
  getBackgroundColorAsOklch(): string {
    const bgColor = this.#getBackgroundColor();
    const rgb = this.#parseColor(bgColor);
    return this.#rgbToOklchString(rgb[0], rgb[1], rgb[2]);
  }

  // Public method to convert any supported color format to OKLCH
  convertToOklch(colorStr: string): string {
    const rgb = this.#parseColor(colorStr);
    return this.#rgbToOklchString(rgb[0], rgb[1], rgb[2]);
  }
}
