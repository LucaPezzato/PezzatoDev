import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PezWaybar } from './components/waybar/waybar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PezWaybar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PezzatoDev');
}
