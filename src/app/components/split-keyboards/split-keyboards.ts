import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pez-split-keyboards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './split-keyboards.html',
  styleUrl: './split-keyboards.css',
})
export class PezSplitKeyboards implements OnInit {
  private audioPool: HTMLAudioElement[] = [];
  private poolSize = 10;
  private currentIndex = 0;

  ngOnInit() {
    for (let i = 0; i < this.poolSize; i++) {
      const audio = new Audio('assets/key-press.mp3');
      audio.volume = 0.3;
      this.audioPool.push(audio);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    this.onKeyPress(key);
  }

  onKeyPress(key: string) {
    const keyElement = document.querySelector(`[data-key="${key}"]`);
    
    if (keyElement) {
      keyElement.classList.add('pressed');
      
      setTimeout(() => {
        keyElement.classList.remove('pressed');
      }, 150);
    }
    
    this.playKeySound();
  }

  private playKeySound() {
    const audio = this.audioPool[this.currentIndex];
    audio.currentTime = 0;
    audio.play().catch(() => {});
    
    this.currentIndex = (this.currentIndex + 1) % this.poolSize;
  }
}
