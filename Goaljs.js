var remainingAllowance = 0;
var goalAmount = 0;

window.myChart = null;

document.addEventListener("DOMContentLoaded", function () {
    remainingAllowance = localStorage.getItem("RemainingAllowance");

    // Display the remaining allowance on the page
    var displayRemainingAllowanceElement = document.getElementById("displayRemainingAllowance");
    if (displayRemainingAllowanceElement && remainingAllowance !== null) {
        remainingAllowance = parseFloat(localStorage.getItem("RemainingAllowance")) || 0;
        displayRemainingAllowanceElement.innerText = "RemainingAllowance: ₱" + remainingAllowance;
    }

    goalAmount = parseFloat(document.getElementById('goal-amount').value);

    setGoal().then(() => {
        if (!isNaN(goalAmount) && goalAmount > 0) {
            initializeBarChart(remainingAllowance, goalAmount);
            updateProgressAndChart(remainingAllowance, goalAmount);
        }
    });

    document.getElementById('goal-amount').addEventListener('input', function () {
        goalAmount = parseFloat(this.value);
        if (!isNaN(goalAmount)) {
            console.log("Input Goal Amount:", goalAmount);
            setGoal().then(() => {
                initializeBarChart(remainingAllowance, goalAmount);
                updateProgressAndChart(remainingAllowance, goalAmount);
                createOrUpdateBarChart();
            });
        }
    });

    document.getElementById('submitGoalButton').addEventListener('click', submitGoal);
    document.getElementById('backButton').addEventListener('click', goBack);
});

function calculateRecommendedSpending() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = document.getElementById('time-frame').value;

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

        const goalInfo = {
            goalAmount: goalAmount,
            timeFrame: timeFrame,
            completionDate: null,
            remainingAllowance: remainingAllowance || localStorage.getItem('Remaining Allowance')
        };

        localStorage.setItem('goalInfo', JSON.stringify(goalInfo));

        const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
        if (remainingAllowanceDisplay) {
            remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + remainingAllowance;
        } else {
            console.error("Element with id 'displayRemainingAllowance' not found");
        }
        createOrUpdateBarChart();
        updateProgressAndChart(remainingAllowance, goalAmount);
        resolve();
    });
}

function initializeBarChart(remainingAllowance, goalAmount) {
    const ctx = document.getElementById('barChart').getContext('2d');

    const data = getChartData(remainingAllowance, goalAmount);
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

function getChartData(remainingAllowance, goalAmount) {
    return {
        labels: ['Remaining Allowance', 'Goal'],
        datasets: [
            {
                label: ['Remaining Allowance', 'Goal'],
                data: [remainingAllowance, goalAmount],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'], // Remaining Allowance color
                borderColor: ['rgba(255, 99, 132, 0.2)'], // Goal completion color
                borderWidth: 1
            },
            /*{
                label: 'Goal',
                data: [goalAmount, 0],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'], // Goal completion color
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            }*/
        ]
    };
}

function createOrUpdateBarChart() {
    if (window.myChart === null) {
        console.error("Chart not initialized. Ensure initializeBarChart is called first.");
        return;
    }

    const data = getChartData(remainingAllowance, goalAmount);

    // Use update method to refresh the chart
    window.myChart.data = data;
    window.myChart.update();
}

function updateProgressAndChart(remainingAllowance, goalAmount) {
    remainingAllowance = parseFloat(localStorage.getItem("Remaining Allowance")) || 0;
    goalAmount = parseFloat(localStorage.getItem('goalInfo'))?.goalAmount || 0;

    if (!isNaN(remainingAllowance)) {
        const percentageCompletion = (remainingAllowance / goalAmount) * 100;
        updateProgressBar(percentageCompletion);
        getChartData(remainingAllowance, goalAmount);
    }
}

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;
}

function updateCompletionDate() {
    const goalInfoString = localStorage.getItem('goalInfo');
    if (goalInfoString !== null) {
        const goalInfo = JSON.parse(goalInfoString);
        goalInfo.completionDate = new Date().toLocaleDateString();
        localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
    }
}

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
