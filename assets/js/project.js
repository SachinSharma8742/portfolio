document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.querySelector('.project-list');
    const iframe = document.getElementById('project-frame');
    const browser = document.getElementById('browser-frame');
    const header = document.getElementById('browser-header');
    let history = [];
    let historyIndex = -1;

    function expandFrame(url) {
        iframe.src = url;
        browser.style.height = '500px';
        header.style.display = 'flex';
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
        }
    }

    function handleProjectClick(li, url) {
        if (li.classList.contains('show')) {
            li.classList.remove('show');
            compressFrame();
        } else {
            document.querySelectorAll('.project-item').forEach(item => item.classList.remove('show'));
            li.classList.add('show');
            expandFrame(url);
            updateHistory(url);

            // Scroll to the top
            window.scrollTo({ top: 200, behavior: 'smooth' });

            // Move the clicked project to the top of the list
            projectList.prepend(li);
        }
    }

    fetch('./assets/json/project.json')
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

            // Add click event listeners to each <li> after setting innerHTML
            document.querySelectorAll('.project-item').forEach(li => {
                li.addEventListener('click', (e) => {
                    e.preventDefault();
                    handleProjectClick(li, li.getAttribute('data-url'));
                });
            });
        })
        .catch(error => console.error('Error loading project data:', error));
});