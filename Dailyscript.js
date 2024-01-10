const currentMonth = { value: 0 };
const currentYear = { value: 2024 }; // Set your initial year here

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0);
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

const getStoredExpenseData = (day, month, year) => {
  const expenseData = localStorage.getItem("ExpenseData") || "{}";
  const parsedExpenseData = JSON.parse(expenseData);
  const dateKey = `${year}-${month + 1}-${day}`;

  if (parsedExpenseData[dateKey]) {
    return parsedExpenseData[dateKey];
  }

  return null;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

// Add this line to fix the reference error
let month_list = document.querySelector('.month-list');
month_picker.onclick = () => {
  month_list.classList.remove('hideonce');
  month_list.classList.remove('hide');
  month_list.classList.add('show');
  dayTextFormate.classList.remove('showtime');
  dayTextFormate.classList.add('hidetime');
  timeFormate.classList.remove('showtime');
  timeFormate.classList.add('hideTime');
  dateFormate.classList.remove('showtime');
  dateFormate.classList.add('hideTime');
};

function displayExpenseData(cardType, parsedExpenseData) {
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const expenseValue = parsedExpenseData[cardType] || 0;
  const storedDataElement = document.getElementById("storedData" + capitalizeFirstLetter(cardType));
  const currentExpenseElement = document.getElementById("display" + capitalizeFirstLetter(cardType) + "ExpenseData");
  const inputElement = document.querySelector(`[data-type="${cardType}"] input`);

  if (storedDataElement) {
    // Creating a new span element to wrap the text for styling
    const styledText = document.createElement('span');
    
    // Setting the inner text of the span with your content
    styledText.innerText = "Stored Expense Data: " + JSON.stringify(expenseValue);

    // Applying CSS styles to the span element
    styledText.style.fontFamily = 'Arial';  // Setting the font to Arial
    styledText.style.fontWeight = 'bold';   // Example style: making the text bold
    styledText.style.color = 'black';        // Example style: setting text color to blue
    styledText.style.marginTop = '10px';    // Adding a margin of 10 pixels at the top

    // Clearing existing content of storedDataElement and appending the styled text
    storedDataElement.innerHTML = '';
    storedDataElement.style.position = 'relative';  // Setting the position to relative
    storedDataElement.style.top = '5 px';          // Moving 20 pixels down
    storedDataElement.style.left = '0px';         // Moving 30 pixels to the right
    storedDataElement.appendChild(styledText);
}





  if (currentExpenseElement) {
      currentExpenseElement.innerText = JSON.stringify(expenseValue);
  }

  if (inputElement) {
      inputElement.value = expenseValue;
  }
}

const retrieveAndDisplayExpenses = () => {
  const expenseData = localStorage.getItem("ExpenseData") || "{}";
  const parsedExpenseData = JSON.parse(expenseData);

  displayExpenseData("personal", parsedExpenseData);
  displayExpenseData("transportation", parsedExpenseData);
  displayExpenseData("school", parsedExpenseData);
  displayExpenseData("other", parsedExpenseData);
  generateCalendar(currentMonth.value, currentYear.value);
}

const generateCalendar = (month, year) => {
  const calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  const calendar_header_year = document.querySelector('#year');
  const days_of_month = [
    31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  const currentDate = new Date();

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  const first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement('div');

    if (i >= first_day.getDay()) {
      const dayNumber = i - first_day.getDay() + 1;
      day.innerHTML = dayNumber;

      if (
        dayNumber === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
      const storedData = getStoredExpenseData(dayNumber, month, year);
      if (storedData !== null) {
        Object.keys(storedData).forEach((type) => {
          const expenseDataElement = document.createElement('div');
            storedDataElements[type] = document.createElement('div');
            storedDataElements[type].classList.add('expense-input');
            day.appendChild(storedDataElements[type]);
        });
      }
    }
    calendar_days.appendChild(day);
  }
};
retrieveAndDisplayExpenses();

month_names.forEach((e, index) => {
  let month = document.createElement('div');
  month.innerHTML = `<div>${e}</div>`;

  month_list.append(month);
  month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hideTime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hideTime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hideTime');
    dateFormate.classList.add('showtime');
  };
});

function handleThumbsUp(expenseType) {
  // Add logic to display "Good job"
  alert("Good job");
}

function handleThumbsDown(expenseType) {
  // Add logic to display "Better luck next time"
  alert("Better luck next time");
}


(function () {
  month_list.classList.add('hideonce');
})();

document.querySelector('#pre-year').onclick = () => {
  --currentMonth.value;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    --currentYear.value;
  }
  generateCalendar(currentMonth.value, currentYear.value);
  retrieveAndDisplayExpenses()
};
document.querySelector('#next-year').onclick = () => {
  ++currentMonth.value;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    ++currentYear.value;
  }
  generateCalendar(currentMonth.value, currentYear.value);
  retrieveAndDisplayExpenses()
};

const currentDate = new Date();
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat('en-US', showCurrentDateOption).format(currentDate);
todayShowDate.textContent = currentDateFormate;

setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  const time = `${timer.getHours()}`.padStart(2, '0') +
    `:${`${timer.getMinutes()}`.padStart(2, '0')}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

  function saveExpenseData(expenseType) {
      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
      const expenseValue = parseFloat(document.querySelector(`[data-type="${expenseType}"] input`).value) || 0;
      const expenseData = localStorage.getItem("ExpenseData") || "{}";
      const parsedExpenseData = JSON.parse(expenseData);

      // Create a date key for the current day
    const currentDate = new Date();
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

      // Check if there is already stored data for the current day
    if (!parsedExpenseData[dateKey]) {
      parsedExpenseData[dateKey] = {};
    }

      parsedExpenseData[expenseType] = expenseValue;

      localStorage.setItem("ExpenseData", JSON.stringify(parsedExpenseData));

      // Display the stored expense data
      retrieveAndDisplayExpenses();
      generateCalendar(currentMonth.value, currentYear.value);
    }

    function handleThumbsDown(expenseType) {
      console.log('Thumbs Down clicked for ' + expenseType);
      const thumbsDownCountElement = document.getElementById("thumbsDownCount" + capitalizeFirstLetter(expenseType));

      // Increment the thumbs-down count and update the display
      let thumbsDownCount = parseInt(thumbsDownCountElement.textContent) || 0;
      thumbsDownCount++;
      thumbsDownCountElement.textContent = thumbsDownCount;
    }

    document.addEventListener("DOMContentLoaded", function () {
      document.querySelector('[data-type="personal"] button.thumbs-up').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsUp(expenseType);
      });

      document.querySelector('[data-type="personal"] button.thumbs-down').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsDown(expenseType);
      });

      document.querySelector('[data-type="transportation"] button.thumbs-up').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsUp(expenseType);
      });

      document.querySelector('[data-type="transportation"] button.thumbs-down').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsDown(expenseType);
      });

      document.querySelector('[data-type="school"] button.thumbs-up').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsUp(expenseType);
      });

      document.querySelector('[data-type="school"] button.thumbs-down').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsDown(expenseType);
      });

      document.querySelector('[data-type="other"] button.thumbs-up').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsUp(expenseType);
      });

      document.querySelector('[data-type="other"] button.thumbs-down').addEventListener('click', function () {
        const expenseType = this.closest('.expense-input').getAttribute('data-type');
        handleThumbsDown(expenseType);
      });

     const storedDataElement = document.getElementById("storedData" + capitalizeFirstLetter(expenseType));
      if (storedDataElement) {
          storedDataElement.innerText = "Stored Expense Data: " + JSON.stringify(parsedExpenseData[expenseType]);
      }
      let currentExpenseElement = document.getElementById("display" + capitalizeFirstLetter(expenseType) + "ExpenseData");
      if (currentExpenseElement) {
          currentExpenseElement.innerText = JSON.stringify(parsedExpenseData[expenseType]);
          generateCalendar(currentMonth.value, currentYear.value);
      }
      retrieveAndDisplayExpenses();

    document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('[data-type="personal"] button').addEventListener('click', function () {
      saveExpenseData('personal');
      retrieveAndDisplayExpenses();
  });

  document.querySelector('[data-type="transportation"] button').addEventListener('click', function () {
      saveExpenseData('transportation');
      retrieveAndDisplayExpenses();
  });

  document.querySelector('[data-type="school"] button').addEventListener('click', function () {
      saveExpenseData('school');
      retrieveAndDisplayExpenses();
  });

  document.querySelector('[data-type="other"] button').addEventListener('click', function () {
      saveExpenseData('other');
      retrieveAndDisplayExpenses();
  });
});
});

/*function updateCharts(parsedExpenseData) {
    // Example: Update Pie Chart
    updatePieChart(parsedExpenseData);

    // Example: Update Line Chart
    updateLineChart(parsedExpenseData);

    // Example: Update Bar Chart
    updateBarChart(parsedExpenseData);
}

// Example: Function to update the Pie Chart
function updatePieChart(parsedExpenseData) {
    var pieChartElement = document.getElementById('pie-chart');
    if (pieChartElement) {
        // Use parsedExpenseData to update your Pie Chart
        // Example: Create a Pie Chart using Chart.js
        var pieChart = new Chart(pieChartElement, {
            type: 'pie',
            data: {
                labels: Object.keys(parsedExpenseData),
                datasets: [{
                    data: Object.values(parsedExpenseData),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'], // Customize the colors as needed
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Expense Distribution'
                }
            }
        });
    }
}

// Example: Function to update the Line Chart
function updateLineChart(parsedExpenseData) {
    var lineChartElement = document.getElementById('line-chart');
    if (lineChartElement) {
        // Use parsedExpenseData to update your Line Chart
        // Example: Create a Line Chart using Chart.js
        var lineChart = new Chart(lineChartElement, {
            type: 'line',
            data: {
                labels: Object.keys(parsedExpenseData),
                datasets: [{
                    label: 'Expense Trend',
                    data: Object.values(parsedExpenseData),
                    borderColor: '#FF6384', // Customize the line color as needed
                    fill: false
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Expense Trend Over Time'
                }
            }
        });
    }
}

// Example: Function to update the Bar Chart
function updateBarChart(parsedExpenseData) {
    var barChartElement = document.getElementById('bar-chart');
    if (barChartElement) {
        // Use parsedExpenseData to update your Bar Chart
        // Example: Create a Bar Chart using Chart.js
        var barChart = new Chart(barChartElement, {
            type: 'bar',
            data: {
                labels: Object.keys(parsedExpenseData),
                datasets: [{
                    label: 'Expense Amount',
                    data: Object.values(parsedExpenseData),
                    backgroundColor: '#36A2EB' // Customize the bar color as needed
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Expense Comparison'
                }
            }
        });
    }
}*/
