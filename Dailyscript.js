const date = new Date();

const goalInfoString = localStorage.getItem('goalInfo');
        let goalInfo = null;

        if (goalInfoString !== null) {
            goalInfo = JSON.parse(goalInfoString);
}

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".calendar-days-content");
  
   const lastDay = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
 ).getDate();

 const prevLastDay = new Date(
  date.getFullYear(),
  date.getMonth(),
  0
 ).getDate();


  const firstDayIndex = date.getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
    }
};

const updateGoalElements = () => {
            // Use goalInfo to update goal-related elements
  if (goalInfo !== null) {
        document.getElementById('goalAmountElement').innerText = goalInfo.goalAmount;
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
  const selectedDay = event.currentTarget.dataset.day;
  localStorage.setItem('selectedDay', selectedDay); 
  openSchedulingModal(selectedDay);
};

// Add this function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();
  const eventData = {
    title: document.getElementById("eventTitle").value,
    time: document.getElementById("eventTime").value,
    description: document.getElementById("eventDescription").value,
  };
  // Add logic to save the event data and update the calendar
  console.log("Event Scheduled:", eventData);
  document.getElementById("schedulingModal").style.display = "none";
};

// Add event listener for form submission
document.getElementById("eventForm").addEventListener("submit", handleFormSubmit);

// Add event listener to close modal
document.getElementById("closeModalButton").addEventListener("click", () => {
  document.getElementById("schedulingModal").style.display = "none";
});

// Initial render
renderCalendar();
updateGoalElements();
