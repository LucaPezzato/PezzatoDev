import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PezGhostBackground } from '../../components/ghost-background/ghost-background';
import {
  CONFIG_FILES,
  PACKAGE_GROUPS,
  FULL_INSTALL_COMMAND,
  WALLPAPERS,
  ConfigFile,
  PackageGroup,
  WallpaperItem
} from '../../data/config-data';

@Component({
  selector: 'pez-config',
  standalone: true,
  imports: [RouterLink, PezGhostBackground],
  templateUrl: './config.html',
  styleUrl: './config.css'
})
export class PezConfig {
  configFiles = CONFIG_FILES;
  packageGroups = PACKAGE_GROUPS;
  fullInstallCommand = FULL_INSTALL_COMMAND;
  wallpapers = WALLPAPERS;

  activeTab = signal<'dotfiles' | 'wallpapers' | 'packages' | 'keybindings'>('dotfiles');
  selectedFileId = signal<string>(CONFIG_FILES[0]?.id || '');
  selectedWallpaperId = signal<string>(WALLPAPERS[0]?.id || '');
  searchQuery = signal<string>('');
  copiedState = signal<string | null>(null);
  modalWallpaper = signal<WallpaperItem | null>(null);

  bgParallaxX = signal<number>(0);
  bgParallaxY = signal<number>(0);
  cursorX = signal<number>(-1000);
  cursorY = signal<number>(-1000);

  selectedFile = computed(() => {
    return this.configFiles.find((f) => f.id === this.selectedFileId()) || this.configFiles[0];
  });

  selectedWallpaper = computed(() => {
    return this.wallpapers.find((w) => w.id === this.selectedWallpaperId()) || this.wallpapers[0];
  });

  filteredConfigFiles = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.configFiles;
    return this.configFiles.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.path.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.content.toLowerCase().includes(q)
    );
  });

  selectFile(id: string) {
    this.selectedFileId.set(id);
  }

  selectWallpaper(id: string) {
    this.selectedWallpaperId.set(id);
  }

  setTab(tab: 'dotfiles' | 'wallpapers' | 'packages' | 'keybindings') {
    this.activeTab.set(tab);
  }

  openWallpaperModal(wallpaper: WallpaperItem) {
    this.modalWallpaper.set(wallpaper);
  }

  closeWallpaperModal() {
    this.modalWallpaper.set(null);
  }

  fileReferencesWallpaper(file: ConfigFile): WallpaperItem | undefined {
    return this.wallpapers.find((w) => file.content.includes(w.fileName) || file.content.includes(w.path));
  }

  copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedState.set(label);
      setTimeout(() => {
        if (this.copiedState() === label) {
          this.copiedState.set(null);
        }
      }, 2000);
    });
  }

  onMouseMove(event: MouseEvent) {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const mouseX = event.clientX - winW / 2;
    const mouseY = event.clientY - winH / 2;

    this.bgParallaxX.set((mouseX / (winW / 2)) * 35);
    this.bgParallaxY.set((mouseY / (winH / 2)) * 35);
    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
  }

  onMouseLeave() {
    this.bgParallaxX.set(0);
    this.bgParallaxY.set(0);
    this.cursorX.set(-1000);
    this.cursorY.set(-1000);
  }

  // Hyprland Keybindings cheatsheet
  keybindings = [
    { mod: 'SUPER', key: 'Q', action: 'Lancia Terminale Kitty' },
    { mod: 'SUPER', key: 'R', action: 'Lancia Application Launcher (Fuzzel)' },
    { mod: 'SUPER', key: 'C', action: 'Chiudi finestra attiva' },
    { mod: 'SUPER', key: 'E', action: 'Apri File Manager (Nautilus)' },
    { mod: 'SUPER', key: 'V', action: 'Apri Clipboard Manager (Clipse)' },
    { mod: 'SUPER + SHIFT', key: 'S', action: 'Screenshot area con Hyprshot' },
    { mod: 'SUPER', key: 'L', action: 'Blocca Schermo (Hyprlock)' },
    { mod: 'SUPER', key: 'M', action: 'Esci da Hyprland' },
    { mod: 'Waybar Button', key: '', action: 'Apri Menu Spegnimento (Syspower)' },
    { mod: 'SUPER', key: 'F', action: 'Attiva / Disattiva Fullscreen' },
    { mod: 'SUPER', key: 'Space', action: 'Toggle Floating Window' },
    { mod: 'SUPER', key: 'Left / Right / Up / Down', action: 'Sposta focus tra finestre' },
    { mod: 'SUPER', key: '1 .. 10', action: 'Passa al Workspace 1 - 10' },
    { mod: 'SUPER + SHIFT', key: '1 .. 10', action: 'Sposta finestra nel Workspace 1 - 10' }
  ];
}
