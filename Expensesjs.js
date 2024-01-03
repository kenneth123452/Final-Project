var allowanceValue;
document.addEventListener("DOMContentLoaded", function () {
    var storedData = localStorage.getItem("DataAllowance");
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        var allowanceType = Object.keys(parsedData)[0];
        var allowanceValue = Object.values(parsedData)[0];

         console.log("Allowance Type:", allowanceType);
        console.log("Allowance Value:", allowanceValue);

        // Display the retrieved data
        var displayStoredDataElement= document.getElementById("displayStoredData");
        if (displayStoredDataElement) {
            displayStoredDataElement.innerText = allowanceType + "\n" + allowanceValue;
        }
    }
});

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
        var remainingAllowance = allowanceValue - totalAllExpenses;

        console.log("Total Expenses: ₱" + totalAllExpenses);
        document.getElementById("result").innerHTML = "Total Expenses: ₱" + totalAllExpenses;

        if (remainingAllowance >= 0) {
            console.log("Remaining Weekly Allowance: ₱" + remainingAllowance);
            document.getElementById("remainingAllowance").innerHTML = "Remaining Allowance: ₱" + remainingAllowance;
            localStorage.setItem("Remaining Allowance", remainingAllowance);
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
