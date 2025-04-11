// DOM Elements
const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const volup = document.getElementById('volup');
const voldown = document.getElementById('voldown');

// Initial song index
let songIndex = 0;

// Song Data
const songs = [
  {
    "title": "3RD ANNIVERSARY - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/3rd_anniversary_theme.mp3"
  },
  {
    "title": "DJ - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/dj_theme.mp3"
  },
  {
    "title": "NEW - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/new_theme.mp3"
  },
  {
    "title": "NEW WINTERLANDS - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/new_winterlands_theme.mp3"
  },
  {
    "title": "OLD HALLOWEEN - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/old_halloween_theme.mp3"
  },
  {
    "title": "OLD - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/old_theme.mp3"
  },
  {
    "title": "RAMPAGE - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/rampage_theme.mp3"
  },
  {
    "title": "SUMMERTIME - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/summertime_theme.mp3"
  },
  {
    "title": "BOOYAH - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/booyah.mp3"
  },
  {
    "title": "DEATH UPRISING - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/death_uprising.mp3"
  },
  {
    "title": "LET THE BATTLE BEGIN - THEME",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/let_the_battle_begin.mp3"
  },
  {
    "title": "ELECTRONIC GUITAR - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/electronic_guitar_lobby.mp3"
  },
  {
    "title": "ORIGINAL - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/original_lobby.mp3"
  },
  {
    "title": "WINTERLANDS I - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/winterlands_i_lobby.mp3"
  },
  {
    "title": "WINTERLANDS II - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/winterlands_ii_lobby.mp3"
  },
  {
    "title": "WORLD CUP I - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/world_cup_i_lobby.mp3"
  },
  {
    "title": "WORLD SERIES I - LOBBY",
    "artist": "GARENA FREE FIRE",
    "coverPath": "./../assets/images/track0.jpg",
    "discPath": "./../music/world_series_i_lobby.mp3"
  }
];

// Event listener to load the initial song when the window is loaded
window.addEventListener('load', function () {
  loadSong(songs[songIndex]);
});

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;

  // Update duration when the disc is ready to play
  disc.addEventListener('canplaythrough', function () {
    const dur = disc.duration;
    const mins = Math.floor(dur / 60).toString().padStart(2, '0');
    const sec = Math.floor(dur % 60).toString().padStart(2, '0');
    duration.textContent = `${mins}:${sec}`;
  });
}

// Toggle play and pause
function playPauseMedia() {
  disc.paused ? disc.play() : disc.pause();
}

// Update play/pause icon
function updatePlayPauseIcon() {
  const playIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 18V6l8 6-8 6Z"/></svg>`;
  const pauseIcon = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`;

  play.innerHTML = disc.paused ? playIcon : pauseIcon;
}

// Update progress bar
function updateProgress() {
  const width = (disc.currentTime / disc.duration) * 100 + '%';
  progress.style.width = width;

  const minutes = Math.floor(disc.currentTime / 60);
  const seconds = Math.floor(disc.currentTime % 60).toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to the previous song
function gotoPreviousSong() {
  songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1;
  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) playPauseMedia();
}

// Go to the next song
function gotoNextSong(playImmediately) {
  songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) playPauseMedia();
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  disc.currentTime = (clickWidth / totalWidth) * disc.duration;
}

// Navigate song slider
function progressSlider(ev) {
  const isPlaying = !disc.paused;
  if (isPlaying) disc.pause();

  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  disc.currentTime = (clickWidth / totalWidth) * disc.duration;

  if (isPlaying) disc.play();

  // Event listeners for mouse movement and release
  document.addEventListener('mousemove', slideMoving);
  document.addEventListener('mouseup', function () {
    if (isPlaying) disc.play();
    document.removeEventListener('mousemove', slideMoving);
  });
}

// Navigate song slider while moving
function slideMoving(ev) {
  const isPlaying = !disc.paused;
  if (isPlaying) disc.pause();

  const totalWidth = progressContainer.clientWidth;
  const clickWidth = ev.offsetX;
  disc.currentTime = (clickWidth / totalWidth) * disc.duration;

  if (isPlaying) disc.play();
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to the next song when the next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to the previous song when the previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to a different place in the song
progressContainer.addEventListener('mousedown', progressSlider);

// Volume Up and Down functions
function volumeUp() {
  if (disc.volume < 1) disc.volume += 0.1;
}

function volumeDown() {
  if (disc.volume > 0) disc.volume -= 0.1;
}

// Event listeners for volume buttons
volup.addEventListener('click', volumeUp);
voldown.addEventListener('click', volumeDown);