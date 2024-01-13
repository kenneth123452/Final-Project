var allowanceValue;

    document.addEventListener("DOMContentLoaded", function () {
            var storedData = localStorage.getItem("DataAllowance");
            if (storedData) {
                var parsedData = JSON.parse(storedData);
                var allowanceType = Object.keys(parsedData)[0];
                allowanceValue = Object.values(parsedData)[0];

                // Display the retrieved data
                var displayStoredDataElement= document.getElementById("displayStoredData");
                if (displayStoredDataElement) {
                    displayStoredDataElement.innerText = allowanceType + ":" + "₱" + allowanceValue;
                    displayStoredDataElement.id = "TotalExpenses"; // Replace "yourDesiredId" with the desired id value
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
                var remainingAllowance = calculateAndDisplayTotal();

                localStorage.setItem("RemainingAllowance", remainingAllowance);

                console.log("Form submitted");

                redirectToAnotherPage()

                return false;
            }

            // Save expense types and values function
            function saveExpenseData(expenseType, expenseValue) {
                var expenseData = localStorage.getItem("ExpenseData") || "{}";
                var parsedExpenseData = JSON.parse(expenseData);

                // Update or add the expense type and value
                parsedExpenseData[expenseType] = expenseValue;

                localStorage.setItem("ExpenseData", JSON.stringify(parsedExpenseData));
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

                if (!allowanceValue) {
                    alert("Allowance data not found. Please go back and enter allowance data.");
                    return;
                }

                var totalAllExpenses = expenseValue1 + expenseValue2 + expenseValue3 + expenseValue4;
                remainingAllowance = allowanceValue - totalAllExpenses;

                console.log("Total Expenses: ₱" + totalAllExpenses);

                var resultElement = document.getElementById("result");
                if (resultElement) {
                resultElement.innerHTML = "Total Expenses: ₱" + totalAllExpenses + "<br>Allowance: " + allowanceValue + "<br>Remaining Allowance: ₱" + remainingAllowance;
            } else {
                console.error("Element with id 'result' not found.");
            }

            var remainingAllowanceElement = document.getElementById("remainingAllowance");
            if (remainingAllowanceElement) {
                if (remainingAllowance >= 0) {
                    console.log("Remaining Allowance: ₱" + remainingAllowance);
                    remainingAllowanceElement.innerHTML = "Remaining Allowance: ₱" + remainingAllowance;
                    localStorage.setItem("Remaining Allowance", remainingAllowance);
                }
            }
            return remainingAllowance;
        }

            // Redirect to another page function
            function redirectToAnotherPage() {
                // Redirect to goal.html
                window.location.href = 'Goal.html';
            }
            // Go back function
            function goBack() {
                window.location.href = "Allowance.html";
            }
