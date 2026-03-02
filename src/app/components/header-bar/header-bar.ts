import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PezThemeService } from '../../services/theme.service';
@Component({
  selector: 'pez-header-bar',
  imports: [RouterLink],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.css',
})
export class PezHeaderBar {
  themeService = inject(PezThemeService);
}
