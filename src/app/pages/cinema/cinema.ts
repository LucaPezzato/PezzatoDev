import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PezGhostBackground } from '../../components/ghost-background/ghost-background';
import { MOVIE_REVIEWS, MovieReview } from '../../data/cinema-data';

@Component({
  selector: 'pez-cinema',
  standalone: true,
  imports: [CommonModule, PezGhostBackground],
  templateUrl: './cinema.html',
  styleUrl: './cinema.css'
})
export class PezCinema {
  movies = signal<MovieReview[]>(MOVIE_REVIEWS);

  searchQuery = signal<string>('');
  selectedGenre = signal<string>('all');
  selectedRating = signal<number>(0);
  sortBy = signal<'watchDate-desc' | 'watchDate-asc' | 'rating-desc' | 'year-desc'>('watchDate-desc');
  viewMode = signal<'grid' | 'list'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'list' : 'grid'
  );

  selectedMovie = signal<MovieReview | null>(null);
  copiedState = signal<string | null>(null);

  // Parallax Background
  bgParallaxX = signal<number>(0);
  bgParallaxY = signal<number>(0);
  cursorX = signal<number>(-1000);
  cursorY = signal<number>(-1000);

  // Computed statistics
  stats = computed(() => {
    const list = this.movies();
    const total = list.length;
    if (total === 0) return { total: 0, avgRating: '0.0', favorites: 0, topGenre: '-' };

    const sumRating = list.reduce((acc, m) => acc + m.rating, 0);
    const avg = (sumRating / total).toFixed(1);
    const favs = list.filter((m) => m.favorite).length;

    // Top Genre calculation
    const genreCounts: { [key: string]: number } = {};
    list.forEach((m) => {
      m.genres.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });
    const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
    const topGenre = sortedGenres[0] ? sortedGenres[0][0] : '-';

    return {
      total,
      avgRating: avg,
      favorites: favs,
      topGenre
    };
  });

  // Extract all unique genres
  allGenres = computed(() => {
    const set = new Set<string>();
    this.movies().forEach((m) => m.genres.forEach((g) => set.add(g)));
    return Array.from(set).sort();
  });

  // Filtered & Sorted Movie Reviews
  filteredMovies = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const genre = this.selectedGenre();
    const minRating = this.selectedRating();
    const sort = this.sortBy();

    let result = this.movies().filter((m) => {
      // Search text match
      const matchSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q)) ||
        m.year.toString().includes(q) ||
        m.review.toLowerCase().includes(q) ||
        (m.tags && m.tags.some((t) => t.toLowerCase().includes(q)));

      // Genre match
      const matchGenre = genre === 'all' || m.genres.includes(genre);

      // Rating match
      const matchRating = minRating === 0 || m.rating >= minRating;

      return matchSearch && matchGenre && matchRating;
    });

    // Sorting
    return result.sort((a, b) => {
      switch (sort) {
        case 'watchDate-desc':
          if (a.watchDate && b.watchDate) {
            return new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime();
          }
          if (a.watchDate && !b.watchDate) return -1;
          if (!a.watchDate && b.watchDate) return 1;
          return b.year - a.year;
        case 'watchDate-asc':
          if (a.watchDate && b.watchDate) {
            return new Date(a.watchDate).getTime() - new Date(b.watchDate).getTime();
          }
          if (a.watchDate && !b.watchDate) return 1;
          if (!a.watchDate && b.watchDate) return -1;
          return a.year - b.year;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'year-desc':
          return b.year - a.year;
        default:
          return 0;
      }
    });
  });

  // Pagination
  pageSize = signal<number>(50);
  currentPage = signal<number>(1);

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredMovies().length / this.pageSize())));

  paginatedMovies = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filteredMovies().slice(start, start + size);
  });

  showingRange = computed(() => {
    const total = this.filteredMovies().length;
    if (total === 0) return { start: 0, end: 0, total: 0 };
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size + 1;
    const end = Math.min(page * size, total);
    return { start, end, total };
  });

  pageNumbers = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  onSearch(val: string) {
    this.searchQuery.set(val);
    this.currentPage.set(1);
  }

  setGenre(genre: string) {
    this.selectedGenre.set(genre);
    this.currentPage.set(1);
  }

  setRating(rating: number) {
    this.selectedRating.set(rating);
    this.currentPage.set(1);
  }

  setSort(sort: 'watchDate-desc' | 'watchDate-asc' | 'rating-desc' | 'year-desc') {
    this.sortBy.set(sort);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      if (typeof window !== 'undefined') {
        const anchor = document.getElementById('films-grid-anchor');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }
      }
    }
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  openDetail(movie: MovieReview) {
    this.selectedMovie.set(movie);
  }

  closeDetail() {
    this.selectedMovie.set(null);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  getStarArray(rating: number): { full: boolean; half: boolean; empty: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push({ full: true, half: false, empty: false });
      } else if (rating >= i - 0.5) {
        stars.push({ full: false, half: true, empty: false });
      } else {
        stars.push({ full: false, half: false, empty: true });
      }
    }
    return stars;
  }

  copyJsonSnippet(obj: any, label: string) {
    const text = JSON.stringify(obj, null, 2);
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

    this.bgParallaxX.set((mouseX / (winW / 2)) * 30);
    this.bgParallaxY.set((mouseY / (winH / 2)) * 30);
    this.cursorX.set(event.clientX);
    this.cursorY.set(event.clientY);
  }

  onMouseLeave() {
    this.bgParallaxX.set(0);
    this.bgParallaxY.set(0);
    this.cursorX.set(-1000);
    this.cursorY.set(-1000);
  }
}
