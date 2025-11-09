import { Component, inject } from '@angular/core';
import { Social } from '../../services/social';

@Component({
  selector: 'pez-contact',
  imports: [],
  templateUrl: './contact.html',
})
export class PezContact {
  private socialService = inject(Social);
  socials = this.socialService.getSocialMedia();
}
