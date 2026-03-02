import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pez-split-keyboards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './split-keyboards.html',
  styleUrl: './split-keyboards.css',
})
export class PezSplitKeyboards implements OnInit, AfterViewInit {

  private audioPool: HTMLAudioElement[] = [];
  private poolSize = 10;
  private currentIndex = 0;

  textValue = signal('');
  private fullText: string =
    "I enjoy exploring ergonomics through custom mechanical keyboards, specifically the Corne split layout. By switching to Colemak and building my own hardware and firmware, I've tailored my setup for maximum comfort and typing efficiency.";

  textArea = viewChild<ElementRef<HTMLTextAreaElement>>('textArea');

  ngOnInit() {
    this.initAudioPool();
    this.startTypewriter();
  }

  ngAfterViewInit() {
    // Focus logic if needed
  }

  private initAudioPool() {
    for (let i = 0; i < this.poolSize; i++) {
      const audio = new Audio('assets/key-press.mp3');
      audio.volume = 0.3;
      this.audioPool.push(audio);
    }
  }

  private startTypewriter() {
    this.textValue.set('');
    let index = 0;

    // Initial delay before typing starts
    setTimeout(() => {
      const typeChar = () => {
        if (index < this.fullText.length) {
          this.textValue.update((value) => value + this.fullText.charAt(index));
          index++;

          const delay = 10 + Math.random() * 50;


          const char = this.fullText.charAt(index - 1).toLowerCase();
          this.highlightKey(char);

          setTimeout(typeChar, delay);
        }
      };
      typeChar();
    }, 50);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    this.highlightKey(key);
    this.playKeySound();

    if (document.activeElement !== this.textArea()?.nativeElement) {
      this.textArea()?.nativeElement.focus();
    }
  }

  onVirtualKeyPress(key: string) {
    this.highlightKey(key);
    this.playKeySound();

    if (key === 'space' || key === ' ') {
      this.textValue.update((value) => value + ' ');
    } else if (key === 'backspace') {
      if (this.textValue().length > 0) {
        this.textValue.update((value) => value.slice(0, -1));
      }
    } else if (key === 'enter') {
      this.textValue.update((value) => value + '\n');
    } else if (key === 'tab') {
      this.textValue.update((value) => value + '\t');
    } else if (key.length === 1) {
      this.textValue.update((value) => value + key);
    }

    this.textArea()?.nativeElement.focus();
  }

  highlightKey(key: string) {
    let selectorKey = key;
    if (key === ' ') selectorKey = ' ';

    // Handle shift keys or uppercase? the map has lowercase data-key
    // except for special keys maybe?

    const keyElement = document.querySelector(`[data-key="${selectorKey}"]`);

    if (keyElement) {
      keyElement.classList.add('pressed');
      setTimeout(() => {
        keyElement.classList.remove('pressed');
      }, 150);
    }
  }

  private playKeySound() {
    const audio = this.audioPool[this.currentIndex];
    audio.currentTime = 0;
    audio.play().catch(() => { });
    this.currentIndex = (this.currentIndex + 1) % this.poolSize;
  }
}
