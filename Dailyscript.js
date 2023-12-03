const date = new Date();
const storedTimeFrame = localStorage.getItem('timeFrame');
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

const determineTimeFrameType = (timeFrame) => {
    if (timeFrame.length === 3) {
        return "week";
    } else if (timeFrame.length > 3 && timeFrame.includes(" ")) {
        return "month";
    } else {
        return "year";
    }
};

const calculateDaysRemaining = (timeFrameType, timeFrame) => {
    const currentDate = new Date();
    const daysInWeek = 7;
    const daysInMonth = 30;
    const daysInYear = 365;

    if (timeFrameType === "week") {
        const targetDayIndex = weekDays.indexOf(timeFrame);
        const currentDayIndex = currentDate.getDay();
        return (targetDayIndex + 7 - currentDayIndex) % 7;
    } else if (timeFrameType === "month") {
        return daysInMonth - currentDate.getDate();
    } else if (timeFrameType === "year") {
        return daysInYear - getDayInYear(timeFrame);
    } else {
        return 0; // Invalid time frame type
    }
};

const getDayInYear = (timeFrame) => {
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

    const monthDay = timeFrame.split(" ");
    const month = months.indexOf(monthDay[0]);
    const day = parseInt(monthDay[1]);

    let dayInYear = day;
    for (let i = 0; i < month; i++) {
        dayInYear += new Date(date.getFullYear(), i + 1, 0).getDate();
    }

    return dayInYear;
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

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const retrievedTimeFrameDay = getTargetDay(storedTimeFrame);
    const timeFrameType = determineTimeFrameType(storedTimeFrame);
    const daysRemaining = calculateDaysRemaining(timeFrameType, storedTimeFrame);

    document.getElementById("monthDisplay").innerHTML = months[date.getMonth()];
    document.getElementById("yearDisplay").innerHTML = date.getFullYear();

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date"><span class="math-inline">${prevLastDay - x + 1}</span></div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        let dayClass = "day";
        let timeFrameDisplay = "";

        if (i === currentDay && date.getMonth() === currentMonth) {
            dayClass = "today";
        }

        if (i === retrievedTimeFrameDay) {
            dayClass += " retrieved-time-frame";
            timeFrameDisplay = `<div class="time-frame">${storedTimeFrame}</div>`;
        }

        days += `<div class="${dayClass}" data-day="${i}">
                    ${i}
                    ${timeFrameDisplay} <!-- Add the time frame display here -->
                </div>`;
    }

    monthDays.innerHTML = days;
    document.querySelectorAll(".day").forEach((day) => {
        day.addEventListener("click", handleDayClick);
    });

    document.getElementById("daysRemaining").innerHTML = `Days remaining: ${daysRemaining}`;
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

    if (storedTimeFrame !== null) {
        console.log('Retrieved Time Frame:', storedTimeFrame);

        const scheduleTime = calculateScheduleTime(storedTimeFrame);
        eventData.time = scheduleTime;

        console.log("Event Scheduled:", eventData);
        document.getElementById("schedulingModal").style.display = "none";
    } else {
        console.log('Time Frame not found in localStorage.');
    }
};

const calculateScheduleTime = (timeFrame) => {
    const currentDate = new Date();
    let nextOccurrenceDate = currentDate;

    while (nextOccurrenceDate.toLocaleDateString('en-US', { weekday: 'long' }) !== timeFrame) {
        nextOccurrenceDate.setDate(nextOccurrenceDate.getDate() + 1);
    }

    nextOccurrenceDate.setHours(12, 0, 0, 0);
    const formattedTime = nextOccurrenceDate.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true });
    return formattedTime;
};

document.getElementById("eventForm").addEventListener("submit",
                                                      
document.getElementById("eventForm").addEventListener("submit", handleFormSubmit);

document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("schedulingModal").style.display = "none";
});

renderCalendar();
