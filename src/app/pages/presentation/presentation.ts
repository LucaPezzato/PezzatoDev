import { Component } from '@angular/core';
import { PezContact } from "../../components/contact/contact";
import { Hero } from "../../components/hero/hero";
import { PezKnowledge } from "../../components/knowledge/knowledge";
import { PezSplitKeyboards } from "../../components/split-keyboards/split-keyboards";

@Component({
  selector: 'pez-presentation',
  imports: [Hero, PezKnowledge, PezSplitKeyboards, PezContact],
  templateUrl: './presentation.html',
  styleUrl: './presentation.css'
})
export class PezPresentation {

}
