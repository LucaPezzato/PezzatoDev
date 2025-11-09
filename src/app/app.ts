import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PezContact } from './components/contact/contact';
import { PezHeaderBar } from './components/header-bar/header-bar';
import { Hero } from './components/hero/hero';
import { PezKnowledge } from './components/knowledge/knowledge';
import { PezSplitKeyboards } from './components/split-keyboards/split-keyboards';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PezHeaderBar,
    Hero,
    PezKnowledge,
    PezContact,
    PezSplitKeyboards,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PezzatoDev');
}
