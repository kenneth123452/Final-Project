document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.querySelector('.calendar');
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
  
    // Function to update the calendar content
    function updateMonthDisplay() {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const currentMonthName = monthNames[currentMonth];
      const currentYearElement = document.querySelector('.year');
      const monthNameElement = document.querySelector('.month-name');
  
      monthNameElement.textContent = currentMonthName;
      currentYearElement.textContent = currentYear;
    }
  
    // Function to update the calendar days
    function updateCalendar() {
      const daysContainer = document.querySelector('.calendar-days-content');
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
      // Add day names to the calendar
      const weekdaysContainer = document.querySelector('.weekdays');
      weekdaysContainer.innerHTML = '';
      dayNames.forEach(dayName => {
        const weekday = document.createElement('li');
        weekday.textContent = dayName;
        weekdaysContainer.appendChild(weekday);
      });
  
      daysContainer.innerHTML = '';
  
      let dayNumber = 1;
      for (let i = 0; i < 6; i++) { // Create 6 rows for weeks
        const row = document.createElement('tr'); // Use <tr> for table rows
        for (let j = 0; j < 7; j++) { // Create 7 cells for days
          const day = document.createElement('td'); // Use <td> for table cells
          if (i === 0 && j < firstDayOfMonth) { // Handle empty cells before the first day
            day.classList.add('empty');
          } else if (dayNumber > daysInMonth) { // Handle empty cells after the last day
            break;
          } else {
            day.textContent = dayNumber; // Display only the day number
            if (dayNumber === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
              day.classList.add('today');
            }
            dayNumber++;
          }
          row.appendChild(day);
        }
        daysContainer.appendChild(row);
      }
    }
  
    // ... (rest of the code remains the same)
  });
  

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Event listener for previous month button
    prevButton.addEventListener('click', () => {
        if (currentMonth > 0) {
            currentMonth--;
        } else {
            currentMonth = 11;
            currentYear--;
        }
        updateMonthDisplay();
        updateCalendar();
    });

    // Event listener for next month button
    nextButton.addEventListener('click', () => {
        if (currentMonth < 11) {
            currentMonth++;
        } else {
            currentMonth = 0;
            currentYear++;
        }
        updateMonthDisplay();
        updateCalendar();
    });

    // Initial calendar creation
    updateMonthDisplay();
    updateCalendar();
;
// E2 YUNG BAGO 

function handleDateClick(day, month, year) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback');

  const thumbsUpButton = document.createElement('button');
  thumbsUpButton.textContent = '👍';
  thumbsUpButton.addEventListener('click', () => {
      feedbackDiv.textContent = '👍';
  });

  const thumbsDownButton = document.createElement('button');
  thumbsDownButton.textContent = '👎';
  thumbsDownButton.addEventListener('click', () => {
      feedbackDiv.textContent = '👎';
  });

  feedbackDiv.appendChild(thumbsUpButton);
  feedbackDiv.appendChild(thumbsDownButton);

  
  const goalInfo = getGoalInfo(day, month, year); 
  if (goalInfo) {
      feedbackDiv.textContent += ` Goal Info: ${goalInfo.goalAmount} in ${goalInfo.timeFrame}`;
      
  }

  console.log(`Clicked on ${day}-${month + 1}-${year}`);
  document.body.appendChild(feedbackDiv);
}

function getGoalInfo(day, month, year) {

  return null;
}
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function generateCalendarGrid(month, year) {
  const daysContainer = document.getElementById('calendar-days-content');
  daysContainer.innerHTML = '';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthContainer = document.createElement('div');
  monthContainer.classList.add('month-container');

  const monthNameElement = document.createElement('span');
  monthNameElement.classList.add('month-name');
  monthNameElement.textContent = monthNames[month];
  monthContainer.appendChild(monthNameElement);

  const yearElement = document.createElement('span');
  yearElement.classList.add('year-display');
  yearElement.textContent = year;
  monthContainer.appendChild(yearElement);

  const table = document.createElement('table');
  table.classList.add('calendar-days');

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let dayOfMonth = 1;

  for (let i = 0; i < 6; i++) {
    const weekContainer = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const day = document.createElement('td');

      if (i === 0 && j < firstDayOfMonth) {
        day.classList.add('empty');
        day.textContent = '';
      } else if (dayOfMonth <= daysInMonth) {
        day.textContent = dayOfMonth;
        day.classList.add('day-cell');

        if (
          dayOfMonth === currentDate.getDate() &&
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          day.classList.add('today');
        }
        dayOfMonth++;
      } else {
        day.classList.add('empty');
        day.textContent = '';
      }

      day.addEventListener('click', () => {
        handleDateClick(day.textContent, month, year);
      });

      weekContainer.appendChild(day);
    }

    table.appendChild(weekContainer);

    if (dayOfMonth > daysInMonth) {
      break;
    }
  }

  monthContainer.appendChild(table);
  daysContainer.appendChild(monthContainer);
}

function handlePrevMonthClick() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendarGrid(currentMonth, currentYear);
}

function handleNextMonthClick() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendarGrid(currentMonth, currentYear);
}

function handleDateClick(day, month, year) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback');

  const thumbsUpButton = document.createElement('button');
  thumbsUpButton.textContent = '👍';
  thumbsUpButton.addEventListener('click', () => {
    feedbackDiv.textContent = '👍';
  });

  const thumbsDownButton = document.createElement('button');
  thumbsDownButton.textContent = '👎';
  thumbsDownButton.addEventListener('click', () => {
    feedbackDiv.textContent = '👎';
  });

  feedbackDiv.appendChild(thumbsUpButton);
  feedbackDiv.appendChild(thumbsDownButton);

  console.log(`Clicked on ${day}-${month + 1}-${year}`);


  document.body.appendChild(feedbackDiv);
}

generateCalendarGrid(currentMonth, currentYear);

const prevMonthButton = document.querySelector('.prev-month');
prevMonthButton.addEventListener('click', handlePrevMonthClick);

const nextMonthButton = document.querySelector('.next-month');
nextMonthButton.addEventListener('click', handleNextMonthClick);
