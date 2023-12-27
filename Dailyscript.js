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
