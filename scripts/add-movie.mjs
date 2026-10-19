#!/usr/bin/env node

/**
 * CLI script to automatically fetch movie metadata and poster/backdrop images from TMDb
 * and insert the new review directly into src/app/data/cinema-data.ts.
 *
 * Usage:
 *   npm run add-movie
 *   npm run add-movie "Interstellar"
 *   npm run add-movie tt0816692
 *   npm run add-movie 157336
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const ENV_FILE = path.join(ROOT_DIR, '.env');
const CINEMA_DATA_FILE = path.join(ROOT_DIR, 'src', 'app', 'data', 'cinema-data.ts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

// Colors for beautiful terminal output
const c = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

// 1. Load .env file
function loadEnv() {
  if (fs.existsSync(ENV_FILE)) {
    const lines = fs.readFileSync(ENV_FILE, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
      if (key) process.env[key.trim()] = val;
    }
  }
}

async function getApiKey() {
  loadEnv();
  let apiKey = process.env.TMDB_API_KEY || process.env.TMDB_TOKEN;

  if (!apiKey) {
    console.log(`\n${c.yellow}⚠️  Nessuna chiave API TMDb trovata in .env o nelle variabili d'ambiente.${c.reset}`);
    console.log(`${c.gray}Puoi generare una chiave gratuita su: https://www.themoviedb.org/settings/api${c.reset}\n`);
    apiKey = (await ask(`${c.cyan}Inserisci la tua API Key di TMDb: ${c.reset}`)).trim();

    if (!apiKey) {
      console.error(`${c.red}❌ Errore: API Key richiesta per scaricare le informazioni del film.${c.reset}`);
      process.exit(1);
    }

    // Save to .env
    fs.appendFileSync(ENV_FILE, `\nTMDB_API_KEY=${apiKey}\n`);
    console.log(`${c.green}✓ API Key salvata in .env (protetta da .gitignore)${c.reset}\n`);
  }

  return apiKey;
}

async function fetchFromTmdb(endpoint, apiKey) {
  const url = `https://api.themoviedb.org/3${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${apiKey}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`TMDb API error (${res.status}): ${errorText}`);
  }
  return res.json();
}

async function resolveMovie(query, apiKey) {
  const trimmed = query.trim();

  // Case 1: IMDb ID (e.g. tt0816692)
  if (/^tt\d+$/i.test(trimmed)) {
    console.log(`${c.gray}Ricerca per ID IMDb: ${trimmed}...${c.reset}`);
    const findResult = await fetchFromTmdb(`/find/${trimmed}?external_source=imdb_id`, apiKey);
    const movie = findResult.movie_results?.[0];
    if (!movie) {
      throw new Error(`Nessun film trovato per l'ID IMDb ${trimmed}`);
    }
    return fetchFromTmdb(`/movie/${movie.id}?language=it-IT&append_to_response=credits,external_ids`, apiKey);
  }

  // Case 2: Numeric TMDb ID (e.g. 157336)
  if (/^\d+$/.test(trimmed)) {
    console.log(`${c.gray}Ricerca per ID TMDb: ${trimmed}...${c.reset}`);
    return fetchFromTmdb(`/movie/${trimmed}?language=it-IT&append_to_response=credits,external_ids`, apiKey);
  }

  // Case 3: Title Search (e.g. "Interstellar" or "Dune 2")
  console.log(`${c.gray}Ricerca per titolo: "${trimmed}"...${c.reset}`);
  const searchResult = await fetchFromTmdb(`/search/movie?query=${encodeURIComponent(trimmed)}&language=it-IT`, apiKey);
  const results = searchResult.results || [];

  if (results.length === 0) {
    throw new Error(`Nessun film trovato con il titolo "${trimmed}"`);
  }

  if (results.length === 1) {
    return fetchFromTmdb(`/movie/${results[0].id}?language=it-IT&append_to_response=credits,external_ids`, apiKey);
  }

  // Multiple results: let user choose
  console.log(`\n${c.purple}🎬 Film trovati per "${trimmed}":${c.reset}`);
  results.slice(0, 6).forEach((m, idx) => {
    const year = m.release_date ? m.release_date.substring(0, 4) : 'N/D';
    console.log(`  ${c.cyan}[${idx + 1}]${c.reset} ${c.bright}${m.title}${c.reset} (${year}) - ${c.gray}${m.original_title}${c.reset}`);
  });

  const choiceStr = await ask(`\n${c.yellow}Seleziona il numero del film (1-${Math.min(results.length, 6)}) [Default 1]: ${c.reset}`);
  const choiceIdx = choiceStr ? parseInt(choiceStr, 10) - 1 : 0;
  const chosen = results[choiceIdx] || results[0];

  return fetchFromTmdb(`/movie/${chosen.id}?language=it-IT&append_to_response=credits,external_ids`, apiKey);
}

function parseMovieData(tmdbData) {
  const director = tmdbData.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Regista sconosciuto';
  const year = tmdbData.release_date ? parseInt(tmdbData.release_date.substring(0, 4), 10) : new Date().getFullYear();
  const genres = (tmdbData.genres || []).map((g) => g.name);
  const imdbId = tmdbData.external_ids?.imdb_id || tmdbData.imdb_id;

  const idSlug = (tmdbData.original_title || tmdbData.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `${idSlug}-${year}`,
    title: tmdbData.title || tmdbData.original_title,
    originalTitle: tmdbData.original_title !== tmdbData.title ? tmdbData.original_title : undefined,
    year,
    director,
    genres,
    durationMinutes: tmdbData.runtime || undefined,
    posterUrl: tmdbData.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` : '',
    backdropUrl: tmdbData.backdrop_path ? `https://image.tmdb.org/t/p/w1280${tmdbData.backdrop_path}` : undefined,
    imdbUrl: imdbId ? `https://www.imdb.com/title/${imdbId}/` : undefined
  };
}

async function main() {
  console.log(`\n${c.purple}========================================${c.reset}`);
  console.log(`${c.bright}${c.purple}  🎬 PezzatoDev - Aggiungi Recensione Film${c.reset}`);
  console.log(`${c.purple}========================================${c.reset}\n`);

  try {
    const apiKey = await getApiKey();

    let query = process.argv.slice(2).join(' ').trim();
    if (!query) {
      query = await ask(`${c.cyan}Inserisci Titolo, ID TMDb o ID IMDb (es. tt0816692 o Inception): ${c.reset}`);
    }

    if (!query.trim()) {
      console.log(`${c.red}Operazione annullata.${c.reset}`);
      rl.close();
      return;
    }

    // 1. Fetch from TMDb
    const rawData = await resolveMovie(query, apiKey);
    const movie = parseMovieData(rawData);

    console.log(`\n${c.green}✓ Film recuperato con successo:${c.reset}`);
    console.log(`  ${c.bright}Titolo:${c.reset} ${movie.title} (${movie.year})`);
    if (movie.originalTitle) console.log(`  ${c.bright}Titolo Originale:${c.reset} ${movie.originalTitle}`);
    console.log(`  ${c.bright}Regia:${c.reset} ${movie.director}`);
    console.log(`  ${c.bright}Generi:${c.reset} ${movie.genres.join(', ')}`);
    if (movie.durationMinutes) console.log(`  ${c.bright}Durata:${c.reset} ${movie.durationMinutes} min`);
    console.log(`  ${c.bright}Locandina:${c.reset} ${movie.posterUrl}`);
    console.log('');

    // 2. Interactive Questions for personal review
    const ratingStr = await ask(`${c.yellow}⭐ Voto da 1 a 5 (es. 5, 4.5, 4, 3.5, 3) [Default: 5]: ${c.reset}`);
    movie.rating = ratingStr ? parseFloat(ratingStr) : 5;

    const today = new Date().toISOString().substring(0, 10);
    const dateStr = await ask(`${c.yellow}📅 Data di visione (YYYY-MM-DD) [Default: ${today}]: ${c.reset}`);
    movie.watchDate = dateStr.trim() || today;

    const favStr = await ask(`${c.yellow}❤️ Segnare come Preferito? (s/N) [Default: n]: ${c.reset}`);
    movie.favorite = favStr.toLowerCase().startsWith('s') || favStr.toLowerCase().startsWith('y');

    console.log(`${c.yellow}📝 Scrivi la tua recensione (premi Invio per confermare):${c.reset}`);
    const reviewStr = await ask('> ');
    movie.review = reviewStr.trim() || 'Visione cinematografica notevole.';

    const tagsStr = await ask(`${c.yellow}🏷️ Tag opzionali (separati da virgola, es. IMAX, Capolavoro, Sci-Fi): ${c.reset}`);
    if (tagsStr.trim()) {
      movie.tags = tagsStr.split(',').map((t) => t.trim()).filter(Boolean);
    }

    // 3. Insert into src/app/data/cinema-data.ts
    console.log(`\n${c.gray}Aggiornamento di cinema-data.ts...${c.reset}`);
    if (!fs.existsSync(CINEMA_DATA_FILE)) {
      throw new Error(`File non trovato: ${CINEMA_DATA_FILE}`);
    }

    const fileContent = fs.readFileSync(CINEMA_DATA_FILE, 'utf-8');
    const arrayMatch = fileContent.match(/(export\s+const\s+MOVIE_REVIEWS\s*:\s*MovieReview\[\]\s*=\s*\[)([\s\S]*?)(\];)/);

    if (!arrayMatch) {
      throw new Error('Impossibile localizzare l\'array MOVIE_REVIEWS in cinema-data.ts');
    }

    const movieJson = JSON.stringify(movie, null, 2)
      .split('\n')
      .map((line, idx) => (idx === 0 ? `  ${line}` : `  ${line}`))
      .join('\n');

    const prefix = arrayMatch[1];
    const existingItems = arrayMatch[2].trim();
    const suffix = arrayMatch[3];

    const updatedArray = existingItems
      ? `${prefix}\n${movieJson},\n  ${existingItems}\n${suffix}`
      : `${prefix}\n${movieJson}\n${suffix}`;

    const newContent = fileContent.replace(arrayMatch[0], updatedArray);
    fs.writeFileSync(CINEMA_DATA_FILE, newContent, 'utf-8');

    console.log(`${c.green}🎉 Recensione aggiunta con successo a cinema-data.ts!${c.reset}`);
    console.log(`${c.cyan}Visita http://localhost:4200/cinema o esegui 'npm start' per vederla subito.${c.reset}\n`);
  } catch (err) {
    console.error(`\n${c.red}❌ Errore: ${err.message}${c.reset}\n`);
  } finally {
    rl.close();
  }
}

main();
