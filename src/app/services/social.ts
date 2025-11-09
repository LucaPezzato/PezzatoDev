import { Injectable } from '@angular/core';
import { socialMedia } from '../config/social.config';

@Injectable({
  providedIn: 'root'
})
export class Social {
  getSocialMedia() {
    return socialMedia;
  }
}
