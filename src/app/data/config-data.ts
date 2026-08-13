export interface ConfigFile {
  id: string;
  path: string;
  title: string;
  language: string;
  category: string;
  description: string;
  content: string;
}

export interface PackageItem {
  name: string;
  desc: string;
}

export interface PackageGroup {
  id: string;
  title: string;
  icon: string;
  description: string;
  installCommand: string;
  packages: PackageItem[];
}

export interface WallpaperItem {
  id: string;
  title: string;
  fileName: string;
  path: string;
  resolution: string;
  format: string;
  theme: string;
  previewUrl: string;
  description: string;
  usedBy: { name: string; fileId?: string; configPath: string }[];
  setupCommands: { title: string; cmd: string }[];
}

export const WALLPAPERS: WallpaperItem[] = [
  {
    id: 'dracula-png',
    title: 'Dracula Theme Official Wallpaper',
    fileName: 'dracula.png',
    path: '~/images/dracula.png',
    resolution: '8001 × 4501 px (Ultra-HD 8K)',
    format: 'PNG 8-bit RGBA',
    theme: 'Dracula Dark Palette (#282a36, #bd93f9, #ff79c6)',
    previewUrl: 'assets/wallpapers/dracula.png',
    description:
      'Lo sfondo ufficiale del desktop Dracula con silhouette e gradiente a tonalità viola, indaco e rosa. Utilizzato sia come sfondo desktop per Hyprland sia come background per la schermata di blocco Hyprlock.',
    usedBy: [
      { name: 'Hyprpaper', fileId: 'hypr_hyprpaper_conf', configPath: '~/.config/hypr/hyprpaper.conf' },
      { name: 'Hyprlock', fileId: 'hypr_hyprlock_conf', configPath: '~/.config/hypr/hyprlock.conf' },
      { name: 'Waypaper', fileId: 'waypaper_config_ini', configPath: '~/.config/waypaper/config.ini' },
      { name: 'SWWW Daemon', fileId: 'hypr_hyprland_lua', configPath: '~/.config/hypr/hyprland.lua' }
    ],
    setupCommands: [
      { title: 'Applica con Hyprpaper', cmd: 'hyprctl hyprpaper wallpaper "HDMI-A-2,~/images/dracula.png"' },
      { title: 'Applica con SWWW', cmd: 'swww img ~/images/dracula.png --transition-type any --transition-fps 60' },
      { title: 'Applica con Waypaper', cmd: 'waypaper --wallpaper ~/images/dracula.png' }
    ]
  }
];

export const CONFIG_FILES: ConfigFile[] = [
  {
    "id": "hypr_hyprland_lua",
    "path": "~/.config/hypr/hyprland.lua",
    "title": "Hyprland Config",
    "language": "lua",
    "category": "hypr",
    "description": "Main Hyprland window manager configuration (Lua)",
    "content": "------------------\n---- MONITORS ----\n------------------\n\n-- 1. Top Monitor: Samsung 4K (Scaled 1.5x)\n-- Logical resolution becomes 2560x1440\nhl.monitor({\n    output   = \"HDMI-A-2\",\n    mode     = \"3840x2160\",\n    position = \"0x0\",\n    scale    = 1.5,\n})\n\n-- 2. Bottom Monitor: Laptop (Standard 1x)\n-- Position Y is 1440 (directly below the top monitor).\n-- Position X is 320 (to center it: (2560 - 1920) / 2 = 320).\nhl.monitor({\n    output   = \"eDP-1\",\n    mode     = \"1920x1080\",\n    position = \"320x1440\",\n    scale    = 1.0,\n})\n\n---------------------\n---- MY PROGRAMS ----\n---------------------\n\nlocal terminal    = \"kitty\"\nlocal filemanager = \"nautilus\"\nlocal menu        = \"fuzzel\"\n\n-------------------\n---- AUTOSTART ----\n-------------------\n\nhl.on(\"hyprland.start\", function ()\n    hl.exec_cmd(\"hyprpaper\")\n    hl.exec_cmd(\"waybar\")\n    hl.exec_cmd(\"hyprpm reload -n\")\n    hl.exec_cmd(\"/usr/bin/gnome-keyring-daemon --start --components=secrets\")\n    hl.exec_cmd(\"systemctl --user enable --now dunst.service\")\n    hl.exec_cmd(\"systemctl --user enable --now hyprpolkitagent.service\")\n    hl.exec_cmd(\"~/.config/hypr/fuzzel_killer.sh\")\n    hl.exec_cmd(\"/opt/paloaltonetworks/globalprotect/PanGPA start &\")\n    hl.exec_cmd(\"clipse -listen\")\n    hl.exec_cmd(\"cpupower-gui -p\")\nend)\n\n-------------------------------\n---- ENVIRONMENT VARIABLES ----\n-------------------------------\n\nhl.env(\"XCURSOR_SIZE\", \"25\")\nhl.env(\"HYPRCURSOR_SIZE\", \"25\")\nhl.env(\"XDG_SESSION_TYPE\", \"wayland\")\nhl.env(\"XDG_CURRENT_DESKTOP\", \"Hyprland\")\n\n-----------------------\n---- LOOK AND FEEL ----\n-----------------------\n\nhl.config({\n    general = {\n        gaps_in = 4,\n        gaps_out = 8,\n\n        border_size = 2,\n\n        resize_on_border = false,\n\n        allow_tearing = false,\n\n        layout = \"dwindle\",\n\n        --- DRACULA\n        col = {\n            active_border = { colors = {\"rgb(bd93f9)\", \"rgb(ff79c6)\"}, angle = 45 },\n            inactive_border = \"rgba(44475aaa)\",\n            nogroup_border = \"rgba(282a36dd)\",\n            nogroup_border_active = { colors = {\"rgb(bd93f9)\", \"rgb(44475a)\"}, angle = 45 },\n        },\n    },\n\n    decoration = {\n        rounding = 12,\n\n        active_opacity = 1.0,\n        inactive_opacity = 1.0,\n        shadow = {\n            enabled = false,\n            range = 4,\n            render_power = 3,\n            color = \"rgba(1a1a1aee)\",\n        },\n\n        blur = {\n            enabled = false,\n            size = 3,\n            passes = 1,\n\n            vibrancy = 0.1696,\n            special = true,\n        },\n    },\n\n    group = {\n        -- Multi-window border look matching Dracula\n        col = {\n            border_active = \"rgba(bd93f9ff)\",        -- Dracula Purple (Focused Window)\n            border_inactive = \"rgba(282a36ff)\",      -- Dracula Background (Unfocused Window)\n            border_locked_active = \"rgba(ff5555ff)\",   -- Dracula Red (Locked Group)\n        },\n\n        groupbar = {\n            enabled = true,\n            font_size = 12,\n            font_family = \"JetBrainsMono Nerd Font\",\n            height = 24,\n\n            -- Rounded look matching decoration:rounding\n            gradients = true,\n            gradient_round_only_edges = false,\n\n            -- Global Text Color for Groupbar\n            text_color = \"rgba(f8f8f2ff)\",         -- Dracula Foreground (White)\n\n            -- Dracula Tab Palette\n            col = {\n                active = \"rgba(bd93f9ff)\",           -- Active Tab: Purple\n                inactive = \"rgba(44475aff)\",         -- Inactive Tab: Selection Gray\n                locked_active = \"rgba(ff5555ff)\",    -- Active Locked Tab: Red\n                locked_inactive = \"rgba(ff5555aa)\",  -- Inactive Locked Tab: Dim Red\n            },\n        },\n    },\n\n    animations = {\n        enabled = true,\n    },\n\n    dwindle = {\n        preserve_split = true,\n    },\n\n    master = {\n        new_status = \"master\",\n    },\n\n    misc = {\n        force_default_wallpaper = 0,\n        disable_hyprland_logo = true,\n    },\n\n    input = {\n        kb_layout = \"us\",\n        kb_variant = \"\",\n        kb_model = \"\",\n        kb_options = \"\",\n        kb_rules = \"\",\n\n        follow_mouse = 1,\n\n        sensitivity = 0,\n\n        scroll_method = \"2fg\",\n        touchpad = {\n            natural_scroll = true,\n        },\n    },\n})\n\nhl.curve(\"easeOutQuint\",   { type = \"bezier\", points = { {0.23, 1},    {0.32, 1}    } })\nhl.curve(\"easeInOutCubic\", { type = \"bezier\", points = { {0.65, 0.05}, {0.36, 1}    } })\nhl.curve(\"linear\",         { type = \"bezier\", points = { {0, 0},       {1, 1}       } })\nhl.curve(\"almostLinear\",   { type = \"bezier\", points = { {0.5, 0.5},   {0.75, 1.0}  } })\nhl.curve(\"quick\",          { type = \"bezier\", points = { {0.15, 0},    {0.1, 1}     } })\n\nhl.animation({ leaf = \"global\",        enabled = true,  speed = 10,   bezier = \"default\" })\nhl.animation({ leaf = \"border\",        enabled = true,  speed = 5.39, bezier = \"easeOutQuint\" })\nhl.animation({ leaf = \"windows\",       enabled = true,  speed = 4.79, bezier = \"easeOutQuint\" })\nhl.animation({ leaf = \"windowsIn\",      enabled = true,  speed = 4.1,  bezier = \"easeOutQuint\", style = \"popin 87%\" })\nhl.animation({ leaf = \"windowsOut\",     enabled = true,  speed = 1.49, bezier = \"linear\",       style = \"popin 87%\" })\nhl.animation({ leaf = \"fadeIn\",        enabled = true,  speed = 1.73, bezier = \"almostLinear\" })\nhl.animation({ leaf = \"fadeOut\",       enabled = true,  speed = 1.46, bezier = \"almostLinear\" })\nhl.animation({ leaf = \"fade\",          enabled = true,  speed = 3.03, bezier = \"quick\" })\nhl.animation({ leaf = \"layers\",        enabled = true,  speed = 3.81, bezier = \"easeOutQuint\" })\nhl.animation({ leaf = \"layersIn\",      enabled = true,  speed = 4,    bezier = \"easeOutQuint\", style = \"fade\" })\nhl.animation({ leaf = \"layersOut\",     enabled = true,  speed = 1.5,  bezier = \"linear\",       style = \"fade\" })\nhl.animation({ leaf = \"fadeLayersIn\",  enabled = true,  speed = 1.79, bezier = \"almostLinear\" })\nhl.animation({ leaf = \"fadeLayersOut\", enabled = true,  speed = 1.39, bezier = \"almostLinear\" })\nhl.animation({ leaf = \"workspaces\",    enabled = true,  speed = 1.94, bezier = \"almostLinear\", style = \"fade\" })\nhl.animation({ leaf = \"workspacesIn\",  enabled = true,  speed = 1.21, bezier = \"almostLinear\", style = \"fade\" })\nhl.animation({ leaf = \"workspacesOut\", enabled = true,  speed = 1.94, bezier = \"almostLinear\", style = \"fade\" })\n\n---------------\n---- INPUT ----\n---------------\n\nhl.device({\n    name = \"epic-mouse-v1\",\n    sensitivity = -0.5,\n})\n\n---------------------\n---- KEYBINDINGS ----\n---------------------\n\nhl.gesture({\n    fingers = 3,\n    direction = \"horizontal\",\n    action = \"workspace\",\n})\n\nlocal mainMod = \"SUPER\"\n\nhl.bind(mainMod .. \" + RETURN\", hl.dsp.exec_cmd(terminal))\nhl.bind(mainMod .. \" + Q\", hl.dsp.window.close())\nhl.bind(mainMod .. \" + E\", hl.dsp.exec_cmd(filemanager))\nhl.bind(mainMod .. \" + SPACE\", hl.dsp.window.float({ action = \"toggle\" }))\nhl.bind(mainMod .. \" + D\", hl.dsp.exec_cmd(menu))\nhl.bind(mainMod .. \" + P\", hl.dsp.window.pseudo())\nhl.bind(mainMod .. \" + J\", hl.dsp.layout(\"togglesplit\"))\nhl.bind(mainMod .. \" + L\", hl.dsp.exec_cmd(\"hyprlock\"))\nhl.bind(mainMod .. \" + CTRL + S\", hl.dsp.exec_cmd(\"hyprshot -m region\"))\n\n-- Toggle the current window into a group (Tab mode)\nhl.bind(mainMod .. \" + G\", hl.dsp.group.toggle())\n\n-- Cycle through open tabs within the focused group\nhl.bind(mainMod .. \" + TAB\", hl.dsp.group.next())\nhl.bind(mainMod .. \" + SHIFT + TAB\", hl.dsp.group.prev())\n\n-- Move focused window out of the tabbed group\nhl.bind(mainMod .. \" + SHIFT + G\", hl.dsp.group.move_window(\"out\"))\n\n-- Move focus with mainMod + arrow keys\nhl.bind(mainMod .. \" + left\", hl.dsp.exec_cmd(\"pkill -x fuzzel\"))\nhl.bind(mainMod .. \" + left\", hl.dsp.focus({ direction = \"l\" }))\n\nhl.bind(mainMod .. \" + right\", hl.dsp.exec_cmd(\"pkill -x fuzzel\"))\nhl.bind(mainMod .. \" + right\", hl.dsp.focus({ direction = \"r\" }))\n\nhl.bind(mainMod .. \" + up\", hl.dsp.exec_cmd(\"pkill -x fuzzel\"))\nhl.bind(mainMod .. \" + up\", hl.dsp.focus({ direction = \"u\" }))\n\nhl.bind(mainMod .. \" + down\", hl.dsp.exec_cmd(\"pkill -x fuzzel\"))\nhl.bind(mainMod .. \" + down\", hl.dsp.focus({ direction = \"d\" }))\n\n-- Move focused window with mainMod + arrow keys\nhl.bind(mainMod .. \" + SHIFT + left\", hl.dsp.window.move({ direction = \"l\" }))\nhl.bind(mainMod .. \" + SHIFT + right\", hl.dsp.window.move({ direction = \"r\" }))\nhl.bind(mainMod .. \" + SHIFT + up\", hl.dsp.window.move({ direction = \"u\" }))\nhl.bind(mainMod .. \" + SHIFT + down\", hl.dsp.window.move({ direction = \"d\" }))\n\n-- Resize focused window with mainMod + arrow keys (repeating when held)\nhl.bind(mainMod .. \" + CTRL + left\",  hl.dsp.window.resize({ x = -40, y = 0,   relative = true }), { repeating = true })\nhl.bind(mainMod .. \" + CTRL + right\", hl.dsp.window.resize({ x = 40,  y = 0,   relative = true }), { repeating = true })\nhl.bind(mainMod .. \" + CTRL + up\",    hl.dsp.window.resize({ x = 0,   y = -40, relative = true }), { repeating = true })\nhl.bind(mainMod .. \" + CTRL + down\",  hl.dsp.window.resize({ x = 0,   y = 40,  relative = true }), { repeating = true })\n\n-- Switch workspaces with mainMod + [0-9]\n-- Move active window to a workspace with mainMod + SHIFT + [0-9]\nfor i = 1, 10 do\n    local key = tostring(i % 10)\n    hl.bind(mainMod .. \" + \" .. key, hl.dsp.focus({ workspace = i }))\n    hl.bind(mainMod .. \" + SHIFT + \" .. key, hl.dsp.window.move({ workspace = i }))\n    hl.bind(mainMod .. \" + SHIFT + CTRL + \" .. key, hl.dsp.window.move({ workspace = i, silent = true }))\nend\n\n-- Example special workspace (scratchpad)\nhl.bind(mainMod .. \" + S\", hl.dsp.workspace.toggle_special(\"magic\"))\nhl.bind(mainMod .. \" + SHIFT + S\", hl.dsp.window.move({ workspace = \"special:magic\" }))\n\n-- Move/resize windows with mainMod + LMB/RMB and dragging\nhl.bind(mainMod .. \" + mouse:272\", hl.dsp.window.drag(), { mouse = true })\nhl.bind(mainMod .. \" + mouse:273\", hl.dsp.window.resize(), { mouse = true })\n\n-- Laptop multimedia keys for volume and LCD brightness\nhl.bind(\"XF86AudioRaiseVolume\", hl.dsp.exec_cmd(\"wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+\"), { locked = true, repeating = true })\nhl.bind(\"XF86AudioLowerVolume\", hl.dsp.exec_cmd(\"wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-\"), { locked = true, repeating = true })\nhl.bind(\"XF86AudioMute\", hl.dsp.exec_cmd(\"wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle\"), { locked = true, repeating = true })\nhl.bind(\"XF86AudioMicMute\", hl.dsp.exec_cmd(\"wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle\"), { locked = true, repeating = true })\nhl.bind(\"XF86MonBrightnessUp\", hl.dsp.exec_cmd(\"brightnessctl s 10%+\"), { locked = true, repeating = true })\nhl.bind(\"XF86MonBrightnessDown\", hl.dsp.exec_cmd(\"brightnessctl s 10%-\"), { locked = true, repeating = true })\n\n-- Requires playerctl\nhl.bind(\"XF86AudioNext\", hl.dsp.exec_cmd(\"playerctl next\"), { locked = true })\nhl.bind(\"XF86AudioPause\", hl.dsp.exec_cmd(\"playerctl play-pause\"), { locked = true })\nhl.bind(\"XF86AudioPlay\", hl.dsp.exec_cmd(\"playerctl play-pause\"), { locked = true })\nhl.bind(\"XF86AudioPrev\", hl.dsp.exec_cmd(\"playerctl previous\"), { locked = true })\n\nhl.bind(mainMod .. \" + F\", hl.dsp.window.fullscreen())\n\n-- Layout Change\nhl.bind(mainMod .. \" + L\", hl.dsp.exec_cmd(\"hyprctl keyword general:layout \\\"dwindle\\\"\"))\nhl.bind(mainMod .. \" + SHIFT + L\", hl.dsp.exec_cmd(\"hyprctl keyword general:layout \\\"master\\\"\"))\n\nhl.bind(\"switch:Lid Switch\", hl.dsp.exec_cmd(\"hyprctl keyword monitor \\\"eDP-1, disable\\\"\"), { locked = true })\nhl.bind(\"switch:off:Lid Switch\", hl.dsp.exec_cmd(\"hyprctl keyword monitor \\\"eDP-1, preferred, auto, 1\\\"\"), { locked = true })\n\nhl.bind(\"SUPER + V\", hl.dsp.exec_cmd(\"kitty --class clipse -e clipse\"))\n\n--------------------------------\n---- WINDOWS AND WORKSPACES ----\n--------------------------------\n\nhl.workspace_rule({\n    workspace = \"special:magic\",\n    gaps_out = 60,\n})\n\nhl.window_rule({\n    name = \"clipse-rule-1\",\n    match = { class = \"^(clipse)$\" },\n    float = true,\n    size = \"622 652\",\n    center = true,\n})\n\nhl.window_rule({\n    name = \"datagrip-stay-focused\",\n    match = { title = \"^$\", class = \"^(jetbrains-datagrip)$\" },\n    stay_focused = true,\n    min_size = \"1 1\",\n})\n\nhl.window_rule({\n    name = \"datagrip-no-initial-focus\",\n    match = { class = \"^(jetbrains-datagrip)$\", title = \"^(win.*)$\" },\n    no_initial_focus = true,\n})\n\nhl.window_rule({\n    name = \"popup-center\",\n    match = { class = \"^(class-of-popup)$\" },\n    center = true,\n})\n\nhl.window_rule({\n    name = \"clipse-rules-2\",\n    match = { class = \"^(clipse)$\", title = \"^(clipse)$\" },\n    float = true,\n    size = \"622 652\",\n    center = true,\n})\n\nhl.window_rule({\n    name = \"nautilus-rules\",\n    match = { class = \"^(org.gnome.Nautilus)$\" },\n    float = true,\n    center = true,\n    size = \"800 600\",\n})\n\nhl.window_rule({\n    name = \"xdg-desktop-portal-rules\",\n    match = { class = \"^(xdg-desktop-portal-gtk)$\" },\n    float = true,\n    center = true,\n    size = \"800 600\",\n})\n\nhl.window_rule({\n    name = \"open-save-dialog-rules\",\n    match = { title = \"^(Open|Save) (File|Folder|As)$\" },\n    float = true,\n    size = \"800 600\",\n    center = true,\n})\n\nhl.window_rule({\n    name = \"phantom-xwayland-rules\",\n    match = {\n        class = \"^$\",\n        title = \"^$\",\n        xwayland = true,\n        float = true,\n        fullscreen = false,\n        pin = false,\n    },\n    no_focus = true,\n})\n\nhl.window_rule({\n    name = \"workspace-s1-border\",\n    match = { workspace = \"s[1]\" },\n    border_color = \"rgb(50fa7b)\",\n})\n\nhl.window_rule({\n    name = \"bluetooth-rules\",\n    match = { title = \"(bluetooth)\" },\n    float = true,\n    size = \"800 400\",\n})\n\nhl.window_rule({\n    name = \"network-rules\",\n    match = { title = \"(network)\" },\n    float = true,\n    size = \"800 400\",\n})\n\nhl.window_rule({\n    name = \"xfreerdp-suppress-events\",\n    match = { class = \"^(xfreerdp|org.freerdp.xfreerdp)$\" },\n    suppress_event = \"maximize fullscreen\",\n})\n"
  },
  {
    "id": "hypr_hyprlock_conf",
    "path": "~/.config/hypr/hyprlock.conf",
    "title": "Hyprlock Screen Locker",
    "language": "ini",
    "category": "hypr",
    "description": "Hyprland screen lock & auth display",
    "content": "\n# BACKGROUND\nbackground {\n    monitor =\n    #path = screenshot\n    path = /home/pez/images/dracula.png\n    #color = $background\n    blur_passes = 2\n    contrast = 1\n    brightness = 0.5\n    vibrancy = 0.2\n    vibrancy_darkness = 0.2\n}\n\n# GENERAL\ngeneral {\n    no_fade_in = true\n    no_fade_out = true\n    hide_cursor = false\n    grace = 0\n    disable_loading_bar = true\n}\n\n# INPUT FIELD\ninput-field {\n    monitor =\n    size = 250, 60\n    outline_thickness = 2\n    dots_size = 0.2 # Scale of input-field height, 0.2 - 0.8\n    dots_spacing = 0.35 # Scale of dots' absolute size, 0.0 - 1.0\n    dots_center = true\n    font_color = rgb(189, 147, 249)\n    outer_color = rgba(0, 0, 0, 0)\n    inner_color = rgba(0, 0, 0, 0.2)\n    font_color = $foreground\n    fade_on_empty = false\n    rounding = -1\n    check_color = rgb(189, 147, 249)\n    placeholder_text = <i><span foreground=\"##bd93f9\">Input Password...</span></i>\n    hide_input = false\n    position = 0, -200\n    halign = center\n    valign = center\n}\n\n# DATE\nlabel {\n  monitor =\n  text = cmd[update:1000] echo \"$(date +\"%A, %B %d\")\"\n  color = rgba(242, 243, 244, 0.75)\n  font_size = 22\n  font_family = JetBrains Mono\n  position = 0, 300\n  halign = center\n  valign = center\n}\n\n# TIME\nlabel {\n  monitor = \n  text = cmd[update:1000] echo \"$(date +\"%-I:%M\")\"\n  color = rgba(242, 243, 244, 0.75)\n  font_size = 95\n  font_family = JetBrains Mono Extrabold\n  position = 0, 200\n  halign = center\n  valign = center\n}\n\n\n\n"
  },
  {
    "id": "hypr_hyprpaper_conf",
    "path": "~/.config/hypr/hyprpaper.conf",
    "title": "Hyprpaper Wallpaper",
    "language": "ini",
    "category": "hypr",
    "description": "Hyprland wallpaper daemon configuration",
    "content": "wallpaper {\n    monitor =\n    path = /home/pez/images/dracula.png\n    fit_mode = cover\n}\n"
  },
  {
    "id": "waypaper_config_ini",
    "path": "~/.config/waypaper/config.ini",
    "title": "Waypaper Wallpaper GUI",
    "language": "ini",
    "category": "hypr",
    "description": "Waypaper GUI & Hyprpaper wallpaper daemon settings",
    "content": "[Settings]\nlanguage = en\nfolder = ~/images\nmonitors = All\nwallpaper = ~/images/dracula.png\nshow_path_in_tooltip = True\nbackend = hyprpaper\nfill = fill\nsort = name\ncolor = #ffffff\nsubfolders = False\nall_subfolders = False\nshow_hidden = False\nshow_gifs_only = False\nzen_mode = False\npost_command = \nnumber_of_columns = 3\nswww_transition_type = any\nswww_transition_step = 63\nswww_transition_angle = 0\nswww_transition_duration = 2\nswww_transition_fps = 60\nmpvpaper_sound = False\nmpvpaper_options = \nuse_xdg_state = False\nstylesheet = /home/pez/.config/waypaper/style.css\n"
  },
  {
    "id": "waybar_config",
    "path": "~/.config/waybar/config",
    "title": "Waybar Layout",
    "language": "json",
    "category": "waybar",
    "description": "Waybar status bar modules & structure",
    "content": "{\n  \"layer\": \"top\", // Waybar at top layer\n    \"position\": \"top\", // Waybar at the bottom of your screen\n    \"height\": 24, // Waybar height\n    \"modules-left\": [\"network\",\"bluetooth\",\"backlight\",\"hyprland/workspaces\"],\n    \"modules-center\": [\"hyprland/window\"],\n    \"modules-right\": [\"tray\", \"pulseaudio\", \"cpu\", \"memory\", \"battery\",\"battery#BAT0\", \"clock\", \"custom/power\"],\n    \"tray\": {\n      \"spacing\": 10\n    },\n    \"hyprland/window\": {  \n      \"format\": \"<span font='9' rise='-4444'>{}</span>\"  \n    },\n    \"clock\": {\n      \"format-alt\": \"{:%Y-%m-%d}\"\n    },\n    \"cpu\": {\n      \"format\": \"{usage}% \uf2db\",\n      \"on-click\": \"cpupower-gui\"\n    },\n    \"memory\": {\n      \"format\": \"{}% \uf0c9\"\n    },\n    \"battery#BAT0\": {\n      \"bat\": \"BAT0\",\n      \"states\": {\n        \"warning\": 30,\n        \"critical\": 15\n      },\n      \"format\": \"I {capacity}% {icon}\",\n      \"format-alt\": \"I {time} {icon}\",\n      \"format-icons\": [\"\uf244\", \"\uf243\", \"\uf242\", \"\uf241\", \"\uf240\"]\n    },\n    \"battery\": {\n      \"bat\": \"BAT1\",\n      \"states\": {\n        \"warning\": 30,\n        \"critical\": 15\n      },\n      \"format\": \"E {capacity}% {icon}\",\n      \"format-alt\": \"E {time} {icon}\",\n      \"format-icons\": [\"\uf244\", \"\uf243\", \"\uf242\", \"\uf241\", \"\uf240\"]\n    },\n    \"network\": {\n      \"format-wifi\": \"{signalStrength}% \uf1eb\",\n      \"tooltip-format-wifi\": \"{essid} ({signalStrength}%) \uf1eb\",\n      \"format-ethernet\": \"{ipaddr}/{cidr} \uf0c1\",\n      \"tooltip-format-ethernet\": \"{ifname}: {ipaddr}/{cidr} \uf0c1\",\n      \"format-disconnected\": \"Disconnected \u26a0\",\n      \"on-click\": \"kitty --title network -e sh -c nmtui\"\n    },\n    \"pulseaudio\": {\n      \"scroll-step\": 5,\n      \"format\": \"{volume}% {icon}\",\n      \"format-bluetooth\": \"{volume}% \uf294\",\n      \"format-muted\": \"\uf026\",\n      \"format-icons\": {\n        \"headphones\": \"\uf025\",\n        \"handsfree\": \"\uf590\",\n        \"headset\": \"\uf590\",\n        \"phone\": \"\uf095\",\n        \"portable\": \"\uf095\",\n        \"car\": \"\uf1b9\",\n        \"default\": [\"\uf027\", \"\uf028\"]\n      },\n      \"on-click\": \"pavucontrol\"\n    },\n    \"bluetooth\": {\n      \"format\": \"{status} \uf294\",\n      \"format-connected\": \"{device_alias} \uf294\",\n      \"format-connected-battery\": \"{device_alias} {device_battery_percentage}% \uf294\",\n      \"tooltip-format\": \"{controller_alias}\\t{controller_address}\\n\\n{num_connections} connected\",\n      \"tooltip-format-connected\": \"{controller_alias}\\t{controller_address}\\n\\n{num_connections} connected\\n\\n{device_enumerate}\",\n      \"tooltip-format-enumerate-connected\": \"{device_alias}\\t{device_address}\",\n      \"tooltip-format-enumerate-connected-battery\": \"{device_alias}\\t{device_address}\\t{device_battery_percentage}%\",\n      \"on-click\": \"kitty --title bluetooth -e sh -c bluetui\"\n    },\n    \"backlight\": {\n      \"device\": \"intel_backlight\",\n      \"format\": \"{percent}% {icon}\",\n      \"format-icons\": [\"\uf185\", \"\uf111\"]\n    },\n    \"custom/power\": {\n      \"format\": \"\uf011\",\n      \"tooltip\": false,\n      \"on-click\": \"syspower\"\n    }\n}\n"
  },
  {
    "id": "waybar_style_css",
    "path": "~/.config/waybar/style.css",
    "title": "Waybar Styling",
    "language": "css",
    "category": "waybar",
    "description": "Waybar CSS Dracula theme styling",
    "content": "* {\n    border: none;\n    border-radius: 0;\n    font-family: \"JetBrains mono\";\n    font-size: 14px;\n    min-height: 0;\n}\n\nwindow#waybar {\n\t/* background: #282a36; */\n\tcolor:#f8f8f2;\n  background: transparent;\n\t/*#border-bottom: 2px solid #bd93f9;*/\n}\n\n#clock, #battery, #cpu, #memory, #network, #pulseaudio, #tray, #bluetooth, #backlight, #custom-power, #workspaces{\n    padding: 0px 12px;\n    margin: 4px; \n    border-radius: 8px;\n\t  background: #282a36;\n\t  border: 2px solid #bd93f9;\n}\n#workspaces {\n    padding: 0;\n}\n\n#network, #battery, #cpu, #memory, #network, #pulseaudio, #tray, #bluetooth, #backlight, #custom-power{\n    /*border-right: 1px solid #bd93f9;*/\n\t background: #282a36;\n}\n#clock {\n    font-weight: bold;\n}\n\n#custom-power {\n    color: #ff5555;\n    padding-left: 10px;\n    padding-right: 13px;\n}\n\n\n#battery.warning {\n    color: #ffb86c;\n    background: transparent;\n}\n\n#battery.critical{\n\tcolor: #ff5555;\n  background: transparent;\n}\n\n@keyframes blink {\n    to {\n        background-color: #ffffff;\n        color: black;\n    }\n}\n\n#battery.charging{\n    color: #50fa7b;\n    background-color: transparent;\n}\n\n#network.disconnected {\n    background: #f53c3c;\n}\n\n#window{\n\tcolor:  #bd93f9;\n\tfont-weight: bold;\n\tpadding: 0 20px;\n}\n\n#workspaces button.active{\n\tbackground:  #bd93f9;\n}\n"
  },
  {
    "id": "syspower_config_conf",
    "path": "~/.config/sys64/power/config.conf",
    "title": "Syspower Menu Config",
    "language": "ini",
    "category": "waybar",
    "description": "Syspower power management menu configuration & hotkeys",
    "content": "[main]\nposition=4\nmonitor=0\ntransition-duration=300\nbuttons=shutdown,reboot,logout,suspend,hibernate\n\n[hotkeys]\nu=shutdown\nr=reboot\nl=logout\ns=suspend\nc=cancel\n"
  },
  {
    "id": "syspower_style_css",
    "path": "~/.config/sys64/power/style.css",
    "title": "Syspower Dracula Style",
    "language": "css",
    "category": "waybar",
    "description": "Syspower GTK4 Dracula theme overlay & button styling",
    "content": "#syspower {\n\tbackground: rgba(40, 42, 54, 0.85);\n}\n\n#syspower .primary_window {\n\tborder-radius: 16px;\n}\n\n#syspower .box_layout {\n\tpadding: 24px;\n}\n\n#syspower .box_buttons {\n\tmargin: 10px;\n}\n\n#syspower button {\n\tbackground: #44475a;\n\tcolor: #f8f8f2;\n\tborder: 1px solid rgba(98, 114, 164, 0.4);\n\tborder-radius: 10px;\n\tfont-weight: bold;\n\tfont-size: 15px;\n\tpadding: 12px 24px;\n\tmargin: 6px;\n\ttransition: all 0.2s ease-in-out;\n}\n\n#syspower button:hover {\n\tbackground: #6272a4;\n\tcolor: #ffffff;\n}\n\n#syspower .button_shutdown:hover {\n\tbackground: #ff5555;\n\tcolor: #282a36;\n}\n\n#syspower .button_reboot:hover {\n\tbackground: #ffb86c;\n\tcolor: #282a36;\n}\n\n#syspower .button_logout:hover {\n\tbackground: #bd93f9;\n\tcolor: #282a36;\n}\n\n#syspower .button_suspend:hover {\n\tbackground: #8be9fd;\n\tcolor: #282a36;\n}\n\n#syspower .button_hibernate:hover {\n\tbackground: #50fa7b;\n\tcolor: #282a36;\n}\n\n#syspower .button_cancel:hover {\n\tbackground: #ff5555;\n\tcolor: #ffffff;\n}\n\n#syspower .label_status {\n\tcolor: #f8f8f2;\n\tfont-size: 18px;\n\tfont-weight: bold;\n}\n"
  },
  {
    "id": "kitty_kitty_conf",
    "path": "~/.config/kitty/kitty.conf",
    "title": "Kitty Terminal",
    "language": "ini",
    "category": "kitty",
    "description": "Kitty terminal font, padding & Dracula palette",
    "content": "background_opacity 0.9\nfont_family JetBrains mono\nmap ctrl+backspace send_text all \\x17\nconfirm_os_window_close 0\n"
  },
  {
    "id": "fish_config_fish",
    "path": "~/.config/fish/config.fish",
    "title": "Fish Shell",
    "language": "bash",
    "category": "fish",
    "description": "Fish shell aliases, environment vars & prompt",
    "content": "if status is-interactive\n    # Commands to run in interactive sessions can go here\nend\nset -g fish_greeting\nfish_config theme choose \"Dracula Official\"\neval (ssh-agent -c)\nssh-add ~/.ssh/id_ed25519\n\n# Created by `pipx` on 2025-06-15 18:22:00\nset PATH $PATH /home/pez/.local/bin\nexport EDITOR=\"nvim\"\nnvm use lts\n\nexport NODE_OPTIONS=\"--max-old-space-size=300000\"\n\n\n# Added by Antigravity CLI installer\nset -gx PATH \"/home/pez/.local/bin\" $PATH\n"
  },
  {
    "id": "dunst_dunstrc",
    "path": "~/.config/dunst/dunstrc",
    "title": "Dunst Notifications",
    "language": "ini",
    "category": "dunst",
    "description": "Dunst notification daemon geometry & colors",
    "content": "[urgency_low]\n    background = \"#282a36\"\n    foreground = \"#6272a4\"\n    frame_color = \"#44475a\"\n    timeout = 10\n\n[urgency_normal]\n    background = \"#282a36\"\n    foreground = \"#f8f8f2\"\n    frame_color = \"#bd93f9\"\n    timeout = 10\n\n[urgency_critical]\n    background = \"#ff5555\"\n    foreground = \"#f8f8f2\"\n    frame_color = \"#ffb86c\"\n    timeout = 0\n\n[global]\n    # Set the corner radius in pixels (10-15 is usually a good starting point)\n    corner_radius = 10\n\n    # Optional: Round the corners of progress bars and icons for a consistent look\n    progress_bar_corner_radius = 5\n    icon_corner_radius = 5\n\n    # Define which corners to round (default is all)\n    corners = all\n\n"
  },
  {
    "id": "fuzzel_fuzzel_ini",
    "path": "~/.config/fuzzel/fuzzel.ini",
    "title": "Fuzzel Launcher",
    "language": "ini",
    "category": "fuzzel",
    "description": "Fuzzel application launcher keybindings & theme",
    "content": "# output=<not set>\nfont=JetBrains Mono:size=12\ndpi-aware=no\n# prompt=> \n# icon-theme=hicolor\n# icons-enabled=yes\n# fields=filename,name,generic\n# password-character=*\n# fuzzy=yes\n# show-actions=no\n# terminal=$TERMINAL -e  # Note: you cannot actually use environment variables here\n# launch-prefix=<not set>\n\nlines=10\nwidth=25\n# horizontal-pad=40\n# vertical-pad=8\n# inner-pad=0\n\n# image-size-ratio=0.7\n\n# line-height=<use font metrics>\n# letter-spacing=0\n\n# layer = top\nexit-on-keyboard-focus-loss = yes\n\n[colors]\nbackground=282a36ff\ntext=f8f8f2ff\nmatch=ff79c6ff\nselection-match=ff79c6ff\nselection=44475aff\nselection-text=bd93f9ff\nborder=50fa7bff\n\n[border]\nwidth=2\nradius=8\n\n[dmenu]\n# mode=text  # text|index\n# exit-immediately-if-empty=no\n\n[key-bindings]\n# cancel=Escape Control+g\n# execute=Return KP_Enter Control+y\n# execute-or-next=Tab\n# cursor-left=Left Control+b\n# cursor-left-word=Control+Left Mod1+b\n# cursor-right=Right Control+f\n# cursor-right-word=Control+Right Mod1+f\n# cursor-home=Home Control+a\n# cursor-end=End Control+e\n# delete-prev=BackSpace\n# delete-prev-word=Mod1+BackSpace Control+BackSpace\n# delete-next=Delete\n# delete-next-word=Mod1+d Control+Delete\n# delete-line=Control+k\n# prev=Up Control+p\n# prev-with-wrap=ISO_Left_Tab\n# prev-page=PageUp KP_PageUp\n# next=Down Control+n\n# next-with-wrap=none\n# next-page=Page_Down KP_Page_Down\n\n# custom-N: *dmenu mode only*. Like execute, but with a non-zero\n# exit-code; custom-1 exits with code 10, custom-2 with 11, custom-3\n# with 12, and so on.\n\n# custom-1=Mod1+1\n# custom-2=Mod1+2\n# custom-3=Mod1+3\n# custom-4=Mod1+4\n# custom-5=Mod1+5\n# custom-6=Mod1+6\n# custom-7=Mod1+7\n# custom-8=Mod1+8\n# custom-9=Mod1+9\n# custom-10=Mod1+0\n# custom-11=Mod1+exclam\n# custom-12=Mod1+at\n# custom-13=Mod1+numbersign\n# custom-14=Mod1+dollar\n# custom-15=Mod1+percent\n# custom-16=Mod1+dead_circumflex\n# custom-17=Mod1+ampersand\n# custom-18=Mod1+asterix\n# custom-19=Mod1+parentleft\n"
  },
  {
    "id": "_etc_ly_config_ini",
    "path": "/etc/ly/config.ini",
    "title": "Ly Display Manager",
    "language": "ini",
    "category": "ly",
    "description": "Ly TUI display manager & session selector configuration",
    "content": "# Ly supports 24-bit true color with styling, which means each color is a 32-bit value.\n# The format is 0xSSRRGGBB, where SS is the styling, RR is red, GG is green, and BB is blue.\n# Here are the possible styling options:\n#define TB_BOLD      0x01000000\n#define TB_UNDERLINE 0x02000000\n#define TB_REVERSE   0x04000000\n#define TB_ITALIC    0x08000000\n#define TB_BLINK     0x10000000\n#define TB_HI_BLACK  0x20000000\n#define TB_BRIGHT    0x40000000\n#define TB_DIM       0x80000000\n# Programmatically, you'd apply them using the bitwise OR operator (|), but because Ly's\n# configuration doesn't support using it, you have to manually compute the color value.\n# Note that, if you want to use the default color value of the terminal, you can use the\n# special value 0x00000000. This means that, if you want to use black, you *must* use\n# the styling option TB_HI_BLACK (the RGB values are ignored when using this option).\n\n# Allow empty password or not when authenticating\nallow_empty_password = true\n\n# The active animation\n# none     -> Nothing\n# doom     -> PSX DOOM fire\n# matrix   -> CMatrix\n# colormix -> Color mixing shader\nanimation = none\n\n# Stop the animation after some time\n# 0 -> Run forever\n# 1..2e12 -> Stop the animation after this many seconds\nanimation_timeout_sec = 0\n\n# The character used to mask the password\n# You can either type it directly as a UTF-8 character (like *), or use a UTF-32\n# codepoint (for example 0x2022 for a bullet point)\n# If null, the password will be hidden\n# Note: you can use a # by escaping it like so: \\#\nasterisk = *\n\n# The number of failed authentications before a special animation is played... ;)\nauth_fails = 10\n\n# Background color id\nbg = 0x282a36\n\n# Change the state and language of the big clock\n# none -> Disabled (default)\n# en   -> English\n# fa   -> Farsi\nbigclock = none\n\n# Blank main box background\n# Setting to false will make it transparent\nblank_box = true\n\n# Border foreground color id\nborder_fg = 0xbd93f9\n\n# Title to show at the top of the main box\n# If set to null, none will be shown\nbox_title = null\n\n# Brightness increase command\nbrightness_down_cmd = /usr/bin/brightnessctl -q s 10%-\n\n# Brightness decrease key, or null to disable\nbrightness_down_key = F5\n\n# Brightness increase command\nbrightness_up_cmd = /usr/bin/brightnessctl -q s +10%\n\n# Brightness increase key, or null to disable\nbrightness_up_key = F6\n\n# Erase password input on failure\nclear_password = false\n\n# Format string for clock in top right corner (see strftime specification). Example: %c\n# If null, the clock won't be shown\nclock = null\n\n# CMatrix animation foreground color id\ncmatrix_fg = 0x0000FF00\n\n# CMatrix animation minimum codepoint. It uses a 16-bit integer\n# For Japanese characters for example, you can use 0x3000 here\ncmatrix_min_codepoint = 0x21\n\n# CMatrix animation maximum codepoint. It uses a 16-bit integer\n# For Japanese characters for example, you can use 0x30FF here\ncmatrix_max_codepoint = 0x7B\n\n# Color mixing animation first color id\ncolormix_col1 = 0x00FF0000\n\n# Color mixing animation second color id\ncolormix_col2 = 0x000000FF\n\n# Color mixing animation third color id\ncolormix_col3 = 0x20000000\n\n# Console path\nconsole_dev = /dev/console\n\n# Input box active by default on startup\n# Available inputs: info_line, session, login, password\ndefault_input = login\n\n# DOOM animation top color (low intensity flames)\ndoom_top_color = 0x00FF0000\n\n# DOOM animation middle color (medium intensity flames)\ndoom_middle_color = 0x00FFFF00\n\n# DOOM animation bottom color (high intensity flames)\ndoom_bottom_color = 0x00FFFFFF\n\n# Error background color id\nerror_bg = 0x00000000\n\n# Error foreground color id\n# Default is red and bold\nerror_fg = 0x01FF0000\n\n# Foreground color id\nfg = 0x00FFFFFF\n\n# Remove main box borders\nhide_borders = false\n\n# Remove power management command hints\nhide_key_hints = false\n\n# Initial text to show on the info line\n# If set to null, the info line defaults to the hostname\ninitial_info_text = null\n\n# Input boxes length\ninput_len = 34\n\n# Active language\n# Available languages are found in /etc/ly/lang/\nlang = en\n\n# Load the saved desktop and username\nload = true\n\n# Command executed when logging in\n# If null, no command will be executed\n# Important: the code itself must end with `exec \"$@\"` in order to launch the session!\n# You can also set environment variables in there, they'll persist until logout\nlogin_cmd = null\n\n# Command executed when logging out\n# If null, no command will be executed\n# Important: the session will already be terminated when this command is executed, so\n# no need to add `exec \"$@\"` at the end\nlogout_cmd = null\n\n# Main box horizontal margin\nmargin_box_h = 2\n\n# Main box vertical margin\nmargin_box_v = 1\n\n# Event timeout in milliseconds\nmin_refresh_delta = 5\n\n# Set numlock on/off at startup\nnumlock = false\n\n# Default path\n# If null, ly doesn't set a path\npath = /sbin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin\n\n# Command executed when pressing restart_key\nrestart_cmd = /sbin/shutdown -r now\n\n# Specifies the key used for restart (F1-F12)\nrestart_key = F2\n\n# Save the current desktop and login as defaults\nsave = true\n\n# Service name (set to ly to use the provided pam config file)\nservice_name = ly\n\n# Session log file path\n# This will contain stdout and stderr of Wayland sessions\n# By default it's saved in the user's home directory\n# Important: due to technical limitations, X11 and shell sessions aren't supported, which\n# means you won't get any logs from those sessions\nsession_log = ly-session.log\n\n# Setup command\nsetup_cmd = /etc/ly/setup.sh\n\n# Command executed when pressing shutdown_key\nshutdown_cmd = /sbin/shutdown -a now\n\n# Specifies the key used for shutdown (F1-F12)\nshutdown_key = F1\n\n# Command executed when pressing sleep key (can be null)\nsleep_cmd = null\n\n# Specifies the key used for sleep (F1-F12)\nsleep_key = F3\n\n# Center the session name.\ntext_in_center = false\n\n# TTY in use\ntty = 2\n\n# Default vi mode\n# normal   -> normal mode\n# insert   -> insert mode\nvi_default_mode = normal\n\n# Enable vi keybindings\nvi_mode = false\n\n# Wayland desktop environments\n# You can specify multiple directories,\n# e.g. /usr/share/wayland-sessions:/usr/local/share/wayland-sessions\nwaylandsessions = /usr/share/wayland-sessions\n\n# Xorg server command\nx_cmd = /usr/bin/X\n\n# Xorg xauthority edition tool\nxauth_cmd = /usr/bin/xauth\n\n# xinitrc\n# If null, the xinitrc session will be hidden\nxinitrc = ~/.xinitrc\n\n# Xorg desktop environments\n# You can specify multiple directories,\n# e.g. /usr/share/xsessions:/usr/local/share/xsessions\nxsessions = /usr/share/xsessions\nforce_update=1\n"
  }
];

export const PACKAGE_GROUPS: PackageGroup[] = [
  {
    "id": "wayland-hyprland",
    "title": "Hyprland & Wayland Desktop",
    "icon": "layout",
    "description": "Hyprland compositor, Ly TUI display manager, status bar, screen locker, app launcher, syspower menu & Wayland utilities.",
    "installCommand": "yay -S --needed ly hyprland hyprlock hyprpaper hyprpolkitagent hyprshot waybar-git fuzzel dunst xdg-desktop-portal-hyprland-git clipse waypaper aquamarine hyprcursor hyprgraphics wl-clipboard syspower",
    "packages": [
      {
        "name": "ly",
        "desc": "TUI display manager & login session selector"
      },
      {
        "name": "hyprland",
        "desc": "Dynamic tiling Wayland compositor"
      },
      {
        "name": "hyprlock",
        "desc": "Fast, GPU-accelerated screen locker"
      },
      {
        "name": "hyprpaper",
        "desc": "Blazing fast Wayland wallpaper utility"
      },
      {
        "name": "hyprpolkitagent",
        "desc": "Polkit authentication agent for Hyprland"
      },
      {
        "name": "hyprshot",
        "desc": "Screenshot utility for Hyprland"
      },
      {
        "name": "waybar-git",
        "desc": "Highly customizable Wayland bar"
      },
      {
        "name": "fuzzel",
        "desc": "Wayland application launcher"
      },
      {
        "name": "dunst",
        "desc": "Lightweight notification daemon"
      },
      {
        "name": "clipse",
        "desc": "Clipboard manager with TUI interface"
      },
      {
        "name": "waypaper",
        "desc": "GUI wallpaper setter for Wayland"
      },
      {
        "name": "syspower",
        "desc": "Power management menu utility"
      }
    ]
  },
  {
    "id": "terminal-shell",
    "title": "Terminal, Shell & CLI Tools",
    "icon": "terminal",
    "description": "Fast GPU terminal emulator, shell environment, and CLI tools.",
    "installCommand": "yay -S --needed kitty fish btop-git lazygit neovim-git ripgrep fd glow fastfetch s-tui-git starship",
    "packages": [
      {
        "name": "kitty",
        "desc": "Fast, feature-rich GPU-accelerated terminal"
      },
      {
        "name": "fish",
        "desc": "Smart and user-friendly command line shell"
      },
      {
        "name": "btop-git",
        "desc": "Resource monitor showing usage of CPU, memory, disks"
      },
      {
        "name": "lazygit",
        "desc": "Simple terminal UI for git commands"
      },
      {
        "name": "neovim-git",
        "desc": "Vim-fork focused on extensibility and usability"
      },
      {
        "name": "ripgrep",
        "desc": "Fast line-oriented search tool"
      },
      {
        "name": "fd",
        "desc": "Simple, fast and user-friendly alternative to find"
      },
      {
        "name": "glow",
        "desc": "Render markdown on the CLI"
      },
      {
        "name": "s-tui-git",
        "desc": "Terminal-based CPU stress and monitoring utility"
      }
    ]
  },
  {
    "id": "dev-runtimes",
    "title": "Development & Runtimes",
    "icon": "code",
    "description": "Compilers, SDKs, container runtimes, and IDEs.",
    "installCommand": "yay -S --needed base-devel git docker-compose dotnet-sdk-8.0 dotnet-sdk-9.0 visual-studio-code-bin cmake ninja gcc gdb python-uv yarn",
    "packages": [
      {
        "name": "git",
        "desc": "Fast, scalable, distributed revision control system"
      },
      {
        "name": "docker-compose",
        "desc": "Define and run multi-container Docker applications"
      },
      {
        "name": "dotnet-sdk-8.0",
        "desc": ".NET 8 Software Development Kit"
      },
      {
        "name": "dotnet-sdk-9.0",
        "desc": ".NET 9 Software Development Kit"
      },
      {
        "name": "visual-studio-code-bin",
        "desc": "Editor for building and debugging web & cloud apps"
      },
      {
        "name": "python-uv",
        "desc": "Extremely fast Python package installer and resolver written in Rust"
      }
    ]
  },
  {
    "id": "apps-media",
    "title": "Applications & Productivity",
    "icon": "app",
    "description": "Daily productivity apps, web browsers, media players, and remote tools.",
    "installCommand": "yay -S --needed google-chrome discord discord-canary obsidian nautilus gwenview mpv filezilla remmina rustdesk-bin anydesk-bin pavucontrol nordvpn-bin youtube-music libreoffice-still",
    "packages": [
      {
        "name": "google-chrome",
        "desc": "The popular web browser from Google"
      },
      {
        "name": "discord",
        "desc": "All-in-one voice and text chat"
      },
      {
        "name": "obsidian",
        "desc": "Powerful knowledge base written on top of local Markdown"
      },
      {
        "name": "nautilus",
        "desc": "Default file manager for GNOME desktop"
      },
      {
        "name": "mpv",
        "desc": "Free, open source, and cross-platform media player"
      },
      {
        "name": "remmina",
        "desc": "Remote desktop client written in GTK+"
      },
      {
        "name": "rustdesk-bin",
        "desc": "Open source remote desktop software"
      },
      {
        "name": "nordvpn-bin",
        "desc": "NordVPN CLI client"
      },
      {
        "name": "youtube-music",
        "desc": "Electron wrapper for YouTube Music"
      }
    ]
  },
  {
    "id": "fonts-audio",
    "title": "Fonts, Audio & Hardware",
    "icon": "font",
    "description": "Nerd Fonts, PipeWire audio graph, power management and Bluetooth.",
    "installCommand": "yay -S --needed ttf-jetbrains-mono-nerd ttf-jetbrains-mono ttf-nerd-fonts-symbols pipewire pipewire-pulse pipewire-alsa pipewire-jack wireplumber brightnessctl bluetui bluez-utils cpupower cpupower-gui tlp tlpui",
    "packages": [
      {
        "name": "ttf-jetbrains-mono-nerd",
        "desc": "JetBrains Mono patched with Nerd Fonts icons"
      },
      {
        "name": "pipewire",
        "desc": "Low-latency audio and video router"
      },
      {
        "name": "wireplumber",
        "desc": "Session / policy manager for PipeWire"
      },
      {
        "name": "brightnessctl",
        "desc": "Read and control device brightness"
      },
      {
        "name": "cpupower-gui",
        "desc": "GUI utility to change CPU frequency scaling"
      },
      {
        "name": "tlp",
        "desc": "Advanced Linux power management tool"
      },
      {
        "name": "bluetui",
        "desc": "TUI for Managing Bluetooth"
      }
    ]
  }
];

export const FULL_INSTALL_COMMAND = `yay -S --needed \
  hyprland hyprlock hyprpaper hyprpolkitagent hyprshot waybar-git fuzzel dunst clipse waypaper syspower \
  kitty fish btop-git lazygit neovim-git ripgrep fd glow fastfetch s-tui-git \
  base-devel git docker-compose dotnet-sdk-8.0 dotnet-sdk-9.0 visual-studio-code-bin \
  cmake ninja gcc gdb python-uv \
  google-chrome discord obsidian nautilus gwenview mpv remmina rustdesk-bin pavucontrol nordvpn-bin \
  ttf-jetbrains-mono-nerd pipewire pipewire-pulse pipewire-alsa pipewire-jack wireplumber brightnessctl tlp`;
