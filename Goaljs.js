let goalAmount;
let retrievedRemainingAllowance; // Declare the variable outside the setGoal function

document.addEventListener('DOMContentLoaded', () => {
    retrievedRemainingAllowance = parseFloat(localStorage.getItem("Remaining Allowance")) || 0;
        console.log("Retrieved Remaining Allowance: ₱" + retrievedRemainingAllowance);
    setGoal(); // or call other functions directly if needed
});

function setGoal() {
    return new Promise((resolve) => {

        goalAmount = parseFloat(document.getElementById('goal-amount').value);
        const timeFrame = document.getElementById('time-frame').value;
        const selectedDay = localStorage.getItem('selectedDay');
        const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });

        const goalInfo = {
            goalAmount: goalAmount,
            timeFrame: timeFrame,
            completionDate: null, // Set to null initially
            remainingAllowance: retrievedRemainingAllowance // Initialize remaining allowance with the goal amount
        };

        localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
        localStorage.setItem('timeFrame', timeFrame);

        const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
        /*console.log(remainingAllowanceDisplay);
        // Display the remaining allowance value (or default to goal amount if not retrieved)
        const displayedRemainingAllowance = retrievedRemainingAllowance || goalAmount;
        console.log("Remaining Allowance: ₱" + displayedRemainingAllowance);*/
        remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + retrievedRemainingAllowance;

        updateProgressAndChart();
        createOrUpdateBarChart();
    });
}
    function updateProgressBar(percentage) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const goalAmount = parseFloat(localStorage.getItem('goalInfo')).goalAmount;

        progressBar.style.width = `${percentage}%`;
        progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;

        //const retrievedRemainingAllowance = parseFloat(localStorage.getItem('Remaining Allowance')) || goalAmount;
        //const remainingAllowance = retrievedRemainingAllowance || goalAmount;
        //createOrUpdateBarChart(retrievedRemainingAllowance, goalAmount);
}

    /*function updateDisplayRemainingAllowance(remainingAllowance, goalAmount) {
        const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
        const displayedRemainingAllowance = remainingAllowance || goalAmount;
        remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + displayedRemainingAllowance;
    }*/

function updateProgressAndChart() {
    const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");
    const goalAmount = parseFloat(localStorage.getItem('goalInfo')).goalAmount;
    //const goalInfoString = localStorage.getItem('goalInfo');

    if (!isNaN(retrievedRemainingAllowance)) {
        const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;
        console.log("Percentage Completion: " + percentageCompletion);

        updateProgressBar(percentageCompletion);
        createOrUpdateBarChart();
    }
}

    function createOrUpdateBarChart(remainingAllowance, goalAmount) {
        const ctx = document.getElementById('barChart').getContext('2d');
        const data = {
            labels: ['Remaining Allowance', 'Goal'],
            datasets: [{
                label: 'Completion',
                data: [retrievedRemainingAllowance, goalAmount - retrievedRemainingAllowance],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Remaining Allowance color
                    'rgba(255, 99, 132, 0.2)'  // Goal completion color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
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

    function updateCompletionDate() {
        const goalInfoString = localStorage.getItem('goalInfo');
        if (goalInfoString !== null) {
            const goalInfo = JSON.parse(goalInfoString);
            goalInfo.completionDate = new Date().toLocaleDateString(); // Update completion date to the current date
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
    function calculateRecommendedSpending() {
        const goalAmount = parseFloat(document.getElementById('goal-amount').value);
        const timeFrame = document.getElementById('time-frame').value;

        const retrievedRemainingAllowance = parseFloat(localStorage.getItem('Remaining Allowance')) || goalAmount;

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
    updateProgressBar((retrievedRemainingAllowance / goalAmount) * 100);
    createOrUpdateBarChart(retrievedRemainingAllowance, goalAmount);
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
