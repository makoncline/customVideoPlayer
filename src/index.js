const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const play = player.querySelector('.play');
const skipBtns = player.querySelectorAll('[data-skip]');
const sliders = player.querySelectorAll('.player_slider');
const fullscreen = player.querySelector('.fullscreen');

function togglePlay() {
  const action = video.paused ? 'play' : 'pause';
  video[action]();
}

function updatePlay() {
  const icon = video.paused ? '►' : '❚ ❚';
  play.textContent = icon;
}

function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleSlide() {
  video[this.name] = this.value;
}

function handleTimeUpdate() {
  const currentTime = this.currentTime / this.duration * 100;
  progressBar.style.flexBasis = `${currentTime}%`;
}

function scrub(e) {
  const time = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = time;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlay);
video.addEventListener('pause', updatePlay);

play.addEventListener('click', togglePlay);

skipBtns.forEach(btn => btn.addEventListener('click', handleSkip));

sliders.forEach(slider => slider.addEventListener('change', handleSlide));
sliders.forEach(slider => slider.addEventListener('mousemove', handleSlide));

video.addEventListener('timeupdate', handleTimeUpdate);

let mouseDown = false;
document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);

progress.addEventListener('click', (e) => scrub(e));
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));

fullscreen.addEventListener('click', () => video.requestFullscreen());