    var remainingAllowance;
    var goalAmount;

    document.addEventListener("DOMContentLoaded", function () {
        remainingAllowance = localStorage.getItem("RemainingAllowance");

        // Display the remaining allowance on the page
        var displayRemainingAllowanceElement = document.getElementById("displayRemainingAllowance");
        if (displayRemainingAllowanceElement && remainingAllowance !== null) {
            displayRemainingAllowanceElement.innerText = "RemainingAllowance: ₱" + remainingAllowance;
        }

        console.log("Remaining Allowance: ₱" + String(remainingAllowance));

        setGoal().then(() => {
            updateProgressAndChart();
        });

        document.getElementById('goal-amount').addEventListener('input', function () {
            goalAmount = parseFloat(this.value);
            if (!isNaN(goalAmount)) {
                createOrUpdateBarChart(parseFloat(remainingAllowance), goalAmount);
                updateProgressAndChart();
            }
        });
                createOrUpdateBarChart(parseFloat(remainingAllowance), goalAmount);
    });

    function calculateRecommendedSpending() {
        const goalAmount = parseFloat(document.getElementById('goal-amount').value);
        const timeFrame = document.getElementById('time-frame').value;

        // Use the correct key consistently
        const remainingAllowance = parseFloat(localStorage.getItem('Remaining Allowance')) || goalAmount;

        const currentDate = new Date();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        let daysDifference;

        switch (timeFrame) {
            case 'week':
                daysDifference = 7;
                break;
            case 'month':
                daysDifference = daysInMonth;
                break;
            case 'year':
                daysDifference = 365;
                break;
            default:
                daysDifference = 1;
        }

        const recommendedDailySpending = goalAmount / daysDifference;

        const resultDiv = document.getElementById('remain');
        resultDiv.innerHTML = `
            <h3>Recommended Daily Spending:</h3>
            <p>To reach your goal of ₱${goalAmount.toFixed(2)} in ${timeFrame},</p>
            <p>you should aim to spend approximately ₱${recommendedDailySpending.toFixed(2)} per day.</p>
        `;

        showResultMessage(formatCurrency(goalAmount), timeFrame);
        updateProgressBar((remainingAllowance / goalAmount) * 100);
    }

    function setGoal() {
        return new Promise((resolve) => {
            goalAmount = parseFloat(document.getElementById('goal-amount').value);
            const timeFrame = document.getElementById('time-frame').value;
            const selectedDay = localStorage.getItem('selectedDay');
            const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });

            const goalInfo = {
                goalAmount: goalAmount,
                timeFrame: timeFrame,
                completionDate: null,
                remainingAllowance: remainingAllowance || localStorage.getItem('Remaining Allowance')
            };

            localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
            localStorage.setItem('timeFrame', timeFrame);

            const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
            if (remainingAllowanceDisplay) {
                remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + remainingAllowance;
            } else {
                console.error("Element with id 'displayRemainingAllowance' not found");
            }

            // Update the remainingAllowance variable
            //remainingAllowance = remainingAllowance;

            resolve();
            updateProgressAndChart();

        });
    }

    function updateProgressAndChart() {
        if (!isNaN(remainingAllowance)) {
            remainingAllowance = localStorage.getItem("Remaining Allowance");
            goalAmount = parseFloat(localStorage.getItem('goalInfo')).goalAmount;
            const percentageCompletion = (remainingAllowance / goalAmount) * 100;

            updateProgressBar(percentageCompletion);
            createOrUpdateBarChart(parseFloat(remainingAllowance), goalAmount);
        }
    }

    function createOrUpdateBarChart(remainingAllowance, goalAmount) {
        const ctx = document.getElementById('barChart').getContext('2d');

            const goalInfoString = localStorage.getItem('goalInfo');
        if (!goalInfoString) {
            console.error("goalInfo not found in localStorage");
            return;
        }

        const goalInfo = JSON.parse(goalInfoString);
        //const goalAmount = goalInfo.goalAmount;

        const data = {
            labels: ['Remaining Allowance', 'goalAmount'],
            datasets: [

            {

                label: 'Remaining Allowance',
                data: [remainingAllowance, 0],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'], // Remaining Allowance color
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
            },

            {
                label: 'Goal',
            data: [goalAmount, 0],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],  // Goal completion color
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,

            }
        ]
    };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        if (window.myChart) {
            window.myChart.data = data;
            window.myChart.update();
        } else {
            window.myChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        }
    }

    function updateProgressBar(percentage) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        //const goalAmount = parseFloat(localStorage.getItem('goalInfo')).goalAmount;

        progressBar.style.width = `${percentage}%`;
        progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;

        //createOrUpdateBarChart(remainingAllowance, goalAmount)
    }

    function updateCompletionDate() {
        const goalInfoString = localStorage.getItem('goalInfo');
        if (goalInfoString !== null) {
            const goalInfo = JSON.parse(goalInfoString);
            goalInfo.completionDate = new Date().toLocaleDateString();
            localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
        }
    }

    document.getElementById('submitGoalButton').addEventListener('click', submitGoal);
    document.getElementById('backButton').addEventListener('click', goBack);

    function showResultMessage(formattedGoalAmount, timeFrame) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
        `;
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    }

    function submitGoal() {
        updateCompletionDate();
        window.location.href = "Daily.html";
    }

    function goBack() {
        window.location.href = "Expenses.html";
    }
