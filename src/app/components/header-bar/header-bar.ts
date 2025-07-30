import { Component, inject } from '@angular/core';
import { PezThemeService } from '../../services/theme.service';
@Component({
  selector: 'pez-header-bar',
  imports: [],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.css',
})
export class PezHeaderBar {
  themeService = inject(PezThemeService);
}
