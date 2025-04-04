window.addEventListener("load", function() {
  document.querySelector(".preloader").style.display = "none";
});

function redirectIfNeeded() {
  if (window.innerWidth < 800) {
      window.location.href = "index-mobile.html"; // Replace with your target URL
  }
}

// Redirect on initial load
window.onload = redirectIfNeeded;

// Redirect if the window is resized
window.onresize = redirectIfNeeded;

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    document.querySelector('.parallax').style.transform = `translateY(-${scrolled}px)`;
});
function playLoop() {
  document.getElementById("entry").style.display = "none"; 
  document.getElementById("loop").style.display = "block"; 
  document.getElementById("loop").play();
}


  function playVideo(videoId) {
    // Hide all video containers
    var videoContainers = document.querySelectorAll('.video-container-game');
    videoContainers.forEach(function(container) {
        container.style.display = 'none';
    });

    // Show the selected video container
    var selectedVideoContainer = document.getElementById(videoId);
    if (selectedVideoContainer) {
        selectedVideoContainer.style.display = 'block';
    }

    // Add 'playing' class to the clicked small box
    var smallBoxes = document.querySelectorAll('.small-box');
    smallBoxes.forEach(function(box) {
        if (box.getAttribute('data-video') === videoId) {
            box.classList.add('playing');
        } else {
            box.classList.remove('playing');
        }
    });
}

// Set default video to display
var defaultVideo = document.getElementById('video1');
defaultVideo.style.display = 'block';

window.onload = function() {
    document.querySelector('#home').scrollIntoView();
  };

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      document.querySelector('.top-container').classList.add('fixed');
    } else {
      document.querySelector('.top-container').classList.remove('fixed');
    }
  }
  async function fetchNews() {
    try {
      const response = await fetch('news.json'); // Change the path to your JSON file
      const articles = await response.json();
      
      const newsList = document.getElementById('news-list');
      
      articles.forEach(article => {
        const li = document.createElement('li');
        
        // Apply animation class based on the article's animation type
        li.classList.add(article.animation);
        
        const heading = document.createElement('h2');
        heading.textContent = article.title;
        const date = document.createElement('p');
        date.textContent = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const excerpt = document.createElement('p');
        excerpt.textContent = article.excerpt;
        const readMoreLink = document.createElement('a');
        readMoreLink.href = article.url;
        readMoreLink.textContent = 'Read more';
        
        li.appendChild(heading);
        li.appendChild(date);
        li.appendChild(excerpt);
        li.appendChild(readMoreLink);
        
        newsList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  // Call the fetchNews function when the page loads
  window.addEventListener('load', fetchNews);

  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header nav a');
  
  window.onscroll = () => {
      sections.forEach(sec => {
          let top = window.scrollY;
          let offset = sec.offsetTop - 150;
          let height = sec.offsetHeight;
          let id = sec.getAttribute('id');
  
          if(top >= offset && top < offset + height) {
              navLinks.forEach(links => {
                  links.classList.remove('active');
                  document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
              });
          };
      });
  };

  