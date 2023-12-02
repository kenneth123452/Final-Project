const date = new Date();
let goalInfo = null;
let selectedDay = null;

const retrieveGoalInfo = () => {
    const goalInfoString = localStorage.getItem('goalInfo');
    selectedDay = localStorage.getItem('selectedDay');

    if (goalInfoString !== null) {
        goalInfo = JSON.parse(goalInfoString);
    }

    if (goalInfo === null) {
        goalInfo = {}; // Initialize goalInfo as an object if it's null
    }

    if (selectedDay === null) {
        // If no selected day is found in local storage, set a default day
        const defaultDay = 1; // Set your desired default day here
        selectedDay = defaultDay;
        localStorage.setItem('selectedDay', selectedDay);
    }
}

retrieveGoalInfo();

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".calendar-days-content");

 const monthDays = document.querySelector(".calendar-days-content");

  const lastDay = new
 
Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new
 
Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById("monthDisplay").innerHTML = months[date.getMonth()];
    document.getElementById("yearDisplay").innerHTML = date.getFullYear();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        days += `<div class="day" data-day="${i}">${i}</div>`;
    }

    monthDays.innerHTML = days;

    document.querySelectorAll(".day").forEach((day) => {
        day.addEventListener("click", handleDayClick);
    });

    if (goalInfo !== null) {
        console.log("Retrieved Goal Info:", goalInfo);
        // Use goalInfo to update goal-related elements or display it on the calendar
    }
};

const updateGoalElements = () => {
    // Use goalInfo to update goal-related elements
    if (goalInfo !== null) {
        document.getElementById('goalAmountElement').innerText = goalInfo.goalAmount || '';
    }
};

document.getElementById("prevMonthButton").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    updateGoalElements();
});

document.getElementById("nextMonthButton").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    updateGoalElements();
});

const openSchedulingModal = (day) => {
    document.getElementById("selectedDay").innerHTML = day;
    document.getElementById("schedulingModal").style.display = "block";
};

// Add this function to handle day clicks
const handleDayClick = (event) => {
    selectedDay = event.currentTarget.dataset.day;
    localStorage.setItem('selectedDay', selectedDay);
    openSchedulingModal(selectedDay);
    retrieveGoalInfo();
};

// Add this function to handle form submission
const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedDay) {
        const eventData = {
            title: document.getElementById("eventTitle").value,
            day: selectedDay,
        };

        goalInfo = goalInfo || {};
        goalInfo.eventData = eventData;

        localStorage.setItem(`goalInfo_${selectedDay}`, JSON.stringify(goalInfo));
        console.log("Event Scheduled:", eventData);
        document.getElementById("schedulingModal").style.display = "none";

        renderCalendar();
        updateGoalElements();
};

// Add event listener for form submission
document.getElementById("eventForm").addEventListener("submit", handleFormSubmit);

// Add event listener to close modal
document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("schedulingModal").style.display = "none";
});

renderCalendar();
updateGoalElements();

