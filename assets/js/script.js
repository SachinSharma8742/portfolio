'use strict';

// ==================== DOM Ready Handler ====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize main content and loader
  const mainElement = document.querySelector("main");
  const loader = document.getElementById("mainloader");
  
  // Immediately show content when DOM is ready (excluding images)
  mainElement.style.opacity = "1";
  loader.style.display = "none";

  // Initialize all components
  initPageNavigation(); // universal 
  initNavLoad(); // universal 
  initCustomSelect(); // universal
  initDynamicFeatures(); // universal
  initSidebar(); // universal
  loadSocialLinks(); // universal
});

// ==================== Navigation and Last Visit ====================
function initNavLoad() {
  const sections = document.querySelectorAll('[data-page]');
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const lastVisited = localStorage.getItem('lastVisitedSection');

  if (lastVisited) {
    sections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    const targetSection = document.querySelector(`[data-page="${lastVisited}"]`);
    const targetLink = [...navLinks].find(link => link.textContent.toLowerCase() === lastVisited);

    if (targetSection) targetSection.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionName = this.textContent.toLowerCase();
      localStorage.setItem('lastVisitedSection', sectionName);

      sections.forEach(section => section.classList.remove('active'));
      navLinks.forEach(navLink => navLink.classList.remove('active'));

      const clickedSection = document.querySelector(`[data-page="${sectionName}"]`);
      if (clickedSection) clickedSection.classList.add('active');
      this.classList.add('active');
    });
  });
}

// ==================== Touch Handlers ====================
function initTouchHandlers() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const skills = document.querySelectorAll('.skills');
  const cards = document.querySelectorAll('.card');

  const touchHandler = (element, isMobile) => {
    if (isMobile) {
      element.addEventListener('touchstart', function(e) {
        e.preventDefault();
        element.classList.toggle('touch-active');
      });
    } else {
      element.addEventListener('touchstart', function() {
        element.classList.add('touch-active');
      });
      element.addEventListener('touchend', function() {
        element.classList.remove('touch-active');
      });
    }
  };

  skills.forEach(skill => touchHandler(skill, isMobile));
  cards.forEach(card => touchHandler(card, isMobile));
}

// ==================== Security Features ====================
// Block right-click context menu
document.addEventListener('contextmenu', e => e.preventDefault());

// Disable text selection and copying
document.addEventListener('copy', e => e.preventDefault());

// Additional measure to disable right-click on all elements
document.querySelectorAll('*').forEach(el => {
  el.addEventListener('contextmenu', e => e.preventDefault());
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

// ==================== Search Functionality ====================
function initSearch() {
  const searchInput = document.getElementById('searchInputp');
  const searchResults = document.getElementById('searchResults');
  const noResults = document.getElementById('noResults');
  let debounceTimer;

  const debounce = (func, delay) => {
    return function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  const searchProjects = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const projectItems = document.querySelectorAll('.project-item');
    let visibleCount = 0;

    projectItems.forEach(item => {
      const title = item.querySelector('.project-title').textContent.toLowerCase();
      const category = item.querySelector('.project-category').textContent.toLowerCase();
      const isVisible = title.includes(searchTerm) || category.includes(searchTerm);
      
      item.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
    searchResults.textContent = visibleCount === projectItems.length ? 
      'Showing all projects' : 
      `Showing ${visibleCount} of ${projectItems.length} projects`;
  };

  searchInput.addEventListener('input', debounce(searchProjects, 300));
}

// ==================== Back to Top Button ====================
var mybutton = document.getElementById("goToTopBtn");
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

function scrollToTop() {
  var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentPosition > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentPosition - currentPosition / 10);
  }
}
  window.addEventListener('scroll', scrollFunction);
  mybutton.addEventListener('click', scrollToTop);

// ==================== Dynamic Features ====================
function initDynamicFeatures() {
  // Avatar Animation
  const borderRadiusList = [
    "64% 36% 71% 29% / 30% 30% 70% 70%",
    "30% 70% 50% 50% / 50% 30% 70% 50%",
    "40% 60% 60% 40% / 40% 60% 60% 40%",
    "20% 80% 70% 30% / 60% 40% 40% 60%",
    "64% 36% 71% 29% / 30% 30% 70% 70%",
    "64% 36% 33% 67% / 65% 30% 70% 35%",
    "64% 36% 33% 67% / 65% 83% 17% 35%",
    "55% 45% 55% 45% / 60% 40% 60% 40%",
    "70% 30% 60% 40% / 50% 50% 50% 50%",
    "25% 75% 25% 75% / 40% 60% 40% 60%",
    "80% 20% 60% 40% / 30% 70% 30% 70%",
    "45% 55% 65% 35% / 55% 45% 55% 45%",
    "60% 40% 30% 70% / 70% 30% 60% 40%",
    "33% 67% 44% 56% / 62% 38% 72% 28%",
    "75% 25% 65% 35% / 45% 55% 45% 55%",
    "50% 50% 30% 70% / 60% 40% 60% 40%",
    "62% 38% 52% 48% / 45% 55% 45% 55%",
    "28% 72% 39% 61% / 64% 36% 74% 26%",
    "85% 15% 55% 45% / 35% 65% 35% 65%",
    "47% 53% 63% 37% / 57% 43% 57% 43%",
    "38% 62% 42% 58% / 68% 32% 78% 22%",
    "53% 47% 58% 42% / 49% 51% 49% 51%"
  ];

  const applyRandomBorderRadius = () => {
    const randomIndex = Math.floor(Math.random() * borderRadiusList.length);
    const randomIndex2 = Math.floor(Math.random() * borderRadiusList.length);
    document.querySelector(".avatar-box").style.borderRadius = borderRadiusList[randomIndex];
    document.querySelector(".avatar-backdrop").style.borderRadius = borderRadiusList[randomIndex2];
  };

  const applyRotation = () => {
    const randomAngle = Math.floor(Math.random() * 360);
    const randomAngle2 = Math.floor(Math.random() * 360);
    const avatarBox = document.querySelector(".avatar-box");
    const avatarBackdrop = document.querySelector(".avatar-backdrop");
    const avatar = document.getElementById("avatar");
    
    avatarBox.style.transform = `rotate(${randomAngle}deg)`;
    avatarBackdrop.style.transform = `rotate(-${randomAngle}deg)`;
    avatar.style.transform = `rotate(-${randomAngle}deg)`;
    applyRandomBorderRadius();
  };

  setInterval(applyRandomBorderRadius, 3000);
  setInterval(applyRotation, 5000);
  applyRotation();
  applyRandomBorderRadius();

  // Typewriter Effect
  const sentences = [
    "Web Developer.",
    "Video Editor.",
    "Professional Programmer.",
    "Computer Engineer."
  ];

  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const shuffle = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    shuffle(sentences);

    let sentenceIndex = 0;
    let currentSentence = '';
    let isDeleting = false;
    const typeSpeed = 150;
    const deleteSpeed = 75;
    const delayBetweenSentences = 2000;

    const type = () => {
      const fullSentence = sentences[sentenceIndex];
      
      currentSentence = isDeleting 
        ? fullSentence.substring(0, currentSentence.length - 1)
        : fullSentence.substring(0, currentSentence.length + 1);
      
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
    };

    type();
  }

  // Social Links Loader
  const socialList = document.querySelector(".social-list");
  const loader = document.querySelector(".loader");
  
  if (socialList) {
    const renderSocialLinks = data => {
      socialList.innerHTML = data.socialLinks.map(link => `
        <li class="social-item">
          <a href="${link.linkUrl}" target="_blank" class="social-link">
            <i class="fa-brands fa-${link.linkName.toLowerCase()}"></i>
          </a>
        </li>
      `).join('');
    };
    
    const fetchSocialLinks = async () => {
      loader.style.display = "block";
      try {
        const response = await fetch("https://api.npoint.io/2a7f0442599f0a78a72a");
        const data = await response.json();
        loader.style.display = 'none';
        socialList.style.display = "flex";
        renderSocialLinks(data);
      } catch (error) {
        console.error('Error fetching social links:', error);
        loader.style.display = 'none';
      }
    };
    
    fetchSocialLinks();
  }
}

// ==================== Skills Observer ====================
function initSkillsObserver() {
  const skillSection = document.querySelector('.skill');
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  
  if (!skillSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
          bar.classList.add('animate');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(skillSection);
}

// ==================== Sidebar Toggle ====================
function initSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  
  const elementToggleFunc = elem => elem.classList.toggle("active");
  
  sidebarBtn?.addEventListener("click", () => elementToggleFunc(sidebar));
}

// ==================== Custom Select ====================
function initCustomSelect() {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  select?.addEventListener("click", () => select.classList.toggle("active"));

  selectItems.forEach(item => {
    item.addEventListener("click", function() {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      select.classList.toggle("active");
      filterProjects(selectedValue);
    });
  });

  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(btn => {
    btn.addEventListener("click", function() {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterProjects(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

function filterProjects(category) {
  document.querySelectorAll('.project-item').forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    item.style.display = (category === 'all' || itemCategory === category) ? '' : 'none';
  });
}

// ==================== Contact Form ====================
function initContactForm() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      form.checkValidity() 
        ? formBtn.removeAttribute("disabled")
        : formBtn.setAttribute("disabled", "");
    });
  });
}

// ==================== Page Navigation ====================
function initPageNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  const initializePageFunctions = pageName => {
    switch (pageName) {
      case 'home':
        if (!window.homeInitialized) {
          initTouchHandlers();
          initCountdown();
          window.homeInitialized = true;
        }
        break;
      case 'project':
        if (!window.projectInitialized) {
          initSearch();
          initFileExplorer();
          loadProjects();
          window.projectInitialized = true;
        }
        break;
      case 'about':
        if (!window.aboutInitialized) {
          initSkillsObserver();
          window.aboutInitialized = true;
        }
        break;
      case 'contact':
        if (!window.contactInitialized) {
          initContactForm();
          window.contactInitialized = true;
        }
        break;
      default:
        console.warn(`No initialization functions defined for page: ${pageName}`);
    }
  };

  const navigateToPage = pageName => {
    pages.forEach((page, i) => {
      const isActive = pageName === page.dataset.page;
      page.classList.toggle("active", isActive);
      navigationLinks[i]?.classList.toggle("active", isActive);

      if (isActive) {
        initializePageFunctions(pageName); // Initialize functions only when the section is active
        window.scrollTo(0, 0); // Scroll to the top of the page
      }
    });
  };

  navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const pageName = link.innerHTML.toLowerCase();
      navigateToPage(pageName);
    });
  });

  // Load the initial page script and initialize functions
  const lastVisited = localStorage.getItem('lastVisitedSection') || pages[0]?.dataset.page;
  if (lastVisited) navigateToPage(lastVisited);
}

// ==================== Countdown Timer ====================
function initCountdown() {
  const targets = [
    { date: "07 Aug 2024", elementId: "days1", statusId: "status1" },
    { date: "25 Jul 2024", elementId: "days2", statusId: "status2" },
    { date: "07 Aug 2024", elementId: "days3", statusId: "status3" },
    { date: "25 Aug 2024", elementId: "days4", statusId: "status4" }
  ];

  const countdown = () => {
    targets.forEach(target => {
      const element = document.getElementById(target.elementId);
      const statusElement = document.getElementById(target.statusId);
      if (!element || !statusElement) return;

      const targetDate = new Date(target.date);
      const currentDate = new Date();
      const totalSeconds = (targetDate - currentDate) / 1000;
      const days = Math.floor(totalSeconds / (3600 * 24));

      if (totalSeconds <= 0) {
        element.innerHTML = "00";
        statusElement.innerHTML = "Completed";
        statusElement.style.backgroundColor = "limegreen";
        statusElement.style.color = 'black';
      } else {
        element.innerHTML = days < 10 ? `0${days}` : days;
        statusElement.innerHTML = 'In Progress     <span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>';
      }
    });
  };

  countdown();
  setInterval(countdown, 1000);
}

// ==================== File Explorer ====================
function initFileExplorer() {
  let fileSystem = [];
  let path = [];
  let currentView = 'grid';

  const fileSystemElement = document.getElementById('fileSystem');
  const advancedPathElement = document.getElementById('advancedPath');
  const backBtn = document.getElementById('backBtn');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const listViewBtn = document.getElementById('listViewBtn');
  const gridViewBtn = document.getElementById('gridViewBtn');

  if (!fileSystemElement) return;

  const getFileIcon = fileName => {
    const extension = fileName.split('.').pop().toLowerCase();
    const icons = {
      pdf: 'fas fa-file-pdf',
      doc: 'fas fa-file-word',
      docx: 'fas fa-file-word',
      xls: 'fas fa-file-excel',
      xlsx: 'fas fa-file-excel',
      ppt: 'fas fa-file-powerpoint',
      pptx: 'fas fa-file-powerpoint',
      jpg: 'fas fa-file-image',
      jpeg: 'fas fa-file-image',
      png: 'fas fa-file-image',
      gif: 'fas fa-file-image',
      txt: 'fas fa-file-alt'
    };
    return icons[extension] || 'fa-solid fa-gear';
  };

  const addSizeAndIconToItems = items => items.map(item => {
    if (item.type === 'folder') {
      return {
        ...item,
        icon: 'fas fa-folder',
        children: addSizeAndIconToItems(item.children)
      };
    }
    return {
      ...item,
      icon: getFileIcon(item.name)
    };
  });

  const renderFileSystem = (folder) => {
    fileSystemElement.innerHTML = '';
    fileSystemElement.className = `${currentView}-view`;
    
    folder.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = `item ${item.type}`;
      itemElement.dataset.filterItem = item.name.toLowerCase();
      itemElement.title = item.name;
      
      const itemContent = document.createElement('div');
      itemContent.className = 'item-content';
      
      if (item.type === 'folder') {
        const iconElement = document.createElement('i');
        iconElement.className = `${item.icon} exp-icon`;
        
        const nameElement = document.createElement('span');
        nameElement.className = 'item-name';
        nameElement.textContent = item.name;
        
        itemContent.append(iconElement, nameElement);
        itemElement.append(itemContent);
        
        itemElement.addEventListener('click', () => {
          path.push(item);
          renderFileSystem(item.children);
          updateAdvancedPath();
          backBtn.classList.remove('hidden');
        });
      } else {
        const linkElement = document.createElement('a');
        linkElement.href = item.url;
        linkElement.target = '_blank';
        linkElement.className = 'file-link';
        
        const iconElement = document.createElement('i');
        iconElement.className = `${item.icon} exp-icon`;
        
        const nameElement = document.createElement('span');
        nameElement.className = 'item-name';
        nameElement.textContent = item.name;
        
        linkElement.append(iconElement, nameElement);
        itemContent.append(linkElement);
        itemElement.append(itemContent);
      }
      
      fileSystemElement.append(itemElement);
    });
  };

  const updateAdvancedPath = () => {
    advancedPathElement.innerHTML = '';
    
    const homeLink = document.createElement('span');
    homeLink.textContent = 'Home';
    homeLink.className = 'path-link';
    homeLink.addEventListener('click', () => navigateTo(0));
    advancedPathElement.append(homeLink);

    path.forEach((folder, index) => {
      advancedPathElement.append(document.createTextNode(' > '));
      
      const folderLink = document.createElement('span');
      folderLink.textContent = folder.name;
      folderLink.className = 'path-link';
      folderLink.addEventListener('click', () => navigateTo(index + 1));
      advancedPathElement.append(folderLink);
    });
  };

  const navigateTo = (index) => {
    if (index === 0) {
      path = [];
      renderFileSystem(fileSystem);
    } else {
      path = path.slice(0, index);
      let currentFolder = fileSystem;
      path.forEach(folder => {
        currentFolder = currentFolder.find(item => 
          item.name === folder.name && item.type === 'folder'
        )?.children || [];
      });
      renderFileSystem(currentFolder);
    }
    updateAdvancedPath();
    backBtn.classList.toggle('hidden', index === 0);
  };

  const sortItems = (items, sortBy) => {
    return [...items].sort((a, b) => {
      if (sortBy === 'type') {
        return a.type === b.type 
          ? a.name.localeCompare(b.name)
          : a.type === 'folder' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  };

  const filefilterItems = (items, searchTerm) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === 'folder' && filefilterItems(item.children, searchTerm).length > 0)
    );
  };

  backBtn.addEventListener('click', () => navigateTo(path.length - 1));
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    renderFileSystem(filefilterItems(fileSystem, searchTerm));
  });

  sortSelect.addEventListener('change', () => {
    renderFileSystem(sortItems(fileSystem, sortSelect.value));
  });

  listViewBtn.addEventListener('click', () => {
    currentView = 'list';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    renderFileSystem(fileSystem);
  });

  gridViewBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    renderFileSystem(fileSystem);
  });

  const fetchFileSystem = async () => {
    try {
      const response = await fetch('https://api.npoint.io/2a7f0442599f0a78a72a');
      const data = await response.json();
      fileSystem = addSizeAndIconToItems(data.fileSystem);
      renderFileSystem(fileSystem);
      updateAdvancedPath();
    } catch (error) {
      console.error('Error fetching file system:', error);
      fileSystemElement.innerHTML = '<p>Error loading file system. Please try again later.</p>';
    }
  };

  fetchFileSystem();
}

// ==================== Chat Bot ====================
let botsAreVisible = false; // Tracks if bots are shown
let userToggled = false;    // Tracks if toggle button was clicked

function showbot() {
  userToggled = true; // Mark that toggle was manually triggered

  const botboxes = document.querySelectorAll('.botbox');
  const button = document.getElementById('botToggle');
  const showIcon = button.querySelector('.fa-robot');
  const hideIcon = button.querySelector('.fa-times');

  button.style.pointerEvents = 'none'; // Disable button briefly

  if (botsAreVisible) {
    botboxes.forEach(botbox => {
      const ibot = botbox.querySelector('.ibot') || botbox.querySelector('#ibot');

      if (userToggled) {
        botbox.classList.remove('expand');
        botbox.classList.add('collapsed');
      }

      botbox.style.display = "block";
      botbox.style.width = "40px";
      botbox.style.maxHeight = '5px';
      setTimeout(() => {
        botbox.style.position = "absolute";
      }, userToggled ? 500 : 0);
      setTimeout(() => {
        botbox.classList.remove('collapsed');
        botbox.style.backgroundColor = "black";
      }, userToggled ? 1000 : 0);

      if (ibot) ibot.style.opacity = "0";
    });

    showIcon.style.display = "inline-block";
    hideIcon.style.display = "none";
    botsAreVisible = false;
  } else {
    botboxes.forEach(botbox => {
      const ibot = botbox.querySelector('.ibot') || botbox.querySelector('#ibot');

      if (userToggled) {
        botbox.classList.remove('collapsed');
        botbox.classList.add('expand');
      }

      botbox.style.display = "flex";
      botbox.style.width = "100%";
      botbox.style.height = '50vh';
      botbox.style.maxHeight = '350px';
      botbox.style.position = "relative";

      if (ibot && userToggled) {
        setTimeout(() => {
          ibot.style.opacity = "1";
        }, 1000);
      }
    });

    showIcon.style.display = "none";
    hideIcon.style.display = "inline-block";

    if (userToggled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    botsAreVisible = true;
  }

  setTimeout(() => {
    button.style.pointerEvents = 'auto';
    userToggled = false; // Reset flag after toggle is handled
  }, 1000);
}

// ==================== Social Links Loader ====================
function loadSocialLinks() {
  const socialList = document.querySelector(".social-list");
  const loader = document.querySelector(".loader");
  
  if (!socialList) return;

  const renderSocialLinks = data => {
    socialList.innerHTML = data.socialLinks.map(link => `
      <li class="social-item">
        <a href="${link.linkUrl}" target="_blank" class="social-link">
          <i class="fa-brands fa-${link.linkName.toLowerCase()}"></i>
        </a>
      </li>
    `).join('');
  };
  
  const fetchSocialLinks = async () => {
    loader.style.display = "block";
    try {
      const response = await fetch("https://api.npoint.io/2a7f0442599f0a78a72a");
      const data = await response.json();
      loader.style.display = 'none';
      socialList.style.display = "flex";
      renderSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
      loader.style.display = 'none';
    }
  };
  
  fetchSocialLinks();
}

// ==================== Initial Loaders ====================
function loadProjects() {
  const loader = document.getElementById('loader');
  const projectList = document.querySelector('.project-list');
  
  if (!loader) return;

  const showLoader = () => {
    loader.style.opacity = '1';
    loader.style.display = 'flex';
  };

  const hideLoader = () => {
    loader.style.opacity = '0';
    loader.style.display = 'none';
    projectList.style.display = 'grid';
  };

  showLoader();
  setTimeout(hideLoader, 3000); // Simulate a 3-second load time
}

// ==================== Search Bar Toggle ====================
const expcontainer = document.querySelector('.container');
const searchBar = document.querySelector('.input-container');

function hidesearchbar() {
  searchBar.style.display = 'none';
  expcontainer.style.display = "block";
  closeb();
  hideLoader();
}

function showsearchbar() {
  searchBar.style.display = 'flex';
  expcontainer.style.display = "none";
}

window.onscroll = function() {scrollFunction()};

