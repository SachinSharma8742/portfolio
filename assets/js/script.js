'use strict';

document.addEventListener('DOMContentLoaded', function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const skills = document.querySelectorAll('.skills');
    const cards = document.querySelectorAll('.card');
    
    skills.forEach(skill => {
      skill.addEventListener('touchstart', function (e) {
        e.preventDefault();
        skill.classList.toggle('touch-active');
      });
    });
    
    cards.forEach(card => {
      card.addEventListener('touchstart', function (e) {
        e.preventDefault();
        cards.forEach(c => {
          if (c !== card) {
            c.classList.remove("touch-active");
          }
        });
        card.classList.toggle("touch-active");
      });
    });
  } else {
    // Original non-mobile handlers
    const skills = document.querySelectorAll('.skills');
    skills.forEach(skill => {
      skill.addEventListener('touchstart', function () {
        skill.classList.add('touch-active');
      });
      skill.addEventListener('touchend', function () {
        skill.classList.remove('touch-active');
      });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function () {
        card.classList.add('touch-active');
      });
      card.addEventListener('touchend', function () {
        card.classList.remove('touch-active');
      });
    });
  }
});

// Block right-click context menu
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Disable specific key combinations
document.addEventListener('keydown', function(event) {
  const blockedCombos = [
    { ctrlKey: true, key: 's' },  // Ctrl+S
    { ctrlKey: true, key: 'u' },  // Ctrl+U
    { ctrlKey: true, key: 'p' },  // Ctrl+P
    { ctrlKey: true, key: 'c' },  // Ctrl+C
    { ctrlKey: true, key: 'a' },  // Ctrl+A
    { ctrlKey: true, key: 'i' },  // Ctrl+I
    { ctrlKey: true, key: 'j' },  // Ctrl+J
    { ctrlKey: true, key: 'k' },  // Ctrl+K
    { ctrlKey: true, key: 'h' },  // Ctrl+H
    { metaKey: true, key: 's' },  // Cmd+S
    { metaKey: true, key: 'u' },  // Cmd+U
    { metaKey: true, key: 'p' },  // Cmd+P
    { metaKey: true, key: 'c' },  // Cmd+C
    { metaKey: true, key: 'a' },  // Cmd+A
    { metaKey: true, key: 'i' },  // Cmd+I
    { metaKey: true, key: 'j' },  // Cmd+J
    { metaKey: true, key: 'k' },  // Cmd+K
    { metaKey: true, key: 'h' },  // Cmd+H
    { metaKey: true, altKey: true, key: 'i' }, // Cmd+Opt+I
    { metaKey: true, altKey: true, key: 'j' }, // Cmd+Opt+J
    { shiftKey: true, key: 'PrintScreen' } // Shift+PrintScreen
  ];

  for (let combo of blockedCombos) {
    let match = Object.keys(combo).every(k => event[k] === combo[k]);
    if (match) {
      event.preventDefault();
      return;
    }
  }
});

// Prevent text selection and copying
document.addEventListener('copy', function(event) {
  event.preventDefault();
});

// Additional measure to disable right-click on all elements
document.querySelectorAll('*').forEach(element => {
  element.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInputp');
  const searchResults = document.getElementById('searchResults');
  const noResults = document.getElementById('noResults');
  let debounceTimer;

  function debounce(func, delay) {
    return function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const projectItems = document.querySelectorAll('.project-item'); // Fetch dynamically
    let visibleCount = 0;

    projectItems.forEach(item => {
      const title = item.querySelector('.project-title').textContent.toLowerCase();
      const category = item.querySelector('.project-category').textContent.toLowerCase();

      if (title.includes(searchTerm) || category.includes(searchTerm)) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      noResults.style.display = 'flex';
    } else {
      noResults.style.display = 'none';
    }

    searchResults.textContent = visibleCount === projectItems.length ? 
      'Showing all projects' : 
      `Showing ${visibleCount} of ${projectItems.length} projects`;
  }

  const debouncedSearch = debounce(searchProjects, 300);

  searchInput.addEventListener('input', debouncedSearch);
});

// Back to top button functionality
var mybutton = document.getElementById("goToTopBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  document.addEventListener('scroll', function() {
    const scrollTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
        scrollTopButton.classList.add('active');
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.classList.remove('active');
    }
  });
}

mybutton.onclick = function() {
    scrollToTop();
}

function scrollToTop() {
    var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 10);
    }
}

// Avatar animation functions
const borderRadiusList = [
  "64% 36% 71% 29% / 30% 30% 70% 70%",
  "30% 70% 50% 50% / 50% 30% 70% 50%",
  "40% 60% 60% 40% / 40% 60% 60% 40%",
  "20% 80% 70% 30% / 60% 40% 40% 60%",
  "64% 36% 71% 29% / 30% 30% 70% 70%",
  "64% 36% 33% 67% / 65% 30% 70% 35%",
  "64% 36% 33% 67% / 65% 83% 17% 35%"
];

function applyRandomBorderRadius() {
  const randomIndex = Math.floor(Math.random() * borderRadiusList.length);
  document.querySelector(".avatar-box").style.borderRadius = borderRadiusList[randomIndex];
}

function applyRotation() {
  const randomAngle = Math.floor(Math.random() * 360);
  document.querySelector(".avatar-box").style.transform = `rotate(${randomAngle}deg)`;
  document.getElementById("avatar").style.transform = `rotate(-${randomAngle}deg)`;
  applyRandomBorderRadius();
}

// Change border-radius at regular intervals
setInterval(applyRandomBorderRadius, 3000);

// Skill progress animation
document.addEventListener('DOMContentLoaded', function() {
  const skillSection = document.querySelector('.skill');
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          bar.classList.add('animate');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillSection);
});

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Typewriter effect
const sentences = [
  "Web Developer.",
  "Video Editor.",
  "Professional Programmer.",
  "Computer Engineer."
];

const typewriterElement = document.getElementById('typewriter');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffle the sentences array
shuffle(sentences);

let sentenceIndex = 0;
let currentSentence = '';
let isDeleting = false;
const typeSpeed = 150;
const deleteSpeed = 75;
const delayBetweenSentences = 2000;

function type() {
  const fullSentence = sentences[sentenceIndex];
  if (isDeleting) {
      currentSentence = fullSentence.substring(0, currentSentence.length - 1);
  } else {
      currentSentence = fullSentence.substring(0, currentSentence.length + 1);
  }
  
  typewriterElement.innerHTML = currentSentence + "<span>│</span>";

  let speed = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && currentSentence === fullSentence) {
      speed = delayBetweenSentences;
      isDeleting = true;
  } else if (isDeleting && currentSentence === '') {
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      if (sentenceIndex === 0) shuffle(sentences);
      speed = typeSpeed;
  }

  setTimeout(type, speed);
}

type();

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterProjects(selectedValue);
  });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

function filterProjects(category) {
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (category === 'all' || itemCategory === category) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterProjects(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to load JavaScript for a specific page
function loadPageScript(pageName) {
    const script = document.createElement('script');
    script.src = `js/${pageName}.js`;
    document.body.appendChild(script);
}

// Function to handle page navigation
function navigateToPage(pageName) {
    for (let i = 0; i < pages.length; i++) {
        if (pageName === pages[i].dataset.page) {
            pages[i].classList.add("active");
            navigationLinks[i].classList.add("active");
            loadPageScript(pageName);
            applyRotation();
            window.scrollTo(0, 0);
        } else {
            pages[i].classList.remove("active");
            navigationLinks[i].classList.remove("active");
        }
    }
}

// Add event listeners to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        const pageName = this.innerHTML.toLowerCase();
        navigateToPage(pageName);
    });
}

// Load the initial page script (assuming you have a default page)
navigateToPage(pages[0].dataset.page);

// Countdown timer functionality
const targets = [
  { date: "07 Aug 2024", elementId: "days1", statusId: "status1" },
  { date: "25 Jul 2024", elementId: "days2", statusId: "status2" },
  { date: "07 Aug 2024", elementId: "days3", statusId: "status3" },
  { date: "25 Aug 2024", elementId: "days4", statusId: "status4" }
];

function countdown() {
  targets.forEach(target => {
      const targetDate = new Date(target.date);
      const currentDate = new Date();
      const totalSeconds = (targetDate - currentDate) / 1000;

      const days = Math.floor(totalSeconds / (3600 * 24));

      const element = document.getElementById(target.elementId);
      const statusElement = document.getElementById(target.statusId);

      if (totalSeconds <= 0) {
          if (element) {
              element.innerHTML = "00";
          }
          if (statusElement) {
              statusElement.innerHTML = "Completed";
              statusElement.style.backgroundColor = "limegreen";
              statusElement.style.color = 'black';
          }
      } else {
          if (element) {
              element.innerHTML = formatTime(days);
          }
          if (statusElement) {
              statusElement.innerHTML = 'In Progress     <span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>';
          }
      }
  });
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Initial call to set the countdown immediately on page load
countdown();

// Update the countdown every second
setInterval(countdown, 1000);

// Search bar toggle functionality
const searchBar = document.querySelector('.input-container');

function hidesearchbar() {
  searchBar.style.display = 'none';
  const expcontainer = document.querySelector('.container');
  expcontainer.style.display = "block";
  closeb(); 
  hideLoader();
}

function showsearchbar() {
  searchBar.style.display = 'flex'; 
  const expcontainer = document.querySelector('.container');
  expcontainer.style.display = "none";
}

// Loader functions
function showLoader() {
  const sloader = document.getElementById('loader');
  sloader.style.opacity = '1';
  sloader.style.display = 'flex';
}

function hideLoader() {
  const hloader = document.getElementById('loader');
  const projectList = document.querySelector('.project-list');
  hloader.style.opacity = '0';
  hloader.style.display = 'none';
  projectList.style.display='grid';
}

// Simulate a network request
function loadProjects() {
  showLoader();
  setTimeout(function() {
    hideLoader();
  }, 3000); // Simulate a 3-second load time
}

// File system explorer functionality
let fileSystem = [];
let currentFolder = [];
let path = [];
let currentView = 'grid';

const fileSystemElement = document.getElementById('fileSystem');
const advancedPathElement = document.getElementById('advancedPath');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const listViewBtn = document.getElementById('listViewBtn');
const gridViewBtn = document.getElementById('gridViewBtn');

async function fetchFileSystem() {
  try {
    console.log("Fetching file system...");
    const response = await fetch('https://api.npoint.io/2a7f0442599f0a78a72a');
    const data = await response.json();
    fileSystem = addSizeAndIconToItems(data.fileSystem);
    currentFolder = fileSystem;
    
    // Set initial view to grid
    fileSystemElement.className = 'grid-view';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    
    renderFileSystem(currentFolder);
    updateAdvancedPath();
  } catch (error) {
    console.error('Error fetching file system:', error);
    fileSystemElement.innerHTML = '<p>Error loading file system. Please try again later.</p>';
  }
}

function addSizeAndIconToItems(items) {
  return items.map(item => {
    if (item.type === 'folder') {
      item.icon = 'fas fa-folder';
      item.children = addSizeAndIconToItems(item.children);
    } else {
      item.icon = getFileIcon(item.name);
    }
    return item;
  });
}

function getFileIcon(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf': return 'fas fa-file-pdf';
    case 'doc': 
    case 'docx': return 'fas fa-file-word';
    case 'xls':
    case 'xlsx': return 'fas fa-file-excel';
    case 'ppt':
    case 'pptx': return 'fas fa-file-powerpoint';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif': return 'fas fa-file-image';
    case 'txt': return 'fas fa-file-alt';
    default: return 'fa-solid fa-gear';
  }
}

function renderFileSystem(folder) {
  fileSystemElement.innerHTML = '';
  fileSystemElement.className = currentView === 'grid' ? 'grid-view' : 'list-view';
  
  folder.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item', item.type);
    itemElement.setAttribute('data-filter-item', item.name.toLowerCase());
    itemElement.title = item.name;
    
    const itemContent = document.createElement('div');
    itemContent.classList.add('item-content');
    
    if (item.type === 'folder') {
      const iconElement = document.createElement('i');
      iconElement.className = item.icon;
      iconElement.classList.add('exp-icon');
      
      const nameElement = document.createElement('span');
      nameElement.classList.add('item-name');
      nameElement.textContent = item.name;
      
      itemContent.appendChild(iconElement);
      itemContent.appendChild(nameElement);
      itemElement.appendChild(itemContent);
      
      itemElement.addEventListener('click', () => {
        currentFolder = item.children;
        path.push(item);
        renderFileSystem(currentFolder);
        updateAdvancedPath();
        backBtn.classList.remove('hidden');
      });
    } else {
      const linkElement = document.createElement('a');
      linkElement.href = item.url;
      linkElement.target = '_blank';
      linkElement.classList.add('file-link');
      
      const iconElement = document.createElement('i');
      iconElement.className = item.icon;
      iconElement.classList.add('exp-icon');
      
      const nameElement = document.createElement('span');
      nameElement.classList.add('item-name');
      nameElement.textContent = item.name;
      
      linkElement.appendChild(iconElement);
      linkElement.appendChild(nameElement);
      itemContent.appendChild(linkElement);
      itemElement.appendChild(itemContent);
    }
    
    fileSystemElement.appendChild(itemElement);
  });
}

function updateAdvancedPath() {
  advancedPathElement.innerHTML = '';
  
  const homeLink = document.createElement('span');
  homeLink.textContent = 'Home';
  homeLink.classList.add('path-link');
  homeLink.addEventListener('click', () => navigateTo(0));
  advancedPathElement.appendChild(homeLink);

  path.forEach((folder, index) => {
    const separator = document.createElement('span');
    separator.textContent = ' > ';
    advancedPathElement.appendChild(separator);

    const folderLink = document.createElement('span');
    folderLink.textContent = folder.name;
    folderLink.classList.add('path-link');
    folderLink.addEventListener('click', () => navigateTo(index + 1));
    advancedPathElement.appendChild(folderLink);
  });
}

function navigateTo(index) {
  if (index === 0) {
    currentFolder = fileSystem;
    path = [];
  } else {
    path = path.slice(0, index);
    currentFolder = fileSystem;
    for (const folder of path) {
      currentFolder = currentFolder.find(item => item.name === folder.name && item.type === 'folder').children;
    }
  }
  renderFileSystem(currentFolder);
  updateAdvancedPath();
  backBtn.classList.toggle('hidden', index === 0);
}

function sortItems(items, sortBy) {
  return items.sort((a, b) => {
    if (sortBy === 'type') {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'folder' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}

function filefilterItems(items, searchTerm) {
  return items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.type === 'folder' && filefilterItems(item.children, searchTerm).length > 0)
  );
}

backBtn.addEventListener('click', () => {
  if (path.length > 0) {
    path.pop();
    navigateTo(path.length);
  }
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  const filteredItems = filefilterItems(currentFolder, searchTerm);
  renderFileSystem(filteredItems);
});

sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value;
  currentFolder = sortItems(currentFolder, sortBy);
  renderFileSystem(currentFolder);
});

listViewBtn.addEventListener('click', () => {
  currentView = 'list';
  fileSystemElement.className = 'list-view';
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
  renderFileSystem(currentFolder);
});

gridViewBtn.addEventListener('click', () => {
  currentView = 'grid';
  fileSystemElement.className = 'grid-view';
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
  renderFileSystem(currentFolder);
});

// Chat bot toggle functionality
function showbot() {
  var botbox = document.querySelectorAll('.botbox');
  var button = document.getElementById('botToggle');
  var showIcon = button.querySelector('.fa-robot');
  var hideIcon = button.querySelector('.fa-times');
  
  // Disable click for 1 second
  button.style.pointerEvents = 'none';
  
  botbox.forEach(function(botbox) {
    const ibot = document.getElementById('ibot');

    if (botbox.style.display === "flex" || botbox.style.display === " ") {
      // Hide the botbox
      botbox.classList.remove('expand');
      botbox.classList.add('collapsed');
      botbox.style.display = "block";
      botbox.style.width = "40px";
      botbox.style.maxHeight = '5px';

      setTimeout(function() {
        botbox.style.position = "absolute";
      }, 500);
      
      setTimeout(function() {
        botbox.classList.remove('collapsed');
        botbox.style.backgroundColor = "black";
      }, 1000);
      
      // Switch icons
      showIcon.style.display = "inline-block";
      hideIcon.style.display = "none";
      ibot.style.opacity = "0";
    } else {
      botbox.classList.remove('collapsed');
      botbox.classList.add('expand');
      // Show the botbox
      botbox.style.display = "flex";
      botbox.style.width = "100%";
      botbox.style.height = '50vh';
      botbox.style.maxHeight='350px';
      botbox.style.position = "relative";
      
      setTimeout(function() {
        ibot.style.opacity = "1";
      }, 1000);

      // Switch icons
      showIcon.style.display = "none";
      hideIcon.style.display = "inline-block";
      // Scroll to the top of the page smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });

  setTimeout(function() {
    button.style.pointerEvents = 'auto';
  }, 1000);
}

// Social links loader function
function loadSocialLinks() {
  const socialList = document.querySelector(".social-list");
  const loader = document.querySelector(".loader");
  
  function renderSocialLinks(data) {
    console.log(data.socialLinks);
    data.socialLinks.map(link => {
      socialList.innerHTML = socialList.innerHTML + 
        `<li class="social-item">
          <a href="${link.linkUrl}" target="_blank" class="social-link">
            <i class="fa-brands fa-${link.linkName.toLowerCase()}"></i>

          </a>
        </li>`;
    });
  }
  
  function fetchSocialLinks() {
    loader.style.display = "block";
    fetch("https://api.npoint.io/2a7f0442599f0a78a72a")
      .then(response => response.json())
      .then(data => {
        loader.style.display = 'none';
        socialList.style.display = "flex";
        renderSocialLinks(data);
      });
  }
  
  fetchSocialLinks();
}

// Initial setup
fetchFileSystem();

// Load projects and social links when the page is loaded
window.onload = function() {
  var botbox = document.querySelectorAll('.botbox');
  botbox.forEach(function(botbox) {
    botbox.style.display = "block";
  });
  loadProjects();
  loadSocialLinks();
};