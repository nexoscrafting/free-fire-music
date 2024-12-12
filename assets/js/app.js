// DOM Elements
const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const progress = document.getElementById('progress');
const play = document.getElementById('play');

// Song Data
const songs = [
  {
    title: 'FF SONGS - THEME',
    artist: 'GARENA FREE FIRE',
    coverPath: './../images/track0.jpg',
    discPath: './../music/track0.mp3',
  },
  {
    title: '3rd ANNIVERSARY - THEME',
    artist: 'GARENA FREE FIRE',
    coverPath: './../images/track1.jfif',
    discPath: './../music/FREE_FIRE_3rd_ANNIVERSARY_THEME.mp3',
  },
  // More songs...
];

// Load the given song
export function loadSong(songIndex) {
  const song = songs[songIndex];
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;

  // Update duration when the disc is ready to play
  disc.addEventListener('canplaythrough', () => {
    const dur = disc.duration;
    const mins = Math.floor(dur / 60).toString().padStart(2, '0');
    const sec = Math.floor(dur % 60).toString().padStart(2, '0');
    duration.textContent = `${mins}:${sec}`;
  });
}

// Toggle play and pause
export function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
  updatePlayPauseIcon();
}

// Update play/pause icon
function updatePlayPauseIcon() {
  const playIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#e7e5e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 18V6l8 6-8 6Z"/></svg>`;
  const pauseIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#e7e5e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`;
  play.innerHTML = disc.paused ? playIcon : pauseIcon;
}

// Update progress bar
export function updateProgress() {
  const width = (disc.currentTime / disc.duration) * 100 + '%';
  progress.style.width = width;

  const minutes = Math.floor(disc.currentTime / 60);
  const seconds = Math.floor(disc.currentTime % 60).toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

// Go to the previous song
export function gotoPreviousSong() {
  songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1;
  loadSong(songIndex);
  if (!disc.paused) disc.play();
}

// Go to the next song
export function gotoNextSong() {
  songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
  loadSong(songIndex);
  if (!disc.paused) disc.play();
}

// Set song progress
export function setProgress(ev) {
  const totalWidth = progressContainer.clientWidth;
  const clickWidth = ev.offsetX;
  disc.currentTime = (clickWidth / totalWidth) * disc.duration;
}
