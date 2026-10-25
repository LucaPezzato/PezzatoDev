export interface MovieReview {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  director: string;
  genres: string[];
  durationMinutes?: number;
  posterUrl: string;
  backdropUrl?: string;
  watchDate: string; // YYYY-MM-DD (can be empty string if not logged with date)
  rating: number; // 1 to 5
  review: string;
  favorite?: boolean;
  imdbUrl?: string;
  tags?: string[];
}

export const MOVIE_REVIEWS: MovieReview[] = [
  {
    "id": "clayface-2026",
    "title": "Clayface",
    "year": 2026,
    "director": "James Watkins",
    "genres": [
      "Horror",
      "Thriller",
      "Fantascienza"
    ],
    "durationMinutes": 109,
    "posterUrl": "https://image.tmdb.org/t/p/w500/t6snh7pOxNjqs5rwP28TZmTQ0Ul.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/uL4cIrNi2uaUnWIOQQ28EVnkETG.jpg",
    "imdbUrl": "https://www.imdb.com/title/tt34890576/",
    "rating": 4,
    "watchDate": "2026-10-25",
    "favorite": true,
    "review": "Visione cinematografica notevole."
  },
  {
    "id": "l-estranea-2026",
    "title": "L'estranea",
    "year": 2026,
    "director": "Paolo Strippoli",
    "genres": [
      "Dramma",
      "Thriller"
    ],
    "durationMinutes": 115,
    "posterUrl": "https://image.tmdb.org/t/p/w500/6GisyPsQBvnpgMKXqtPuwJqpZzl.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/jsnatGViKLWlW3iqr2wrZNWSrRB.jpg",
    "imdbUrl": "https://www.imdb.com/title/tt23411728/",
    "rating": 4,
    "watchDate": "2026-10-19",
    "favorite": false,
    "review": "Visione cinematografica notevole."
  },
  {
    "id": "spider-man-brand-new-day-2026",
    "title": "Spider-Man: Brand New Day",
    "year": 2026,
    "director": "Destin Daniel Cretton",
    "genres": [
      "Fantascienza",
      "Azione",
      "Avventura"
    ],
    "durationMinutes": 144,
    "posterUrl": "https://image.tmdb.org/t/p/w500/vKHjwe9tSPWSkiv3m8Iq1nVedOT.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg",
    "watchDate": "2026-08-07",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt22084616/"
  },
  {
    "id": "the-odyssey-2026",
    "title": "Odissea",
    "originalTitle": "The Odyssey",
    "year": 2026,
    "director": "Christopher Nolan",
    "genres": [
      "Avventura",
      "Azione",
      "Fantasy"
    ],
    "durationMinutes": 173,
    "posterUrl": "https://image.tmdb.org/t/p/w500/qQhInj9fw3S2bMbiEujVldthgKe.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/RMXG8myu1aGlNUsRjtxzmpdMK0.jpg",
    "watchDate": "2026-07-29",
    "rating": 5,
    "favorite": true,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt33764258/"
  },
  {
    "id": "the-dark-knight-2008",
    "title": "Il cavaliere oscuro",
    "originalTitle": "The Dark Knight",
    "year": 2008,
    "director": "Christopher Nolan",
    "genres": [
      "Azione",
      "Crime",
      "Thriller"
    ],
    "durationMinutes": 146,
    "posterUrl": "https://image.tmdb.org/t/p/w500/qIhsgno1mjbzUbs4H6DaRjhskAR.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    "watchDate": "2026-07-21",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0468569/"
  },
  {
    "id": "batman-begins-2005",
    "title": "Batman Begins",
    "year": 2005,
    "director": "Christopher Nolan",
    "genres": [
      "Dramma",
      "Crime",
      "Azione"
    ],
    "durationMinutes": 140,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2eNeMwCncDvcJZ4AqKndWX71wDc.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/9IIBboV7MCT0bTxzXHmWK1Hq558.jpg",
    "watchDate": "2026-07-19",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0372784/"
  },
  {
    "id": "disclosure-day-2026",
    "title": "Disclosure Day",
    "year": 2026,
    "director": "Steven Spielberg",
    "genres": [
      "Fantascienza",
      "Thriller"
    ],
    "durationMinutes": 147,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2HfLCkrCc7mnT15lp8tfZag1a9L.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/flxau5Iu7bChQHsESqvGZ3FQRaI.jpg",
    "watchDate": "2026-06-28",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt15047880/"
  },
  {
    "id": "obsession-2026",
    "title": "Obsession",
    "year": 2026,
    "director": "Curry Barker",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 110,
    "posterUrl": "https://image.tmdb.org/t/p/w500/KUzJSsW6pFy1Dbw7rp1PKrzvfL.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rZfmzpixLKLR3Hg2u0WgC7XLFl8.jpg",
    "watchDate": "2026-05-24",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt37287335/"
  },
  {
    "id": "project-hail-mary-2026",
    "title": "L'ultima missione: Project Hail Mary",
    "originalTitle": "Project Hail Mary",
    "year": 2026,
    "director": "Phil Lord",
    "genres": [
      "Fantascienza",
      "Avventura"
    ],
    "durationMinutes": 156,
    "posterUrl": "https://image.tmdb.org/t/p/w500/xfwpfBtZ255ceVKEj2CK7mmYjF6.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
    "watchDate": "2026-03-28",
    "rating": 5,
    "favorite": true,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt12042730/"
  },
  {
    "id": "avatar-fire-and-ash-2025",
    "title": "Avatar: Fuoco e cenere",
    "originalTitle": "Avatar: Fire and Ash",
    "year": 2025,
    "director": "James Cameron",
    "genres": [
      "Fantascienza",
      "Avventura",
      "Fantasy"
    ],
    "durationMinutes": 197,
    "posterUrl": "https://image.tmdb.org/t/p/w500/xxiIVbzr9YCfKTftTqN3mojUkKM.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/sdZSjtGUTSN8B3al5o0f2WoQfQQ.jpg",
    "watchDate": "2026-01-04",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt1757678/"
  },
  {
    "id": "thunderbolts-2025",
    "title": "Thunderbolts*",
    "year": 2025,
    "director": "Jake Schreier",
    "genres": [
      "Azione",
      "Fantascienza",
      "Avventura"
    ],
    "durationMinutes": 126,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2q16SeTsXCgigsl8uV85qDN4375.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    "watchDate": "2025-05-04",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt20969586/"
  },
  {
    "id": "eden-2025",
    "title": "Eden",
    "year": 2025,
    "director": "Ron Howard",
    "genres": [
      "Thriller",
      "Dramma"
    ],
    "durationMinutes": 129,
    "posterUrl": "https://image.tmdb.org/t/p/w500/cDxaT5GdB8uOcbW57Vi5XkeAUAf.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rz8NcfTRczvn94vpnmMx42zt6EC.jpg",
    "watchDate": "2025-04-17",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt23149780/"
  },
  {
    "id": "a-minecraft-movie-2025",
    "title": "Un film Minecraft",
    "originalTitle": "A Minecraft Movie",
    "year": 2025,
    "director": "Jared Hess",
    "genres": [
      "Famiglia",
      "Fantasy",
      "Commedia",
      "Avventura"
    ],
    "durationMinutes": 101,
    "posterUrl": "https://image.tmdb.org/t/p/w500/myoxQxrAEZICqe3DRyJUsiE5lWS.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    "watchDate": "2025-04-12",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt3566834/"
  },
  {
    "id": "novocaine-2025",
    "title": "Mr. Morfina",
    "originalTitle": "Novocaine",
    "year": 2025,
    "director": "Dan Berk",
    "genres": [
      "Azione",
      "Commedia",
      "Thriller"
    ],
    "durationMinutes": 110,
    "posterUrl": "https://image.tmdb.org/t/p/w500/gzHJSn8I1QxGScttymjbTifloN0.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/lyBH2mFFU6qrHwD5QKotL2JnEb6.jpg",
    "watchDate": "2025-04-02",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt29603959/"
  },
  {
    "id": "u-s-palmese-2025",
    "title": "U.S. Palmese",
    "year": 2025,
    "director": "Marco Manetti",
    "genres": [
      "Commedia"
    ],
    "durationMinutes": 122,
    "posterUrl": "https://image.tmdb.org/t/p/w500/nQee74kx0xqpHz2BrSXZpj36P9c.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/m1ou1zoj4nrtzY8kQl0xgokZTL9.jpg",
    "watchDate": "2025-03-24",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt27614382/"
  },
  {
    "id": "straume-2024",
    "title": "Flow - Un mondo da salvare",
    "originalTitle": "Straume",
    "year": 2024,
    "director": "Gints Zilbalodis",
    "genres": [
      "Avventura",
      "Animazione",
      "Famiglia",
      "Fantasy"
    ],
    "durationMinutes": 84,
    "posterUrl": "https://image.tmdb.org/t/p/w500/v1VjlY1AFAcmpLcsBe1Exyxp8CZ.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/4XPNNt0zfZKBqxxVWaQALd57UHl.jpg",
    "watchDate": "2025-03-23",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt4772188/"
  },
  {
    "id": "mickey-17-2025",
    "title": "Mickey 17",
    "year": 2025,
    "director": "봉준호",
    "genres": [
      "Fantascienza",
      "Commedia",
      "Avventura"
    ],
    "durationMinutes": 137,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2JQBZs01ahsOiANQ7Fs8MN9zBY4.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/9PRKAdrDvAdCfg3EcApLTfzGsEt.jpg",
    "watchDate": "2025-03-16",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt12299608/"
  },
  {
    "id": "heretic-2024",
    "title": "Heretic",
    "year": 2024,
    "director": "Scott Beck",
    "genres": [
      "Thriller",
      "Horror"
    ],
    "durationMinutes": 111,
    "posterUrl": "https://image.tmdb.org/t/p/w500/y3OlFClPjqTk6FIwYyFoIZ2Vk1x.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/ag66gJCiZ06q1GSJuQlhGLi3Udx.jpg",
    "watchDate": "2025-02-27",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt28015403/"
  },
  {
    "id": "strange-darling-2024",
    "title": "Strange Darling",
    "year": 2024,
    "director": "JT Mollner",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 97,
    "posterUrl": "https://image.tmdb.org/t/p/w500/hnW0yxw7XLl9GGw4OnBrtc5582I.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/I4ofwq3XfmwXAETUs5pjubcMJ0.jpg",
    "watchDate": "2025-02-16",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt22375054/"
  },
  {
    "id": "babygirl-2024",
    "title": "Babygirl",
    "year": 2024,
    "director": "Halina Reijn",
    "genres": [
      "Romance",
      "Thriller"
    ],
    "durationMinutes": 114,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ccZAqgSFk7K7vvqAu30896eXXJ8.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/s7vWRjcfRVMW8tBIxhC3UhKxRoo.jpg",
    "watchDate": "2025-02-07",
    "rating": 1,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt30057084/"
  },
  {
    "id": "companion-2025",
    "title": "Companion",
    "year": 2025,
    "director": "Drew Hancock",
    "genres": [
      "Horror",
      "Fantascienza",
      "Thriller"
    ],
    "durationMinutes": 97,
    "posterUrl": "https://image.tmdb.org/t/p/w500/AbH00wyIzvwHkiBVyRXKN4Phytl.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/qA6MHDGDY0LyutjLUgFJRbPXLpW.jpg",
    "watchDate": "2025-02-03",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt26584495/"
  },
  {
    "id": "a-complete-unknown-2024",
    "title": "A Complete Unknown",
    "year": 2024,
    "director": "James Mangold",
    "genres": [
      "Dramma",
      "Musica"
    ],
    "durationMinutes": 141,
    "posterUrl": "https://image.tmdb.org/t/p/w500/lrukuw7z38D2OJhJ0iMERCcXwt2.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/otugS74HEHdca4aTCtt8HtXvPYV.jpg",
    "watchDate": "2025-01-23",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt11563598/"
  },
  {
    "id": "wolf-man-2025",
    "title": "Wolf Man",
    "year": 2025,
    "director": "Leigh Whannell",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 103,
    "posterUrl": "https://image.tmdb.org/t/p/w500/vceqBdM2070ZQ7HBYVf96gyY9Hh.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/wwARk7hRIfHfh2n2ubN6N7lvTne.jpg",
    "watchDate": "2025-01-18",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt4216984/"
  },
  {
    "id": "megalopolis-2024",
    "title": "Megalopolis",
    "year": 2024,
    "director": "Francis Ford Coppola",
    "genres": [
      "Fantascienza",
      "Dramma",
      "Fantasy"
    ],
    "durationMinutes": 138,
    "posterUrl": "https://image.tmdb.org/t/p/w500/msiKPOqYPfKJKQpKGe7oEprcx7w.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/1DHbZ1XRvdeXbD2P7W1OJbxqN9b.jpg",
    "watchDate": "2025-01-16",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt10128846/"
  },
  {
    "id": "sonic-the-hedgehog-3-2024",
    "title": "Sonic 3: Il film",
    "originalTitle": "Sonic the Hedgehog 3",
    "year": 2024,
    "director": "Jeff Fowler",
    "genres": [
      "Azione",
      "Fantascienza",
      "Commedia",
      "Famiglia"
    ],
    "durationMinutes": 110,
    "posterUrl": "https://image.tmdb.org/t/p/w500/hArbAOlNZX0qfd2Udpr6RCTflpg.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
    "watchDate": "2025-01-13",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt18259086/"
  },
  {
    "id": "io-sono-la-fine-del-mondo-2025",
    "title": "Io sono la fine del mondo",
    "year": 2025,
    "director": "Gennaro Nunziante",
    "genres": [
      "Commedia"
    ],
    "durationMinutes": 90,
    "posterUrl": "https://image.tmdb.org/t/p/w500/atxPVWn8ljVO1YX7W5xUwO6BGnM.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/ixoj53VcZnU5784MCv35zJYlQ9b.jpg",
    "watchDate": "2025-01-11",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt33306253/"
  },
  {
    "id": "nosferatu-2024",
    "title": "Nosferatu",
    "year": 2024,
    "director": "Robert Eggers",
    "genres": [
      "Horror",
      "Fantasy"
    ],
    "durationMinutes": 132,
    "posterUrl": "https://image.tmdb.org/t/p/w500/1SftujfE9iqZpGJfnREO4IBeeqV.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/2gAStVyyv9C3BSEKhP0a1aM3Qy9.jpg",
    "watchDate": "2025-01-04",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt5040012/"
  },
  {
    "id": "conclave-2024",
    "title": "Conclave",
    "year": 2024,
    "director": "Edward Berger",
    "genres": [
      "Dramma",
      "Thriller"
    ],
    "durationMinutes": 120,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ic4EM9yv6CP8lfPXcNlKTuxTT6X.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/eZzNdjNDvaSoyywy9ICg2UmFwul.jpg",
    "watchDate": "2024-12-29",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt20215234/"
  },
  {
    "id": "kraven-the-hunter-2024",
    "title": "Kraven - Il cacciatore",
    "originalTitle": "Kraven the Hunter",
    "year": 2024,
    "director": "J.C. Chandor",
    "genres": [
      "Azione",
      "Avventura",
      "Thriller"
    ],
    "durationMinutes": 127,
    "posterUrl": "https://image.tmdb.org/t/p/w500/vQZ11oQtuapB6xYgBTkM8VFAu86.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/bGGjyPqtNc8hhGkPo8W8D8t90bW.jpg",
    "watchDate": "2024-12-17",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt8790086/"
  },
  {
    "id": "trading-places-1983",
    "title": "Una poltrona per due",
    "originalTitle": "Trading Places",
    "year": 1983,
    "director": "John Landis",
    "genres": [
      "Commedia"
    ],
    "durationMinutes": 117,
    "posterUrl": "https://image.tmdb.org/t/p/w500/dIrvSfnfmH9FkIYwJtCxjapRKJq.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/3FO1kbQmRlU1H6Kmn7sTfmd7mw9.jpg",
    "watchDate": "2024-12-09",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0086465/"
  },
  {
    "id": "the-strangers-chapter-1-2024",
    "title": "The Strangers - Capitolo 1",
    "originalTitle": "The Strangers: Chapter 1",
    "year": 2024,
    "director": "Renny Harlin",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 91,
    "posterUrl": "https://image.tmdb.org/t/p/w500/lJ1bqSeum24S6Y6RhZFu1BnJHN4.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/59AJ2w9tKRSbBpnxKfB5UyIg6Jf.jpg",
    "watchDate": "2024-12-01",
    "rating": 1.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt22050754/"
  },
  {
    "id": "red-one-2024",
    "title": "Uno Rosso",
    "originalTitle": "Red One",
    "year": 2024,
    "director": "Jake Kasdan",
    "genres": [
      "Azione",
      "Avventura",
      "Commedia",
      "Fantasy"
    ],
    "durationMinutes": 124,
    "posterUrl": "https://image.tmdb.org/t/p/w500/nFrFdjAiSepToRqVAAxR757WvXq.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rOmUuQEZfPXglwFs5ELLLUDKodL.jpg",
    "watchDate": "2024-11-17",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt14948432/"
  },
  {
    "id": "anora-2024",
    "title": "Anora",
    "year": 2024,
    "director": "Sean Baker",
    "genres": [
      "Dramma",
      "Commedia",
      "Romance"
    ],
    "durationMinutes": 139,
    "posterUrl": "https://image.tmdb.org/t/p/w500/fjUmU6DEt75a535pSBLUdRAmK6t.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/qvyOfwTC3qdbzkqdXWSSEMHtjBZ.jpg",
    "watchDate": "2024-11-16",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt28607951/"
  },
  {
    "id": "terrifier-3-2024",
    "title": "Terrifier 3",
    "year": 2024,
    "director": "Damien Leone",
    "genres": [
      "Horror"
    ],
    "durationMinutes": 125,
    "posterUrl": "https://image.tmdb.org/t/p/w500/h24qwvXSXIAVXsbftPhNtYEkoLg.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/bHfGHipZ32Oec94FDJO4mWs3aZ5.jpg",
    "watchDate": "2024-11-11",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt27911000/"
  },
  {
    "id": "longlegs-2024",
    "title": "Longlegs",
    "year": 2024,
    "director": "Osgood Perkins",
    "genres": [
      "Crime",
      "Horror",
      "Mistero"
    ],
    "durationMinutes": 101,
    "posterUrl": "https://image.tmdb.org/t/p/w500/qrvtL5AQ0NklaOZvH275sm3RctS.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/6ToGkmqn0KG0UGGGUAC1Ww0e5CM.jpg",
    "watchDate": "2024-11-06",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt23468450/"
  },
  {
    "id": "the-substance-2024",
    "title": "The Substance",
    "year": 2024,
    "director": "Coralie Fargeat",
    "genres": [
      "Horror",
      "Fantascienza"
    ],
    "durationMinutes": 141,
    "posterUrl": "https://image.tmdb.org/t/p/w500/cWuloBih4I1Odambw67TQRuPmFl.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    "watchDate": "2024-11-03",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt17526714/"
  },
  {
    "id": "young-frankenstein-1974",
    "title": "Frankenstein Junior",
    "originalTitle": "Young Frankenstein",
    "year": 1974,
    "director": "Mel Brooks",
    "genres": [
      "Commedia"
    ],
    "durationMinutes": 101,
    "posterUrl": "https://image.tmdb.org/t/p/w500/z2kxkJeJkrHwJpSOpKcKiRqJeUW.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rsI82F7DadIQcrZyPbuwmkhN5ty.jpg",
    "watchDate": "2024-10-29",
    "rating": 5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0072431/"
  },
  {
    "id": "venom-the-last-dance-2024",
    "title": "Venom: The Last Dance",
    "year": 2024,
    "director": "Kelly Marcel",
    "genres": [
      "Fantascienza",
      "Azione",
      "Avventura"
    ],
    "durationMinutes": 110,
    "posterUrl": "https://image.tmdb.org/t/p/w500/u1WtJvvqNbN2AwUW1xdQU08MerE.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    "watchDate": "2024-10-27",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt16366836/"
  },
  {
    "id": "full-metal-jacket-1987",
    "title": "Full Metal Jacket",
    "year": 1987,
    "director": "Stanley Kubrick",
    "genres": [
      "Dramma",
      "Guerra"
    ],
    "durationMinutes": 115,
    "posterUrl": "https://image.tmdb.org/t/p/w500/91pR97t391im33z2xnm0nvxUyv9.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/3k2TRmqMjgt7tcwkYwZQdctnty3.jpg",
    "watchDate": "2024-10-21",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0093058/"
  },
  {
    "id": "smile-2-2024",
    "title": "Smile 2",
    "year": 2024,
    "director": "Parker Finn",
    "genres": [
      "Horror",
      "Musica",
      "Mistero",
      "Thriller"
    ],
    "durationMinutes": 127,
    "posterUrl": "https://image.tmdb.org/t/p/w500/z4H7lTRezsXaEjuzWmT1ztuEsb4.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/iR79ciqhtaZ9BE7YFA1HpCHQgX4.jpg",
    "watchDate": "2024-10-20",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt29268110/"
  },
  {
    "id": "the-wild-robot-2024",
    "title": "Il robot selvaggio",
    "originalTitle": "The Wild Robot",
    "year": 2024,
    "director": "Chris Sanders",
    "genres": [
      "Famiglia",
      "Animazione",
      "Fantascienza",
      "Avventura"
    ],
    "durationMinutes": 102,
    "posterUrl": "https://image.tmdb.org/t/p/w500/rTLuc7yMbrkl1V9uocfoRcjJqdm.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg",
    "watchDate": "2024-10-19",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt29623480/"
  },
  {
    "id": "never-let-go-2024",
    "title": "Never Let Go - A un passo dal male",
    "originalTitle": "Never Let Go",
    "year": 2024,
    "director": "Alexandre Aja",
    "genres": [
      "Horror"
    ],
    "durationMinutes": 101,
    "posterUrl": "https://image.tmdb.org/t/p/w500/5mjrUAIRvu1feJYCICkBafMmOGc.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/fquVJ2v5NAW96sRfFAw4vXR5zla.jpg",
    "watchDate": "2024-10-10",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt14415204/"
  },
  {
    "id": "joker-2019",
    "title": "Joker",
    "year": 2019,
    "director": "Todd Phillips",
    "genres": [
      "Crime",
      "Thriller",
      "Dramma"
    ],
    "durationMinutes": 122,
    "posterUrl": "https://image.tmdb.org/t/p/w500/y1AthYH1r2j4N4cYn2HdrEGgrnJ.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/rlay2M5QYvi6igbGcFjq8jxeusY.jpg",
    "watchDate": "2024-10-03",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt7286456/"
  },
  {
    "id": "the-terminator-1984",
    "title": "Terminator",
    "originalTitle": "The Terminator",
    "year": 1984,
    "director": "James Cameron",
    "genres": [
      "Azione",
      "Thriller",
      "Fantascienza"
    ],
    "durationMinutes": 108,
    "posterUrl": "https://image.tmdb.org/t/p/w500/3oi7iQwFwSALSsZRtAOnRX4WUPp.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/ffdqHMWkh1h9MABwIfbfRJhgFW6.jpg",
    "watchDate": "2024-10-01",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0088247/"
  },
  {
    "id": "transformers-one-2024",
    "title": "Transformers One",
    "year": 2024,
    "director": "Josh Cooley",
    "genres": [
      "Animazione",
      "Fantascienza",
      "Avventura",
      "Famiglia"
    ],
    "durationMinutes": 104,
    "posterUrl": "https://image.tmdb.org/t/p/w500/41caGYMJKZMjlwFXwsIxL1UtUN.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/cMfokHWle5lfCreoV08cbmkKv6G.jpg",
    "watchDate": "2024-09-22",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt8864596/"
  },
  {
    "id": "love-lies-bleeding-2024",
    "title": "Love Lies Bleeding",
    "year": 2024,
    "director": "Rose Glass",
    "genres": [
      "Crime",
      "Romance",
      "Thriller"
    ],
    "durationMinutes": 104,
    "posterUrl": "https://image.tmdb.org/t/p/w500/nIZx1k6a7qIGHySLC4jQcHcW8ng.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/oMiKHO3H5RixfLsiU5Vumhlp5sj.jpg",
    "watchDate": "2024-09-18",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt19637052/"
  },
  {
    "id": "speak-no-evil-2024",
    "title": "Speak No Evil - Non parlare con gli sconosciuti",
    "originalTitle": "Speak No Evil",
    "year": 2024,
    "director": "James Watkins",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 110,
    "posterUrl": "https://image.tmdb.org/t/p/w500/9FMmosKgAulpi4qe8O7iGBqFZ6v.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/1fL2S8LKxCVE9KoPRBXeagmBtex.jpg",
    "watchDate": "2024-09-13",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt27534307/"
  },
  {
    "id": "blink-twice-2024",
    "title": "Blink Twice",
    "year": 2024,
    "director": "Zoë Kravitz",
    "genres": [
      "Horror",
      "Mistero",
      "Thriller"
    ],
    "durationMinutes": 102,
    "posterUrl": "https://image.tmdb.org/t/p/w500/78z5K6xXTAWtLqpbyIJxxyaFMJi.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/NqqLef2ITlK8olXT4iFuUXFwSh.jpg",
    "watchDate": "2024-09-10",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt14858658/"
  },
  {
    "id": "the-deliverance-2024",
    "title": "The Deliverance - La redenzione",
    "originalTitle": "The Deliverance",
    "year": 2024,
    "director": "Lee Daniels",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 112,
    "posterUrl": "https://image.tmdb.org/t/p/w500/og1FteMFRInoQnlZeWqEn8XpXHh.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/qkEnklEGDFy4TRVhuHFn2DI2BP6.jpg",
    "watchDate": "",
    "rating": 1.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt4196566/"
  },
  {
    "id": "alien-romulus-2024",
    "title": "Alien: Romulus",
    "year": 2024,
    "director": "Fede Álvarez",
    "genres": [
      "Horror",
      "Fantascienza"
    ],
    "durationMinutes": 119,
    "posterUrl": "https://image.tmdb.org/t/p/w500/1GO52DWcqWMSIoMqUAxCBK5UIdC.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg",
    "watchDate": "",
    "rating": 5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt18412256/"
  },
  {
    "id": "borderlands-2024",
    "title": "Borderlands",
    "year": 2024,
    "director": "Eli Roth",
    "genres": [
      "Azione",
      "Fantascienza",
      "Commedia"
    ],
    "durationMinutes": 95,
    "posterUrl": "https://image.tmdb.org/t/p/w500/4NM05M9CUZZP3J2haWGLWClUB7Y.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/mKOBdgaEFguADkJhfFslY7TYxIh.jpg",
    "watchDate": "",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt4978420/"
  },
  {
    "id": "deadpool-wolverine-2024",
    "title": "Deadpool & Wolverine",
    "year": 2024,
    "director": "Shawn Levy",
    "genres": [
      "Azione",
      "Commedia",
      "Fantascienza"
    ],
    "durationMinutes": 127,
    "posterUrl": "https://image.tmdb.org/t/p/w500/tDYG0QPL54nUKDUoBPdvtsmzbBI.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg",
    "watchDate": "",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt6263850/"
  },
  {
    "id": "trap-2024",
    "title": "Trap",
    "year": 2024,
    "director": "M. Night Shyamalan",
    "genres": [
      "Crime",
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 105,
    "posterUrl": "https://image.tmdb.org/t/p/w500/yozINJIIU5rXbtlydGW43pvp5qo.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/dCgrFY6uTqhEpyhe8MzP1oExyLt.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt26753003/"
  },
  {
    "id": "twisters-2024",
    "title": "Twisters",
    "year": 2024,
    "director": "Lee Isaac Chung",
    "genres": [
      "Azione",
      "Thriller"
    ],
    "durationMinutes": 123,
    "posterUrl": "https://image.tmdb.org/t/p/w500/xEspUMrTfhXfqRTqV9wehwzzGpX.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt12584954/"
  },
  {
    "id": "fly-me-to-the-moon-2024",
    "title": "Fly Me to the Moon - Le due facce della Luna",
    "originalTitle": "Fly Me to the Moon",
    "year": 2024,
    "director": "Greg Berlanti",
    "genres": [
      "Romance",
      "Commedia"
    ],
    "durationMinutes": 132,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2N9AVh1dzBqg6pzRMUH14Vb9UiR.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/4ItXEyVPj6wb9AdhsltcqYE6f5f.jpg",
    "watchDate": "",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt1896747/"
  },
  {
    "id": "a-quiet-place-day-one-2024",
    "title": "A Quiet Place - Giorno 1",
    "originalTitle": "A Quiet Place: Day One",
    "year": 2024,
    "director": "Michael Sarnoski",
    "genres": [
      "Horror",
      "Fantascienza",
      "Thriller"
    ],
    "durationMinutes": 99,
    "posterUrl": "https://image.tmdb.org/t/p/w500/2VxStGPKuixAEdF2imhW2zcu0hD.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/6XjMwQTvnICBz6TguiDKkDVHvgS.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt13433802/"
  },
  {
    "id": "despicable-me-4-2024",
    "title": "Cattivissimo me 4",
    "originalTitle": "Despicable Me 4",
    "year": 2024,
    "director": "Chris Renaud",
    "genres": [
      "Animazione",
      "Commedia",
      "Azione",
      "Fantascienza",
      "Famiglia"
    ],
    "durationMinutes": 94,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ebG3a9AckyaOdsYNWLmOZpIhNot.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/twsxsfao6ZOVvT8LfudH603MMi6.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt7510222/"
  },
  {
    "id": "inside-out-2-2024",
    "title": "Inside Out 2",
    "year": 2024,
    "director": "Kelsey Mann",
    "genres": [
      "Animazione",
      "Avventura",
      "Commedia",
      "Famiglia"
    ],
    "durationMinutes": 97,
    "posterUrl": "https://image.tmdb.org/t/p/w500/mVkg1k4Iun40ZFiBQPFAxJHRZBu.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg",
    "watchDate": "",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt22022452/"
  },
  {
    "id": "the-exorcism-2024",
    "title": "L'esorcismo - Ultimo atto",
    "originalTitle": "The Exorcism",
    "year": 2024,
    "director": "Joshua John Miller",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 96,
    "posterUrl": "https://image.tmdb.org/t/p/w500/lCpThlATm2WAskFizpHTyzmgCIM.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/93dDAqtrFQk5zeofDtQGExPlYjC.jpg",
    "watchDate": "",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt11240348/"
  },
  {
    "id": "the-watchers-2024",
    "title": "The Watchers - Loro ti guardano",
    "originalTitle": "The Watchers",
    "year": 2024,
    "director": "Ishana Night Shyamalan",
    "genres": [
      "Fantasy",
      "Horror",
      "Mistero"
    ],
    "durationMinutes": 102,
    "posterUrl": "https://image.tmdb.org/t/p/w500/kaPZHbGYzdetYWWANjYd2alACYr.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/whnFKx0Y54Ktg6o2TiwbnQfXdZf.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt26736843/"
  },
  {
    "id": "kinds-of-kindness-2024",
    "title": "Kinds of Kindness",
    "year": 2024,
    "director": "Yórgos Lánthimos",
    "genres": [
      "Commedia",
      "Dramma",
      "Horror"
    ],
    "durationMinutes": 164,
    "posterUrl": "https://image.tmdb.org/t/p/w500/RSV4x0hTOtc9deSuvlKaAIuZVw.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/aX1P75MWK5BzjqPh8fR8HQoX27s.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt22408160/"
  },
  {
    "id": "if-2024",
    "title": "IF - Gli amici immaginari",
    "originalTitle": "IF",
    "year": 2024,
    "director": "John Krasinski",
    "genres": [
      "Commedia",
      "Fantasy",
      "Famiglia"
    ],
    "durationMinutes": 104,
    "posterUrl": "https://image.tmdb.org/t/p/w500/s35mkAIvJWdXGEtKJ8UmOU6vIQO.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt11152168/"
  },
  {
    "id": "furiosa-a-mad-max-saga-2024",
    "title": "Furiosa: A Mad Max Saga",
    "year": 2024,
    "director": "George Miller",
    "genres": [
      "Azione",
      "Fantascienza",
      "Avventura"
    ],
    "durationMinutes": 148,
    "posterUrl": "https://image.tmdb.org/t/p/w500/fMG7ALVMYT8mVY9zQyVPIFCzQnN.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
    "watchDate": "",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt12037194/"
  },
  {
    "id": "kingdom-of-the-planet-of-the-apes-2024",
    "title": "Il regno del pianeta delle scimmie",
    "originalTitle": "Kingdom of the Planet of the Apes",
    "year": 2024,
    "director": "Wes Ball",
    "genres": [
      "Fantascienza",
      "Avventura",
      "Azione"
    ],
    "durationMinutes": 145,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ppoEYACfhUkBQ2CQdZsAwz9PU1x.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/fypydCipcWDKDTTCoPucBsdGYXW.jpg",
    "watchDate": "",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt11389872/"
  },
  {
    "id": "tarot-2024",
    "title": "La profezia del male",
    "originalTitle": "Tarot",
    "year": 2024,
    "director": "Spenser Cohen",
    "genres": [
      "Horror"
    ],
    "durationMinutes": 92,
    "posterUrl": "https://image.tmdb.org/t/p/w500/5lwNeuSgDlNGVGWDeisSUFehMsz.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/otfoeC96neoOdA4HqsX06OWuzE9.jpg",
    "watchDate": "",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt14088510/"
  },
  {
    "id": "back-to-black-2024",
    "title": "Back to Black",
    "year": 2024,
    "director": "Sam Taylor-Johnson",
    "genres": [
      "Musica",
      "Storia",
      "Dramma"
    ],
    "durationMinutes": 122,
    "posterUrl": "https://image.tmdb.org/t/p/w500/3DqEdwo72R5GPSMLeNR3CJ4h9JV.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/a1m4DAmySexNaaGnjEVA2MKNUCo.jpg",
    "watchDate": "",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt21261712/"
  },
  {
    "id": "the-first-omen-2024",
    "title": "Omen - L’origine del presagio",
    "originalTitle": "The First Omen",
    "year": 2024,
    "director": "Arkasha Stevenson",
    "genres": [
      "Horror"
    ],
    "durationMinutes": 119,
    "posterUrl": "https://image.tmdb.org/t/p/w500/sSEgAaFzvKXeZdUQ1d89sky8yYU.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/mIBG74mhGEJnBubhYLkCtvplcNr.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt5672290/"
  },
  {
    "id": "challengers-2024",
    "title": "Challengers",
    "year": 2024,
    "director": "Luca Guadagnino",
    "genres": [
      "Dramma",
      "Romance"
    ],
    "durationMinutes": 132,
    "posterUrl": "https://image.tmdb.org/t/p/w500/81tKWsMg90EmFRDTlsTIE5ouKWy.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/tq8COKsI99Bivjd4CZIYVGoKcIx.jpg",
    "watchDate": "",
    "rating": 2.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt16426418/"
  },
  {
    "id": "godzilla-x-kong-the-new-empire-2024",
    "title": "Godzilla e Kong - Il nuovo impero",
    "originalTitle": "Godzilla x Kong: The New Empire",
    "year": 2024,
    "director": "Adam Wingard",
    "genres": [
      "Azione",
      "Avventura",
      "Fantascienza"
    ],
    "durationMinutes": 115,
    "posterUrl": "https://image.tmdb.org/t/p/w500/bliMVin0cfdWAwOME4G1Se4b7hq.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/gvLG3Fnznkxl4SmYfcK8gUuqxM8.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt14539740/"
  },
  {
    "id": "civil-war-2024",
    "title": "Civil War",
    "year": 2024,
    "director": "Alex Garland",
    "genres": [
      "Guerra",
      "Azione",
      "Dramma"
    ],
    "durationMinutes": 109,
    "posterUrl": "https://image.tmdb.org/t/p/w500/vST6kIlOO2fJLtkonUErSpU83pk.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/t2SXZ7KLriaLyf5QT8Iar6fSOGp.jpg",
    "watchDate": "",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt17279496/"
  },
  {
    "id": "immaculate-2024",
    "title": "Immaculate - La prescelta",
    "originalTitle": "Immaculate",
    "year": 2024,
    "director": "Michael Mohan",
    "genres": [
      "Horror",
      "Mistero",
      "Thriller"
    ],
    "durationMinutes": 89,
    "posterUrl": "https://image.tmdb.org/t/p/w500/fYUljPVdywCmOfodcZ8Ofswpx6I.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/oC198kEoJIctNCxtFYBzydKULmN.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt23137390/"
  },
  {
    "id": "the-fall-guy-2024",
    "title": "The Fall Guy",
    "year": 2024,
    "director": "David Leitch",
    "genres": [
      "Azione",
      "Commedia",
      "Romance"
    ],
    "durationMinutes": 127,
    "posterUrl": "https://image.tmdb.org/t/p/w500/nHBEuGlSUHVnkhLtN32rRVESqYo.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/2rjI2uXmjitMAaXVO21r9ao7v2j.jpg",
    "watchDate": "",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt1684562/"
  },
  {
    "id": "monkey-man-2024",
    "title": "Monkey Man",
    "year": 2024,
    "director": "Dev Patel",
    "genres": [
      "Thriller",
      "Crime",
      "Azione"
    ],
    "durationMinutes": 122,
    "posterUrl": "https://image.tmdb.org/t/p/w500/k4LPOpZN2BSHYFbbm58cbNFPAdI.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/9NSXdVHeSfSHUv49OzLispFcpz1.jpg",
    "watchDate": "",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt9214772/"
  },
  {
    "id": "dune-part-two-2024",
    "title": "Dune - Parte due",
    "originalTitle": "Dune: Part Two",
    "year": 2024,
    "director": "Denis Villeneuve",
    "genres": [
      "Fantascienza",
      "Avventura"
    ],
    "durationMinutes": 166,
    "posterUrl": "https://image.tmdb.org/t/p/w500/nhdQxDCI64rMgypYZpsF7UvbdJA.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "watchDate": "",
    "rating": 5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt15239678/"
  },
  {
    "id": "miller-s-girl-2024",
    "title": "Miller's Girl",
    "year": 2024,
    "director": "Jade Halley Bartlett",
    "genres": [
      "Thriller",
      "Dramma",
      "Romance"
    ],
    "durationMinutes": 93,
    "posterUrl": "https://image.tmdb.org/t/p/w500/ieU0zUj7WhE0GrgpgofRH0sNjbI.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/ifRqavcREHdS0FN9KtVMXghgryK.jpg",
    "watchDate": "",
    "rating": 2,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt8310486/"
  },
  {
    "id": "hit-man-2024",
    "title": "Hit Man - Killer per caso",
    "originalTitle": "Hit Man",
    "year": 2024,
    "director": "Richard Linklater",
    "genres": [
      "Commedia",
      "Romance",
      "Crime"
    ],
    "durationMinutes": 113,
    "posterUrl": "https://image.tmdb.org/t/p/w500/gLuasnE7iLAIMSH9frWTilBpD8r.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg",
    "watchDate": "",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt20215968/"
  },
  {
    "id": "anyone-but-you-2023",
    "title": "Tutti tranne te",
    "originalTitle": "Anyone but You",
    "year": 2023,
    "director": "Will Gluck",
    "genres": [
      "Romance",
      "Commedia"
    ],
    "durationMinutes": 103,
    "posterUrl": "https://image.tmdb.org/t/p/w500/uGYp6wnupgWrlVM5WmDeblXuv4y.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/j9eOeLlTGoHoM8BNUJVNyWmIvCi.jpg",
    "watchDate": "",
    "rating": 3,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt26047818/"
  },
  {
    "id": "wonka-2023",
    "title": "Wonka",
    "year": 2023,
    "director": "Paul King",
    "genres": [
      "Commedia",
      "Famiglia",
      "Fantasy"
    ],
    "durationMinutes": 117,
    "posterUrl": "https://image.tmdb.org/t/p/w500/7y2M1w0nWW0Z5Ph1XzED07OYUsa.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/uIk2g2bRkNwNywKZIhC5oIU94Kh.jpg",
    "watchDate": "",
    "rating": 4,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt6166392/"
  },
  {
    "id": "1-0-2023",
    "title": "Godzilla Minus One",
    "originalTitle": "ゴジラ-1.0",
    "year": 2023,
    "director": "Takashi Yamazaki",
    "genres": [
      "Fantascienza",
      "Horror",
      "Azione"
    ],
    "durationMinutes": 125,
    "posterUrl": "https://image.tmdb.org/t/p/w500/AhO2e2EWYYZk4zxxeynriCufixo.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/oHBhHoNe59VH6bUMazDtJmWOFSS.jpg",
    "watchDate": "",
    "rating": 4.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt23289160/"
  },
  {
    "id": "cuando-acecha-la-maldad-2023",
    "title": "When Evil Lurks",
    "originalTitle": "Cuando acecha la maldad",
    "year": 2023,
    "director": "Demián Rugna",
    "genres": [
      "Horror",
      "Thriller"
    ],
    "durationMinutes": 100,
    "posterUrl": "https://image.tmdb.org/t/p/w500/e1K5ESnTmRzj0YaUIRrIfShtTe4.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/cavK9ox37pxDg11RvJINMH63onU.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt16300962/"
  },
  {
    "id": "beetlejuice-1988",
    "title": "Beetlejuice - Spiritello porcello",
    "originalTitle": "Beetlejuice",
    "year": 1988,
    "director": "Tim Burton",
    "genres": [
      "Fantasy",
      "Commedia"
    ],
    "durationMinutes": 92,
    "posterUrl": "https://image.tmdb.org/t/p/w500/3Q4wbujboLEZQDdROySgkIDtLWg.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/yRKyJJYIzfeiVDHBe4LXguPQCvD.jpg",
    "watchDate": "",
    "rating": 3.5,
    "favorite": false,
    "review": "",
    "imdbUrl": "https://www.imdb.com/title/tt0094721/"
  }
];
