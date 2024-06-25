
const sentences = [
    "Web Devloper.",
    "Video Editor.",
    "Professsinal Programmer.",
    "Computer Engineer"
];

// Function to shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the sentences array
shuffle(sentences);

let partIndex = 0;
let sentenceIndex = 0;
let currentSentence = '';
let isDeleting = false;
const typeSpeed = 150;
const deleteSpeed = 75;
const delayBetweenSentences = 2000;

const typewriterElement = document.getElementById('typewriter');

function type() {
    const fullSentence = sentences[sentenceIndex];
    if (isDeleting) {
        currentSentence = fullSentence.substring(0, currentSentence.length - 1);
    } else {
        currentSentence = fullSentence.substring(0, currentSentence.length + 1);
    }

    typewriterElement.textContent = currentSentence;

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && currentSentence === fullSentence) {
        speed = delayBetweenSentences;
        isDeleting = true;
    } else if (isDeleting && currentSentence === '') {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        if (sentenceIndex === 0) shuffle(sentences); // Shuffle again after one loop
        speed = typeSpeed;
    }

    setTimeout(type, speed);
}

type();

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    alert('Thank you for contacting us, ' + name + '!');
    
    document.getElementById('contactForm').reset();
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Add submission date
    formDataObject['date'] = new Date().toISOString();

    // Save data to JSON file on GitHub (via GitHub API)
    saveDataToGitHub(formDataObject);

    // Reset the form
    event.target.reset();
});

async function saveDataToGitHub(data) {
    const accessToken = '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'; // Replace with your GitHub access token
    const repoOwner = 'SachinSharma8742';
    const repoName = 'E-mail';
    const filePath = 'data/form_data.json'; // Path to your JSON file in the repository

    const commitMessage = 'Add form submission data';

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    const headers = new Headers({
        'Authorization': `token ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
    });

    const existingData = await fetch(apiUrl, {
        headers,
    })
    .then(response => response.json())
    .catch(error => console.error('Error fetching existing data:', error));

    const currentData = existingData.content ? JSON.parse(atob(existingData.content)) : [];

    currentData.push(data);

    const body = {
        message: commitMessage,
        content: btoa(JSON.stringify(currentData, null, 2)),
        sha: existingData.sha,
    };

    fetch(apiUrl, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => console.log('Data saved to GitHub:', data))
    .catch(error => console.error('Error saving data to GitHub:', error));
}

