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

expenses = [];

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

function displayAllExpenses(){
  let sum = 0
  for (let i = 0; i < expenses.length; i++ ) {
    var spantotalAllExpenses = document.getElementById('totalAllExpenses')
    spantotalAllExpenses.textContent = sum
}

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
    styledText.style.marginTop = 'px';    // Adding a margin of 10 pixels at the top

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
  /*const expenseData = localStorage.getItem("ExpenseData") || "{}";
  const parsedExpenseData = JSON.parse(expenseData);*/

  // Retrieve total expenses and remaining allowance
  var totalAllExpenses = localStorage.getItem("TotalExpenses");
  var remainingAllowance = localStorage.getItem("RemainingAllowance");

  // Do something with the values (e.g., display or use them as needed)
  console.log("Retrieved Total Expenses: ₱" + totalAllExpenses);
  console.log("Retrieved Remaining Allowance: ₱" + remainingAllowance);

  // Display total expenses and remaining allowance
  var totalAllExpensesDisplay = document.getElementById("totalAllExpenses");
  var remainingAllowanceDisplay = document.getElementById("remainingAllowance");

  totalAllExpensesDisplay.textContent = totalAllExpenses;
  remainingAllowanceDisplay.textContent = remainingAllowance;
  console.log(remainingAllowance + "test 2")

  /*displayExpenseData("personal", parsedExpenseData);
  displayExpenseData("transportation", parsedExpenseData);
  displayExpenseData("school", parsedExpenseData);
  displayExpenseData("other", parsedExpenseData);
  generateCalendar(currentMonth.value, currentYear.value);*/
}
document.addEventListener("DOMContentLoaded", function () {
  retrieveAndDisplayExpenses();
});

const generateCalendar = (month, year) => {
  const calendar_days = document.querySelector('.calendar-days');
  calendar_days.innerHTML = '';
  const calendar_header_year = document.querySelector('#year');
  const days_of_month = [
    31,   (year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  const currentDate = new Date();
  const secondDate = new Date(currentDate);
  const thirdDate = new Date(currentDate);
  const fourthDate = new Date(currentDate);
  const fifthDate = new Date(currentDate);
  const sixthDate = new Date(currentDate);
  const seventhDate = new Date(currentDate);
  const eightDate = new Date(currentDate);

  secondDate.setDate(currentDate.getDate() + 1);
  thirdDate.setDate(currentDate.getDate() + 2);
  fourthDate.setDate(currentDate.getDate() + 3);
  fifthDate.setDate(currentDate.getDate() + 4);
  sixthDate.setDate(currentDate.getDate() + 5);
  seventhDate.setDate(currentDate.getDate() + 6);
  eightDate.setDate(currentDate.getDate() + 7);

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  const first_day = new Date(year, month, 1);

  for (let i = 0; i < days_of_month[month] + first_day.getDay() - 1; i++) {
    const day = document.createElement('div');

    if (i >= first_day.getDay()) {
      const dayNumber = i - first_day.getDay() + 1;
      day.innerHTML = dayNumber;

      if (
        year === currentDate.getFullYear() &&
        dayNumber === currentDate.getDate() &&
        month === currentDate.getMonth()
      ) {
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === secondDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === thirdDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === fourthDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === fifthDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === sixthDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === seventhDate.getDate() &&
        month === currentDate.getMonth()
        ){
        day.classList.add('current-date');
      }
      if (
        year === currentDate.getFullYear() &&
        dayNumber === eightDate.getDate() &&
        month === currentDate.getMonth()
        ){
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

    function calculateExpense(category, action) {
      var inputField = document.getElementById('calculateInput').value;
      if (action === 'additon') {
          var inputValue = inputField;
          var parsedAllowance = Number(remainingAllowance.innerHTML)
          computedValue = parseInt(parsedAllowance - inputValue)

          expenses.push(inputField)

          var spanAllowance = document.getElementById('remainingAllowance')
          spanAllowance.textContent = computedValue
  }

   
}
}
