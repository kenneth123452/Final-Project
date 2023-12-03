const date = new Date();
const storedTimeFrame = localStorage.getItem('timeFrame');

if (storedTimeFrame !== null) {
    console.log('Retrieved Time Frame:', storedTimeFrame);
} else {
    console.log('Time Frame not found in localStorage.');
}
const getTargetDay = (timeFrame) => {
  const currentDate = new Date();

  const targetDate = new Date(timeFrame);

  if (targetDate < currentDate) {
    let nextOccurrenceDate = currentDate;
    while (nextOccurrenceDate.toLocaleDateString('en-US', { weekday: 'long' }) !== timeFrame) {
      nextOccurrenceDate.setDate(nextOccurrenceDate.getDate() + 1);
    }
    return nextOccurrenceDate.getDate();
  } else {
    return targetDate.getDate();
  }
};
const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".calendar-days-content");
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

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
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div class="day" data-day="${i}">${i}</div>`;
        }
    }

    monthDays.innerHTML = days;
    document.querySelectorAll(".day").forEach((day) => {
        day.addEventListener("click", handleDayClick);
    });
};

document.getElementById("prevMonthButton").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.getElementById("nextMonthButton").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

const openSchedulingModal = (day) => {
    document.getElementById("selectedDay").innerHTML = day;
    document.getElementById("schedulingModal").style.display = "block";
};

const handleDayClick = (event) => {
    const selectedDay = event.currentTarget.dataset.day;
    openSchedulingModal(selectedDay);
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    const eventData = {
        title: document.getElementById("eventTitle").value,
        time: document.getElementById("eventTime").value,
        description: document.getElementById("eventDescription").value,
    };

    const storedTimeFrame = localStorage.getItem('timeFrame');

    // Check if the time frame is available and not null
    if (storedTimeFrame !== null) {
        console.log('Retrieved Time Frame:', storedTimeFrame);

        // Add logic to set the schedule based on the time frame
        // This is a simple example; customize it based on your needs
        const scheduleTime = calculateScheduleTime(storedTimeFrame);
        eventData.time = scheduleTime;

        // Add logic to save the event data and update the calendar
        console.log("Event Scheduled:", eventData);
        document.getElementById("schedulingModal").style.display = "none";
    } else {
        console.log('Time Frame not found in localStorage.');
    }
};

const calculateScheduleTime = (timeFrame) => {
    // Get the current date
    const currentDate = new Date();

    // Find the next occurrence of the specified day in the current week
    let nextOccurrenceDate = currentDate;
    while (nextOccurrenceDate.toLocaleDateString('en-US', { weekday: 'long' }) !== timeFrame) {
        nextOccurrenceDate.setDate(nextOccurrenceDate.getDate() + 1);
    }
    // Set the time for the event (in this example, set it to 12:00 PM)
    nextOccurrenceDate.setHours(12, 0, 0, 0);
    // Format the resulting date and time
    const formattedTime = nextOccurrenceDate.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
};

// Add event listener for form submission
document.getElementById("eventForm").addEventListener("submit", handleFormSubmit);

// Add event listener to close modal
document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("schedulingModal").style.display = "none";
});

// Initial rendering of the calendar
renderCalendar();


