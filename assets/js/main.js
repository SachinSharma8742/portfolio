const projectList = document.querySelector('.project-list');
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
  document.querySelectorAll('.project-item').forEach(p => p.classList.remove('show'));
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

function expandFrame(url) {
  iframe.src = url;
  browser.style.height = '500px'; // Ensure height is explicitly set
  browser.style.transition = 'height 0.3s ease'; // Add smooth transition for better UX
  header.style.display = 'flex'; // Ensure header is visible
  document.querySelector('.url-input').value = url; // Set the current URL directly
  console.log('Frame expanded with URL:', url); // Debugging log
}

function compressFrame() {
  browser.style.height = '0px'; // Collapse the frame
  browser.style.transition = 'height 0.3s ease'; // Add smooth transition for better UX
  header.style.display = 'none'; // Hide the header
  console.log('Frame compressed'); // Debugging log
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
    const currentUrl = history[historyIndex];
    expandFrame(currentUrl); // Expand the frame with the current URL
    document.querySelector('.url-input').value = currentUrl; // Update the URL input field

    // Remove 'show' class from all project items
    document.querySelectorAll('.project-item').forEach(item => item.classList.remove('show'));

    // Add 'show' class to the current project item
    const currentItem = document.querySelector(`.project-item[data-url="${currentUrl}"]`);
    if (currentItem) {
      currentItem.classList.add('show');
    }
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

function handleProjectClick(li) {
  const url = li.getAttribute('data-url');
  const projectName = li.querySelector('.project-title')?.textContent?.trim() || 'Unknown Project';
  if (li.classList.contains('show')) {
    li.classList.remove('show');
    compressFrame();
  } else {
    document.querySelectorAll('.project-item').forEach(item => item.classList.remove('show'));
    li.classList.add('show');
    expandFrame(url); // Removed encoded project name as it's not used
    updateHistory(url);

    // Scroll to the top
    window.scrollTo({ top: 200, behavior: 'smooth' });

    // Move the clicked project to the top of the list
    projectList.prepend(li);
  }
}

// Delegate click events to the parent element
projectList.addEventListener('click', (e) => {
  const item = e.target.closest('.project-item');
  if (item) {
    e.preventDefault();
    handleProjectClick(item);
  }
});

fetch('assets/json/project.json')
  .then(response => response.json())
  .then(data => {
    // Randomize the order of projects
    data.projects = data.projects.sort(() => Math.random() - 0.5);

    let projectItemsHTML = ''; // Accumulate all <li> elements as a single string

    data.projects.forEach(project => {
      projectItemsHTML += `
        <li class="project-item active ${project.show ? 'show' : ''}" 
            data-filter-item 
            data-category="${project.category}" 
            data-url="${project.url}">
            <a href="#">
                <figure class="project-img">
                    <div class="project-item-icon-box">
                        <i class="fa-regular fa-eye"></i>
                    </div>
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </figure>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-category">${project.category}</p>
            </a>
        </li>
      `;
    });

    projectList.innerHTML = projectItemsHTML; // Set all <li> elements at once
  })
  .catch(error => console.error('Error loading project data:', error));

if (document.querySelectorAll('.project-item').length > 0) {
  document.querySelectorAll('.project-item')[0].click();
}

document.querySelector('.fa-arrow-left').addEventListener('click', () => navigateHistory('back'));
document.querySelector('.fa-arrow-right').addEventListener('click', () => navigateHistory('forward'));
compressFrame();
updateNavigationButtons();
