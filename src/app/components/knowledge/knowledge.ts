import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ColorContrastDirective } from '../../directives/color-contrast.directive';
import { shuffleArray } from '../../functions/array.functions';
import { PezThemeService } from '../../services/theme.service';

@Component({
  selector: 'pez-knowledge',
  imports: [ColorContrastDirective, NgTemplateOutlet],
  templateUrl: './knowledge.html',
  styleUrl: './knowledge.css',
})
export class PezKnowledge implements AfterViewInit, OnDestroy {
  themeService = inject(PezThemeService);
  #renderer = inject(Renderer2);

  @ViewChild('band', { static: true }) band!: ElementRef<HTMLDivElement>;

  #intervalId: any;
  #currentTranslate = 0;
  #speed = 1; // pixels per frame
  #widthOfSet = 0;
  #isPaused = false;

  knowledge: {
    title: string;
    lightColor: string;
    darkColor: string;
    link: string;
  }[] = [
    {
      title: 'Angular',
      lightColor: 'bg-red-600',
      darkColor: 'bg-red-400',
      link: 'https://angular.io',
    },
    {
      title: 'TypeScript',
      lightColor: 'bg-blue-600',
      darkColor: 'bg-blue-400',
      link: 'https://www.typescriptlang.org/',
    },
    {
      title: 'Tailwind CSS',
      lightColor: 'bg-cyan-500',
      darkColor: 'bg-cyan-400',
      link: 'https://tailwindcss.com/',
    },
    {
      title: 'Node.js',
      lightColor: 'bg-green-600',
      darkColor: 'bg-green-400',
      link: 'https://nodejs.org/',
    },

    {
      title: 'MS SQL Server',
      lightColor: 'bg-red-700',
      darkColor: 'bg-red-500',
      link: 'https://www.microsoft.com/en-us/sql-server',
    },
    {
      title: 'MCP',
      lightColor: 'bg-orange-500',
      darkColor: 'bg-orange-400',
      link: 'https://modelcontextprotocol.io/overview',
    },
    {
      title: 'Git',
      lightColor: 'bg-orange-600',
      darkColor: 'bg-orange-400',
      link: 'https://git-scm.com/',
    },
    {
      title: 'Docker',
      lightColor: 'bg-blue-500',
      darkColor: 'bg-blue-400',
      link: 'https://www.docker.com/',
    },
    {
      title: 'Linux',
      lightColor: 'bg-blue-600',
      darkColor: 'bg-blue-400',
      link: 'https://www.linux.org/',
    },
    {
      title: 'Windows',
      lightColor: 'bg-blue-500',
      darkColor: 'bg-blue-400',
      link: 'https://www.microsoft.com/en-us/windows',
    },
    {
      title: 'C#',
      lightColor: 'bg-green-600',
      darkColor: 'bg-green-400',
      link: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
    },
    {
      title: '.NET',
      lightColor: 'bg-purple-600',
      darkColor: 'bg-purple-400',
      link: 'https://dotnet.microsoft.com/',
    },
    {
      title: 'SCSS',
      lightColor: 'bg-pink-600',
      darkColor: 'bg-pink-400',
      link: 'https://sass-lang.com/',
    },
    {
      title: 'VSCODE',
      lightColor: 'bg-blue-600',
      darkColor: 'bg-blue-400',
      link: 'https://code.visualstudio.com/',
    },
    {
      title: 'Visual Studio',
      lightColor: 'bg-purple-700',
      darkColor: 'bg-purple-500',
      link: 'https://visualstudio.microsoft.com/',
    },
    {
      title: 'Perplexity',
      lightColor: 'bg-blue-500',
      darkColor: 'bg-blue-400',
      link: 'https://www.perplexity.ai/',
    },
    {
      title: 'Hyprland',
      lightColor: 'bg-purple-600',
      darkColor: 'bg-purple-400',
      link: 'https://hyprland.org/',
    },
    {
      title: 'Open API',
      lightColor: 'bg-yellow-500',
      darkColor: 'bg-yellow-400',
      link: 'https://www.openapis.org/',
    },
    {
      title: 'HTML',
      lightColor: 'bg-orange-500',
      darkColor: 'bg-orange-400',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      title: 'Javascript',
      lightColor: 'bg-yellow-600',
      darkColor: 'bg-yellow-400',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      title: 'Python',
      lightColor: 'bg-blue-500',
      darkColor: 'bg-blue-400',
      link: 'https://www.python.org/',
    },
    {
      title: 'Obsidian',
      lightColor: 'bg-purple-600',
      darkColor: 'bg-purple-400',
      link: 'https://obsidian.md/',
    },
    {
      title: 'Github',
      lightColor: 'bg-gray-600',
      darkColor: 'bg-gray-400',
      link: 'https://github.com/',
    },
  ];

  constructor() {
    this.knowledge = shuffleArray(this.knowledge);
    this.knowledge = [
      ...this.knowledge,
      ...this.knowledge,
      ...this.knowledge,
      ...this.knowledge,
    ];
  }

  ngAfterViewInit() {
    this.#widthOfSet = this.band.nativeElement.scrollWidth / 4;
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
    }
  }

  private startAnimation() {
    this.#intervalId = setInterval(() => {
      if (!this.#isPaused) {
        this.#currentTranslate += this.#speed;
        if (this.#currentTranslate >= this.#widthOfSet) {
          this.#currentTranslate -= this.#widthOfSet;
        }
        this.#renderer.setStyle(
          this.band.nativeElement,
          'transform',
          `translateX(-${this.#currentTranslate}px)`,
        );
      }
    }, 16); // ~60fps
  }

  pauseAnimation() {
    this.#isPaused = true;
  }

  resumeAnimation() {
    this.#isPaused = false;
  }
}
