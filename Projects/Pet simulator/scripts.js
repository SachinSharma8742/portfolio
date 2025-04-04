
document.addEventListener('DOMContentLoaded', () => {

document.getElementById('loader').style.display = 'flex';

setTimeout(() => {
// Hide loader
document.getElementById('loader').style.display = 'none';
// Show content
document.getElementById('content').style.display = 'block';

// Your existing code here...
 }, 2000);

let happiness = parseInt(localStorage.getItem('happiness')) || 50;
let sleep = parseInt(localStorage.getItem('sleep')) || 50;
let hunger = parseInt(localStorage.getItem('hunger')) || 50;
let energy = parseInt(localStorage.getItem('energy')) || 50;
let petname = localStorage.getItem('petname') || 'Bob';
// default pet dog 

const happinessDisplay = document.getElementById('happinessBar');
const sleepDisplay = document.getElementById('sleepBar');
const hungerDisplay = document.getElementById('hungerBar');
const energyDisplay = document.getElementById('energyBar');

const dogeat = document.getElementById('puppy-eating');
const dogbark = document.getElementById('puppy-bark');
dogbark.volume = 0.2;
const dogsad = document.getElementById('puppy-sad');
dogsad.volume = 0.2;
const toggleButton = document.getElementById('toggleButton');
const missionList = document.getElementById('mission');

const petNameInput = document.getElementById('petNameInput');
petNameInput.value = petname; 


document.getElementById('savepetname').onclick = function() {
petname = petNameInput.value.trim(); // Get and trim the value from input
location.reload();
if (petname !== '') {
    localStorage.setItem('petname', petname); // Save petname to localStorage
    console.log(`Pet's name "${petname}" saved.`);
    
} else {
    alert('Please enter a valid pet name.');
}
}

const missions = [];
function renderMissions() {
  if (missions.length === 0) {
      missionList.textContent = "No missions";
    } else {
        missionList.innerHTML = '';
        missions.forEach((mission, index) => {
            const listItem = document.createElement('li');
            const missionText = document.createElement('span');
            missionText.textContent = mission;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteMission(index);

            listItem.appendChild(missionText);
            listItem.appendChild(deleteButton);
            missionList.appendChild(listItem);
        });
    }
}
 

function saveToggleState() {
        const toggleButton = document.getElementById('toggleButton');
        localStorage.setItem('isDarkMode', toggleButton.checked);
    }

    function loadToggleState() {
        const toggleButton = document.getElementById('toggleButton');
        toggleButton.checked = localStorage.getItem('isDarkMode') === 'true';
        // Set initial theme based on loaded toggle state
        setTheme(toggleButton.checked);
    }
    
    document.getElementById('toggleButton').addEventListener('change', () => {
        saveToggleState(); // Save state whenever toggle changes
        setTheme(toggleButton.checked); // Set theme based on toggle state
        // Add additional actions when the toggle is ON or OFF if needed
    });
function addMission(newMission) {
if (!missions.includes(newMission)) {
    missions.push(newMission);
    renderMissions(); // Re-render the updated list
    
} else {
    console.log(`Mission "${newMission}" already exists.`);
}
}




function deleteMissionFromArray(str) {
const index = missions.indexOf(str);
if (index !== -1) {
    missions.splice(index, 1);
    console.log(`Deleted "${str}" from the missions array.`);
} else {
    console.log(`"${str}" not found in the missions array.`);
}
}
function missionAssign() {
    if (hunger < 20) {
        addMission(`Feed ${petname}`);
    } else {
        deleteMissionFromArray(`Feed ${petname}`);
    }

    if (sleep < 20) {
        addMission(`${petname} needs a nap`);
    } else {
        deleteMissionFromArray(`${petname} needs a nap`);
    }

    if (energy < 10) {
        addMission(`${petname} needs energy`);
    } else {
        deleteMissionFromArray(`${petname} needs energy`);
    }
}  function deleteMission(index) {
    missions.splice(index, 1);
    renderMissions();
}

dogeat.preload = 'auto';
    dogbark.preload = 'auto';
     dogsad.preload = 'auto';

function updateStats() {
    happinessDisplay.value = happiness;
    sleepDisplay.value = sleep;
    hungerDisplay.value = hunger;
    energyDisplay.value = energy;
    
}

function updateProgressBars() {
    happinessDisplay.setAttribute('value', happiness);
    sleepDisplay.setAttribute('value', sleep);
    hungerDisplay.setAttribute('value', hunger);
    energyDisplay.setAttribute('value', energy);

    document.getElementById('hunger').textContent = hunger;
    document.getElementById('happiness').textContent = happiness;
    document.getElementById('energy').textContent = energy;
    document.getElementById('sleep').textContent = sleep;
    
    
}

function saveState() {
    localStorage.setItem('happiness', happiness);
    localStorage.setItem('sleep', sleep);
    localStorage.setItem('hunger', hunger);
    localStorage.setItem('energy', energy);
    
      
}


    happinessDisplay.textContent = happiness;
    sleepDisplay.textContent = sleep;
    hungerDisplay.textContent = hunger;
    energyDisplay.textContent = energy;


   
    

    

    function playdogeat() {
    dogeat.currentTime = 0; // Rewind to the beginning (if needed)
    dogeat.play();
     }

    function playdogbark() {
    dogbark.currentTime = 0; // Rewind to the beginning (if needed)
    
    dogbark.play();
     }

    function playdogsad() {
    dogsad.currentTime = 0; // Rewind to the beginning (if needed)
    dogsad.play();
     }
   
    toy.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'toy');
        if (toggleButton.checked){
        e.preventDefault();
        return;
    }
    });

    toy1.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'toy1');
        if (toggleButton.checked){
        e.preventDefault();
        return;
    }
    });

    toy2.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'toy2');
        if (toggleButton.checked){
        e.preventDefault();
        return;
    }
    });
    document.addEventListener('dragover', (e) => {

        e.preventDefault();
    });
   
    pet.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    food.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'food');
        if (toggleButton.checked){
            e.preventDefault();
            return;
        }
    });
    
    food1.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'food1');
        if (toggleButton.checked){
            e.preventDefault();
            return;
        }
    });
    
    food2.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', 'food2');
        if (toggleButton.checked){
            e.preventDefault();
            return;
        }
    });
    
    



    if (toggleButton.checked){
        e.preventDefault();
        return;
    }

    // Show eat image and hide happy/sad images
    document.getElementById('eat').style.display = 'block';
    document.getElementById('happy').style.display = 'none';
    document.getElementById('sad').style.display = 'none';
    


food.addEventListener('dragend', () => {
// Hide eat image when food dragging ends
eatImage.style.display = 'none';
playdogeat();
});


    pet.addEventListener('drop', (e) => {
    
        e.preventDefault();
    let foodType = e.target.id; // Get the ID of the dropped food item
    let hungerIncrease = 0;
     if (e.dataTransfer.getData('text') === 'food') {
        hungerIncrease = 10; // Example hunger increase value for 🍔
    } else if (e.dataTransfer.getData('text') ==='food1') {
        hungerIncrease = 15; // Example hunger increase value for 🍖
    } else if (e.dataTransfer.getData('text') === 'food2') {
        hungerIncrease = 8; // Example hunger increase value for 🍫
    } else {
        hungerIncrease = 0; // Default value if no match found
    }
    // Update pet's stats accordingly
    hunger = Math.min(hunger + hungerIncrease, 100);
    happiness = Math.min(happiness + 5, 100);
    energy = Math.min(energy + 20, 100);

    // Update display and save state
    updateProgressBars();
    updateDisplay();
    saveState();
    playdogeat();

    let toyType = e.target.id; // Get the ID of the dropped food item
    let happinessIncrease = 0;
    if (e.dataTransfer.getData('text') === 'toy') {
        happinessIncrease = 20; // Example hunger increase value for 🍔
    } else if (e.dataTransfer.getData('text') ==='toy1') {
        happinessIncrease = 15; // Example hunger increase value for 🍖
    } else if (e.dataTransfer.getData('text') === 'toy2') {
        happinessIncrease = 8; // Example hunger increase value for 🍫
    } else {
        happinessIncrease = 0; // Default value if no match found
    }
    happiness = Math.min(happiness + happinessIncrease, 100);
    energy = Math.max(energy - 10, 0);

    // Update display and save state
    updateProgressBars();
    updateDisplay();
    saveState();
    playdogeat();  

    });
     
let intervalId;

// Function to start the interval when the toggle is OFF
function startOffInterval() {
clearInterval(intervalId); // pet is awake
intervalId = setInterval(() => {
    happiness = Math.max(happiness - 4, 0);
    sleep = Math.max(sleep - 1, 0);
    hunger = Math.max(hunger - 1, 0);
    energy = Math.max(energy - 2, 0);
    if (happiness > 30) {
        document.getElementById('happy').style.display = 'block';
        document.getElementById('sad').style.display = 'none';
        playdogbark();
        dogsad.pause();
        deleteMissionFromArray(`Play with your ${petname}`);
        
          
    } else {
        document.getElementById('happy').style.display = 'none';
        document.getElementById('sad').style.display = 'block';
        playdogsad();
        dogbark.pause();
        addMission(`Play with your ${petname}`);
    }
    document.getElementById('eat').style.display = 'none';
    document.getElementById('sleepanimation').style.display = 'none';
    renderMissions();
    updateProgressBars()
    updateDisplay();
    saveState();
}, 1000);
const toys = document.querySelectorAll('.toy');
toys.forEach(toy => {
    toy.style.opacity = '1'; // Set opacity to 50% (example value)
    // You can adjust the opacity value ('0' to '1') as needed
});
const foods = document.querySelectorAll('.food');
foods.forEach(food => {
    food.style.opacity = '1'; // Set opacity to 50% (example value
});
document.getElementById('sad').style.filter = 'grayscale(0)';
}

// Function to start the interval when the toggle is ON
function startOnInterval() {
clearInterval(intervalId); // pet is sleeping
intervalId = setInterval(() => {
    energy = Math.min(energy + 4, 100);
    sleep = Math.min(sleep + 2, 100);
    hunger = Math.max(hunger - 1, 0);
    document.getElementById('eat').style.display = 'none';
    document.getElementById('happy').style.display = 'none';
    document.getElementById('sad').style.display = 'block';
    document.getElementById('sleepanimation').style.display = 'block';
    
    if (sleep >= 100) {
    startOffInterval();
    setColors(false);
     }
    updateProgressBars()
    updateDisplay();
    saveState();
}, 1000);
const toys = document.querySelectorAll('.toy');
toys.forEach(toy => {
    toy.style.opacity = '0.5'; // Set opacity to 50% (example value)
    // You can adjust the opacity value ('0' to '1') as needed
});
const foods = document.querySelectorAll('.food');
foods.forEach(food => {
    food.style.opacity = '0.5'; // Set opacity to 50% (example value
});
document.getElementById('sad').style.filter = 'grayscale(60%)';
}

function setColors(isDarkMode) {
var fadeOverlay = document.getElementById('fadeOverlay');
fadeOverlay.style.opacity = 0.5;

setTimeout(() => {
if (isDarkMode) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    
    toggleButton.checked = true; // Update the toggle button status
} else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    toggleButton.checked = false; // Update the toggle button status
}

// Fade out the overlay
fadeOverlay.style.opacity = 0;

}, 1000);
}

toggleButton.addEventListener('change', function() {
if (this.checked) {
    startOnInterval();
    setColors(true);
    // Add additional actions when the toggle is ON
} else {
    startOffInterval();
    setColors(false);
    // Add additional actions when the toggle is OFF
}
saveState();
});

document.getElementById('gotosleep').onclick = function() {
if (energy < 50) {
    startOnInterval();
    setColors(true);
} else {
    startOffInterval();
    setColors(false);
}
};



// Interval to periodically check the energy level
function mission(){

}

function updateDisplay() {
happinessDisplay.textContent = happiness;
sleepDisplay.textContent = sleep;
hungerDisplay.textContent = hunger;
energyDisplay.textContent = energy;
missionAssign();
}

// Start the interval for the OFF state when the window loads
window.addEventListener('load', startOffInterval);

// Uncomment the following line if you want to run decreaseStats regardless of the toggle state
// setInterval(decreaseStats, 1000);





    // Initialize pet appearance based on saved state
    
   
    setColors(false);
   

    // Event listener for pet selector change

});


