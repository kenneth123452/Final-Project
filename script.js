document.addEventListener("DOMContentLoaded", function () {
  const monthDisplay = document.getElementById("monthDisplay");
  const yearDisplay = document.getElementById("yearDisplay");
  const calendarDaysContent = document.getElementById("calendarDaysContent");
  const prevMonthButton = document.getElementById("prevMonthButton");
  const nextMonthButton = document.getElementById("nextMonthButton");

  let currentDate = new Date();

  function updateCalendar() {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    monthDisplay.textContent = new Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate);
    yearDisplay.textContent = currentDate.getFullYear();

    let day = firstDayOfMonth;
    let calendarHTML = "";

    while (day <= lastDayOfMonth) {
      calendarHTML += `<span>${day.getDate()}</span>`;
      day.setDate(day.getDate() + 1);
    }

    calendarDaysContent.innerHTML = calendarHTML;
  }

  function goToPreviousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  }

  function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  }

  prevMonthButton.addEventListener("click", goToPreviousMonth);
  nextMonthButton.addEventListener("click", goToNextMonth);

  updateCalendar();
});
