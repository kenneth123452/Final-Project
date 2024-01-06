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

console.log('days_of_month:', days_of_month);
console.log('month:', month);
console.log('first_day:', first_day);

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

let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
  'en-US',
  showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
  const timer = new Date();
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
  let time = `${timer.getHours()}`.padStart(2, '0') +
    `:${`${timer.getMinutes()}`.padStart(2, '0')}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
  todayShowTime.textContent = formateTimer;
}, 1000);

function displayStoredDataContainer(expenseType, expenseValue) {
  // Create a new card element
  var card = document.createElement('div');
  card.className = 'card';
  card.id = expenseType + '-card';

  // Create elements within the card for displaying data
  var title = document.createElement('h2');
  title.textContent = capitalizeFirstLetter(expenseType) + ' Expenses';

  var input = document.createElement('input');
  input.type = 'number';
  input.id = expenseType + '-expense-input';
  input.placeholder = 'Enter expense value';

  var displayDataDiv = document.createElement('div');
  displayDataDiv.id = 'display' + capitalizeFirstLetter(expenseType) + 'ExpenseData';

  var storedDataDiv = document.createElement('div');
  storedDataDiv.id = 'storedData' + capitalizeFirstLetter(expenseType);
  storedDataDiv.textContent = 'Stored Expense Data: ' + JSON.stringify(expenseValue);

  var thumbsUpButton = document.createElement('button');
  thumbsUpButton.type = 'button';
  thumbsUpButton.className = 'thumbs-up';
  thumbsUpButton.textContent = 'Thumbs Up';

  var thumbsDownButton = document.createElement('button');
  thumbsDownButton.type = 'button';
  thumbsDownButton.className = 'thumbs-down';
  thumbsDownButton.textContent = 'Thumbs Down';

  // Append elements to the card
  card.appendChild(title);
  card.appendChild(input);
  card.appendChild(displayDataDiv);
  card.appendChild(storedDataDiv);
  card.appendChild(thumbsUpButton);
  card.appendChild(thumbsDownButton);

  // Append the card to the stored data container
  var storedDataContainer = document.getElementById('storedDataContainer');
  if (storedDataContainer) {
      storedDataContainer.appendChild(card);
  }
}

function saveExpenseData(expenseType) {
  var expenseValue = parseFloat(document.getElementById(expenseType + "-expense-input").value) || 0;
  var expenseData = localStorage.getItem("ExpenseData") || "{}";
  var parsedExpenseData = JSON.parse(expenseData);

  // Update or add the expense type and value
  parsedExpenseData[expenseType] = expenseValue;

  localStorage.setItem("ExpenseData", JSON.stringify(parsedExpenseData));

  displayStoredDataContainer(expenseType, parsedExpenseData[expenseType]);
  generateCalendar(currentMonth.value, currentYear.value);
}



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
