const targets = [
    { date: "07 Aug 2024", elementId: "days1", statusId: "status1" },
    { date: "25 Jul 2024", elementId: "days2", statusId: "status2" },
    { date: "01 Jan 2025", elementId: "days3", statusId: "status3" }
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
            }
        } else {
            if (element) {
                element.innerHTML = formatTime(days);
            }
            if (statusElement) {
                statusElement.innerHTML = "In Progress";
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
