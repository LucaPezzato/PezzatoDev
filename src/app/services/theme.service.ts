import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PezThemeService {
  isDarkMode = signal(false);

  toggleTheme() {
    this.isDarkMode.update((prev) => !prev);
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }
}
