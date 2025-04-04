const projectItems = document.querySelectorAll('.project-item');
const iframe = document.getElementById('project-frame');
const browser = document.getElementById('browser-frame');
const header = document.getElementById('browser-header');
const minusButton = document.getElementById('minsize-button');
const fullscreenbutton = document.getElementById('fullscreen-button');

const backButton = document.querySelector('.fa-arrow-left').parentElement;
const forwardButton = document.querySelector('.fa-arrow-right').parentElement;
let history = [];
let historyIndex = -1;
let browserState = 'normal'; // Tracks the current state: 'normal', 'fullscreen', or 'minimized'

function updateButtonStates(activeButton) {
  const buttons = [fullscreenbutton, minusButton];
  buttons.forEach(button => {
    if (button === activeButton) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function minusb() {
  const headerHeight = header.offsetHeight;

  if (browserState === 'fullscreen') {
    document.exitFullscreen();
  }

  if (browserState === 'minimized') {
    browser.style.height = '500px';
    browserState = 'normal';
    updateButtonStates(null); // No active button
  } else {
    browser.style.height = `${4 + headerHeight}px`;
    header.style.borderRadius = "12px";
    browserState = 'minimized';
    updateButtonStates(minusButton); // Set minimize button as active
  }
}

function expandb() {
  const headerHeight = header.offsetHeight;
  browser.style.height = `${500 + headerHeight}px`;
}

function closeb() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  projectItems.forEach(p => p.classList.remove('show'));
  compressFrame();
}

function fullscreen() {
  if (browserState === 'fullscreen') {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    browserState = 'normal';
    updateButtonStates(null); // No active button
  } else {
    if (browser.requestFullscreen) {
      browser.requestFullscreen();
    } else if (browser.webkitRequestFullscreen) { // Safari
      browser.webkitRequestFullscreen();
    } else if (browser.msRequestFullscreen) { // IE/Edge
      browser.msRequestFullscreen();
    } else {
      alert('Fullscreen mode is not supported on this device.');
      return;
    }
    browserState = 'fullscreen';
    updateButtonStates(fullscreenbutton); // Set fullscreen button as active
  }
}

function expandFrame(url, projectName) {
  iframe.src = url;
  const headerHeight = header.offsetHeight;
  browser.style.height = "500px";
  header.style.display = 'flex';
  document.querySelector('.url-input').value = `https://${projectName}.in`;
}

function compressFrame() {
  browser.style.height = '0px';
  header.style.display = 'none';
}

function updateHistory(url) {
  if (historyIndex === -1 || history[historyIndex] !== url) {
    history = history.slice(0, historyIndex + 1);
    history.push(url);
    historyIndex++;
    updateNavigationButtons();
  }
}

function navigateHistory(direction) {
  if (direction === 'back' && historyIndex > 0) {
    historyIndex--;
  } else if (direction === 'forward' && historyIndex < history.length - 1) {
    historyIndex++;
  }
  if (history[historyIndex]) {
    expandFrame(history[historyIndex]);
  }
  updateNavigationButtons();
}

function updateNavigationButtons() {
  backButton.style.display = historyIndex > 0 ? 'block' : 'none';
  forwardButton.style.display = historyIndex < history.length - 1 ? 'block' : 'none';
}

function reload() {
  iframe.contentWindow.location.reload();
}

projectItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if (item.classList.contains('show')) {
      item.classList.remove('show');
      compressFrame();
    } else {
      projectItems.forEach(p => p.classList.remove('show'));
      item.classList.add('show');
      const url = item.dataset.url;
      const projectName = item.querySelector('.project-title').textContent.replace(/\s+/g, '').toLowerCase();
      expandFrame(url, projectName);
      updateHistory(url);
    }
  });
});

if (projectItems.length > 0) {
  projectItems[0].click();
}

document.querySelector('.fa-arrow-left').addEventListener('click', () => navigateHistory('back'));
document.querySelector('.fa-arrow-right').addEventListener('click', () => navigateHistory('forward'));
compressFrame();
updateNavigationButtons();
