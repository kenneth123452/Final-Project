const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector('.calendar');
const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

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

const generateCalendar = (month, year) => {
  let calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  let calendar_header_year = document.querySelector('#year');
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currentDate = new Date();

  month_picker.innerHTML = month_names[month];

  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement('div');

    if (i >= first_day.getDay()) {
      let dayNumber = i - first_day.getDay() + 1;
      day.innerHTML = dayNumber;

      if (
        dayNumber === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector('.month-list');
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

(function () {
  month_list.classList.add('hideonce');
})();


let currentMonth = { value: 0 };
let currentYear = { value: 2024 }; // Set your initial year here

document.querySelector('#pre-year').onclick = () => {
  --currentMonth.value;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    --currentYear.value;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
  ++currentMonth.value;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    ++currentYear.value;
  }
  generateCalendar(currentMonth.value, currentYear.value);
};

/*document.addEventListener("DOMContentLoaded", function () {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}*/


let currentDate = new Date();
//let currentMonth = { value: currentDate.getMonth() };
//let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

let todayShowTime = document.querySelector('.time-formate');
let todayShowDate = document.querySelector('.date-formate');

let currshowDate = new Date();
let showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
let currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  let timer = new Date();
  let option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  let formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  let time = `${timer.getHours()}`.padStart(2, '0') +
    `:${`${timer.getMinutes()}`.padStart(2, '0')}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

  document.addEventListener("DOMContentLoaded", function () {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
  function saveExpenseData(expenseType) {
    let expenseValue = parseFloat(document.getElementById(expenseType + "-expense").value) || 0;
    let expenseData = localStorage.getItem("ExpenseData") || "{}";
    let parsedExpenseData = JSON.parse(expenseData);

    // Update or add the expense type and value
    parsedExpenseData[expenseType] = expenseValue;

    localStorage.setItem("ExpenseData", JSON.stringify(parsedExpenseData));

    // Display the stored data
    let storedDataElement = document.getElementById("storedData" + capitalizeFirstLetter(expenseType));
    if (storedDataElement) {
      storedDataElement.innerText = "Stored Expense Data: " + JSON.stringify(parsedExpenseData[expenseType]);
    }

    // Display the current expense value
    let currentExpenseElement = document.getElementById("display" + capitalizeFirstLetter(expenseType) + "ExpenseData");
    if (currentExpenseElement) {
      currentExpenseElement.innerText = JSON.stringify(parsedExpenseData[expenseType]);
    }
    // Call the generateCalendar function with the current month and year
    generateCalendar(currentMonth.value, currentYear.value);
  }
      function retrieveAndDisplayExpenses() {
        var expenseData = localStorage.getItem("ExpenseData") || "{}";
        var parsedExpenseData = JSON.parse(expenseData);

        // Iterate over the expense types and display expenses for each card
        displayExpenseData("personal", parsedExpenseData);
        displayExpenseData("transportation", parsedExpenseData);
        displayExpenseData("school", parsedExpenseData);
        displayExpenseData("other", parsedExpenseData);
  }
    // Function to display expenses for a specific card
    function displayExpenseData(cardType, parsedExpenseData) {
      // Update the ID and input ID accordingly
      var expenseValue = parsedExpenseData[cardType] || 0;
      var storedDataElement = document.getElementById("storedData" + capitalizeFirstLetter(cardType));
      var currentExpenseElement = document.getElementById("display" + capitalizeFirstLetter(cardType) + "ExpenseData");
      var inputElement = document.getElementById(cardType + "-expense-input");

      if (storedDataElement) {
          storedDataElement.innerText = "Stored Expense Data: " + JSON.stringify(expenseValue);
      }

      if (currentExpenseElement) {
          currentExpenseElement.innerText = JSON.stringify(expenseValue);
      }

      if (inputElement) {
          inputElement.value = expenseValue;
      }
  }
    retrieveAndDisplayExpenses();
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
