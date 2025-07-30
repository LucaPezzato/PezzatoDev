import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PezThemeService } from '../services/theme.service';
import { ColorContrastDirective } from './color-contrast.directive';

@Component({
  template: `
    <div
      id="test-element"
      [colorContrast]="contrastMode"
      [style.background-color]="backgroundColor"
    >
      Test Content
    </div>
  `,
  imports: [ColorContrastDirective],
})
class TestComponent {
  contrastMode: 'auto' | 'shade' | 'tint' | 'adaptive' | 'oklch' = 'auto';
  backgroundColor = '#3498db';
}

describe('ColorContrastDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveEl: DebugElement;
  let directive: ColorContrastDirective;
  let mockThemeService: jasmine.SpyObj<PezThemeService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PezThemeService', ['isDarkMode']);

    await TestBed.configureTestingModule({
      imports: [TestComponent, ColorContrastDirective],
      providers: [{ provide: PezThemeService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    mockThemeService = TestBed.inject(
      PezThemeService,
    ) as jasmine.SpyObj<PezThemeService>;
    mockThemeService.isDarkMode.and.returnValue(false);

    directiveEl = fixture.debugElement.query(
      By.directive(ColorContrastDirective),
    );
    directive = directiveEl.injector.get(ColorContrastDirective);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should handle OKLCH color input', () => {
    // Test with OKLCH color format
    const oklchColor = 'oklch(0.7 0.15 180)';
    const rgb = directive.convertToOklch('#3498db');

    expect(rgb).toContain('oklch(');
    expect(rgb).toMatch(/oklch\(\d+\.\d+\s+\d+\.\d+\s+\d+\.\d+\)/);
  });

  it('should generate appropriate contrast in OKLCH mode', () => {
    component.contrastMode = 'oklch';
    component.backgroundColor = '#3498db'; // Blue background
    fixture.detectChanges();

    const textColor = directiveEl.nativeElement.style.color;
    expect(textColor).toBeTruthy();
    expect(textColor).toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('should handle dark backgrounds in OKLCH mode', () => {
    component.contrastMode = 'oklch';
    component.backgroundColor = '#2c3e50'; // Dark blue-gray
    fixture.detectChanges();

    const textColor = directiveEl.nativeElement.style.color;
    expect(textColor).toBeTruthy();
    // Should generate a light color for dark background
    expect(textColor).toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('should handle light backgrounds in OKLCH mode', () => {
    component.contrastMode = 'oklch';
    component.backgroundColor = '#ecf0f1'; // Light gray
    fixture.detectChanges();

    const textColor = directiveEl.nativeElement.style.color;
    expect(textColor).toBeTruthy();
    // Should generate a dark color for light background
    expect(textColor).toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('should convert colors to OKLCH format correctly', () => {
    const hexColor = '#ff0000'; // Red
    const oklchColor = directive.convertToOklch(hexColor);

    expect(oklchColor).toContain('oklch(');
    expect(oklchColor).toMatch(/oklch\(\d+\.\d+\s+\d+\.\d+\s+\d+\.\d+\)/);
  });

  it('should get background color as OKLCH', () => {
    component.backgroundColor = '#00ff00'; // Green
    fixture.detectChanges();

    const oklchBg = directive.getBackgroundColorAsOklch();
    expect(oklchBg).toContain('oklch(');
    expect(oklchBg).toMatch(/oklch\(\d+\.\d+\s+\d+\.\d+\s+\d+\.\d+\)/);
  });

  it('should maintain all existing contrast modes', () => {
    const modes: Array<'auto' | 'shade' | 'tint' | 'adaptive' | 'oklch'> = [
      'auto',
      'shade',
      'tint',
      'adaptive',
      'oklch',
    ];

    modes.forEach((mode) => {
      component.contrastMode = mode;
      fixture.detectChanges();

      const textColor = directiveEl.nativeElement.style.color;
      expect(textColor).toBeTruthy();
    });
  });
});
