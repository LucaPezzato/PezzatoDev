import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PezHeaderBar } from './components/header-bar/header-bar';
import { Hero } from './components/hero/hero';
import { PezKnowledge } from './components/knowledge/knowledge';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PezHeaderBar, Hero, PezKnowledge, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PezzatoDev');
}
