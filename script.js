// Select Elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button.toggle');
const volumeInput = player.querySelector('.volume');
const speedInput = player.querySelector('.playbackSpeed');
const skipButtons = player.querySelectorAll('[data-skip]');

// Toggle Play/Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Button Text
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Update Progress Bar
function handleProgress() {
  if (!video.duration) return;
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

// Control Volume
function handleVolumeChange(e) {
  video.volume = e.target.value;
}

// Control Playback Rate
function handleSpeedChange(e) {
  video.playbackRate = e.target.value;
}

// Skip Forward / Rewind
function skip(e) {
  const skipTime = parseFloat(e.currentTarget.dataset.skip);
  video.currentTime += skipTime;
}

// Drag / Click to Scrub Timeline
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volumeInput.addEventListener('input', handleVolumeChange);
volumeInput.addEventListener('change', handleVolumeChange);

speedInput.addEventListener('input', handleSpeedChange);
speedInput.addEventListener('change', handleSpeedChange);

skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);