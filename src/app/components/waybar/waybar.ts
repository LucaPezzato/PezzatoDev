import { Component, DestroyRef, HostListener, inject, OnInit, signal, computed } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

interface TrackItem {
  title: string;
  artist: string;
}

@Component({
  selector: 'pez-waybar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './waybar.html',
  styleUrl: './waybar.css'
})
export class PezWaybar implements OnInit {
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  currentPath = signal<string>('/');

  // Clock state
  now = signal<Date>(new Date());
  clockAlt = signal<boolean>(false);

  // YT Music TUI Pill state
  tracks: TrackItem[] = [
    { artist: 'Kid Yugi', title: 'Il Filmografo' },
    { artist: 'Daft Punk', title: 'Veridis Quo' },
    { artist: 'Kavinsky', title: 'Nightcall' },
    { artist: 'Marracash', title: 'Crudelia' }
  ];
  trackIndex = signal<number>(0);
  ytPlaying = signal<boolean>(true);

  currentTrack = computed(() => this.tracks[this.trackIndex()]);

  ytTooltip = computed(() => {
    const t = this.currentTrack();
    const status = this.ytPlaying() ? 'Playing' : 'Paused';
    return `Title:  ${t.title}\nArtist: ${t.artist}\nStatus: ${status}\n────────────────────────────\nClick SX: Apri repo yt-music-tui\nClick DX: Play / Pause\nScroll: Cambia traccia`;
  });

  // Twitch TUI Pill state
  twitchWatching = signal<boolean>(false);
  twitchTooltip = computed(() => {
    const mode = this.twitchWatching() ? '🟢 Watching via Streamlink + MPV' : '🟣 Followed Live (4)';
    return `${mode}:\n• Caedrel — League of Legends [👁 18.4K]\n• Parliamodivg — Escape from Tarkov [👁 412]\n• HasanAbi — Just Chatting [👁 31.2K]\n• DiarioDelRusso — Coding & Linux [👁 285]\n────────────────────────────\nClick SX: Apri repo twitch-tui\nClick DX: Toggle Streamlink MPV`;
  });

  // Post-it TUI Pill state
  postitDesktopActive = signal<boolean>(false);
  postitTooltip = computed(() => {
    const desk = this.postitDesktopActive() ? '1 sul Desktop' : '0 sul Desktop';
    return `📌 Post-it TUI — 2 note attive (${desk})\n✓ Checklist totali: 3/4 completati\n────────────────────────────\n• PezzatoDev Waybar UI [2/2✓]\n• Hyprland Lua Config [1/2✓]\n────────────────────────────\nClick SX: Apri repo postit-tui\nClick DX: Toggle Post-it Desktop`;
  });

  // Hardware stats
  cpuUsage = signal<number>(12);
  ramPercent = signal<number>(28);
  ramUsedGb = signal<string>('8.9');

  // System tray controls
  volume = signal<number>(75);
  muted = signal<boolean>(false);
  brightness = signal<number>(85);
  batteryPct = signal<number>(86);
  batteryCharging = signal<boolean>(true);

  // Syspower modal state
  syspowerOpen = signal<boolean>(false);
  syspowerStatus = signal<string>('Select Power Action');

  batteryTooltip = computed(() => {
    return [
      `Totale combinato: ${this.batteryPct()}% (82.7 / 96.2 Wh)`,
      `Ricarica: +18.5 W  •  Completa in: 0h 44m`,
      `────────────────────────────────────`,
      `Interna (BAT0): 92% (22.0/23.9 Wh) [Full]`,
      `Esterna (BAT1): 84% (60.7/72.4 Wh) [Charging]`
    ].join('\n');
  });

  clockFormatted = computed(() => {
    const d = this.now();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    if (!this.clockAlt()) {
      return `${hh}:${mm}`;
    }
    const dayStr = d.toLocaleDateString('it-IT', { weekday: 'short', day: '2-digit', month: 'short' });
    return `${dayStr}  •  ${hh}:${mm}`;
  });

  calendarHeader = computed(() => {
    const d = this.now();
    const monthName = d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  });

  calendarGrid = computed(() => {
    const d = this.now();
    const year = d.getFullYear();
    const month = d.getMonth();
    const today = d.getDate();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    // Monday-first index (0 = Mon, 6 = Sun)
    const startOffset = (firstDay.getDay() + 6) % 7;

    const lines: string[] = ['Lu Ma Me Gi Ve Sa Do'];
    let currentLine: string[] = [];

    for (let i = 0; i < startOffset; i++) {
      currentLine.push('  ');
    }

    for (let day = 1; day <= lastDay; day++) {
      const s = String(day).padStart(2, ' ');
      currentLine.push(day === today ? `[${day}]` : s);
      if (currentLine.length === 7) {
        lines.push(currentLine.join(' '));
        currentLine = [];
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }
    return lines.join('\n');
  });

  ngOnInit() {
    this.updateActiveRoute(this.#router.url);

    const sub = this.#router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateActiveRoute(e.urlAfterRedirects));

    const timer = window.setInterval(() => {
      this.now.set(new Date());
      // Gentle realistic CPU jitter between 7% and 24%
      const delta = Math.floor(Math.random() * 5) - 2;
      this.cpuUsage.update((v) => Math.max(6, Math.min(26, v + delta)));
    }, 3000);

    this.#destroyRef.onDestroy(() => {
      sub.unsubscribe();
      clearInterval(timer);
    });
  }

  private updateActiveRoute(url: string) {
    const clean = url.split('?')[0].split('#')[0];
    this.currentPath.set(clean || '/');
  }

  isHomeActive(): boolean {
    const p = this.currentPath();
    return p === '/' || p === '' || p.startsWith('/business-card');
  }

  isConfigActive(): boolean {
    return this.currentPath().startsWith('/config');
  }

  isCinemaActive(): boolean {
    return this.currentPath().startsWith('/cinema');
  }

  toggleClockFormat() {
    this.clockAlt.update((v) => !v);
  }

  // YT Music actions
  onYtRightClick(event: MouseEvent) {
    event.preventDefault();
    this.ytPlaying.update((v) => !v);
  }

  onYtWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.trackIndex.update((i) => (i + 1) % this.tracks.length);
    } else {
      this.trackIndex.update((i) => (i - 1 + this.tracks.length) % this.tracks.length);
    }
  }

  // Twitch actions
  onTwitchRightClick(event: MouseEvent) {
    event.preventDefault();
    this.twitchWatching.update((v) => !v);
  }

  // Post-it actions
  onPostitRightClick(event: MouseEvent) {
    event.preventDefault();
    this.postitDesktopActive.update((v) => !v);
  }

  // Audio controls
  toggleMute() {
    this.muted.update((v) => !v);
  }

  onVolumeWheel(event: WheelEvent) {
    event.preventDefault();
    const step = event.deltaY < 0 ? 5 : -5;
    this.volume.update((v) => Math.max(0, Math.min(100, v + step)));
    if (this.volume() > 0 && this.muted()) {
      this.muted.set(false);
    }
  }

  // Brightness controls
  onBrightnessWheel(event: WheelEvent) {
    event.preventDefault();
    const step = event.deltaY < 0 ? 5 : -5;
    this.brightness.update((v) => Math.max(10, Math.min(100, v + step)));
  }

  // Syspower menu
  openSyspower() {
    this.syspowerStatus.set('Syspower — ~/.config/sys64/power');
    this.syspowerOpen.set(true);
  }

  closeSyspower() {
    this.syspowerOpen.set(false);
  }

  triggerPowerAction(action: string, route?: string) {
    this.syspowerStatus.set(`Executing systemctl ${action}...`);
    setTimeout(() => {
      this.syspowerOpen.set(false);
      if (route) {
        this.#router.navigateByUrl(route);
      }
    }, 450);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.syspowerOpen()) return;
    const key = event.key.toLowerCase();
    if (key === 'escape' || key === 'c') {
      this.closeSyspower();
    } else if (key === 'u') {
      this.triggerPowerAction('poweroff', '/');
    } else if (key === 'r') {
      this.triggerPowerAction('reboot', '/config');
    } else if (key === 'l') {
      this.triggerPowerAction('logout', '/');
    } else if (key === 's') {
      this.triggerPowerAction('suspend');
    }
  }
}
