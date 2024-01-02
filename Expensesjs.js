// Retrieve the stored value
// Retrieve stored data
var storedData = localStorage.getItem("DataAllowance");

if (storedData) {
    var parsedData = JSON.parse(storedData);
    var weeklyAllowance = parsedData["Weekly Allowance"];
    document.getElementById("displayValue").innerText = "Weekly Allowance: ₱" + weeklyAllowance;
}

// Submit form function
function submitForm() {
    var expenseValue1 = parseFloat(document.getElementById("foodExpenses").value) || 0;
    var expenseValue2 = parseFloat(document.getElementById("transportationExpenses").value) || 0;
    var expenseValue3 = parseFloat(document.getElementById("schoolExpenses").value) || 0;
    var expenseValue4 = parseFloat(document.getElementById("other").value) || 0;

    // Calculate and display expenses
    calculateAndDisplayExpense("foodExpenses", expenseValue1);
    calculateAndDisplayExpense("transportationExpenses", expenseValue2);
    calculateAndDisplayExpense("schoolExpenses", expenseValue3);
    calculateAndDisplayExpense("other", expenseValue4);

    // Calculate and display total
    calculateAndDisplayTotal();

    console.log("Form submitted");
    return false;
}

// Calculate and display expense function
function calculateAndDisplayExpense(expenseType, expenseValue) {
    var currentTotal = parseFloat(localStorage.getItem(expenseType)) || 0;
    var newTotal = currentTotal + expenseValue;

    console.log(expenseType + " Expenses: ₱" + newTotal);
    localStorage.setItem(expenseType, newTotal);
}

// Calculate and display total function
function calculateAndDisplayTotal() {
    var expenseValue1 = parseFloat(document.getElementById("foodExpenses").value) || 0;
    var expenseValue2 = parseFloat(document.getElementById("transportationExpenses").value) || 0;
    var expenseValue3 = parseFloat(document.getElementById("schoolExpenses").value) || 0;
    var expenseValue4 = parseFloat(document.getElementById("other").value) || 0;

    var totalAllExpenses = expenseValue1 + expenseValue2 + expenseValue3 + expenseValue4;
    var remainingWeeklyAllowance = weeklyAllowance - totalAllExpenses;

    console.log("Total Weekly Expenses: ₱" + totalAllExpenses);
    document.getElementById("result").innerHTML = "Total Weekly Expenses: ₱" + totalAllExpenses;

    if (remainingWeeklyAllowance >= 0) {
        console.log("Remaining Weekly Allowance: ₱" + remainingWeeklyAllowance);
        document.getElementById("remainingAllowance").innerHTML = "Remaining Weekly Allowance: ₱" + remainingWeeklyAllowance;
        localStorage.setItem("Remaining Allowance", remainingWeeklyAllowance);
    }
}

// Redirect to another page function
function redirectToAnotherPage() {
    window.location.href = "Goal.html";
}

// Go back function
function goBack() {
    window.location.href = "Allowance.html";
}
