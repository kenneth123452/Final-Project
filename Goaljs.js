let goalAmount;

document.addEventListener('DOMContentLoaded', setGoal);

function setGoal() {
    return new Promise((resolve) => {
        const goalAmount = parseFloat(document.getElementById('goal-amount').value);
        const timeFrame = document.getElementById('time-frame').value;
        const selectedDay = localStorage.getItem('selectedDay');
        const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });

        const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");

        /*const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
        `;*/
        // Display the remaining allowance in the designated element
        const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
        console.log(remainingAllowanceDisplay);

        // Display the remaining allowance value (or default to goal amount if not retrieved)
        const displayedRemainingAllowance = retrievedRemainingAllowance || goalAmount;
        console.log("Remaining Allowance: ₱" + displayedRemainingAllowance);
        //remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + displayedRemainingAllowance;

        updateDisplayRemainingAllowance(retrievedRemainingAllowance, goalAmount);
        // Update progress and chart
        updateProgressAndChart(goalAmount, retrievedRemainingAllowance);

        const goalInfo = {
            goalAmount: goalAmount,
            timeFrame: timeFrame,
            completionDate: null, // Set to null initially
            remainingAllowance: goalAmount // Initialize remaining allowance with the goal amount
        };

        localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
        localStorage.setItem('timeFrame', timeFrame);
    });
}
    function updateProgressAndChart(goalAmount) {
        const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");
        const goalInfoString = localStorage.getItem('goalInfo');

        if (retrievedRemainingAllowance !== null && !isNaN(retrievedRemainingAllowance)) {
            const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;
            console.log("Percentage Completion: " + percentageCompletion);

            updateProgressBar(percentageCompletion);
            createOrUpdateBarChart(retrievedRemainingAllowance, goalAmount);
        }
    }

    function updateDisplayRemainingAllowance(remainingAllowance, goalAmount) {
        const remainingAllowanceDisplay = document.getElementById('displayRemainingAllowance');
        const displayedRemainingAllowance = remainingAllowance || goalAmount;
        remainingAllowanceDisplay.innerText = "Remaining Allowance: ₱" + displayedRemainingAllowance;
    }

    function updateProgressBar(percentage) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        progressBar.style.width = `${percentage}%`;
        progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;
    }

    function createOrUpdateBarChart(remainingAllowance, goalAmount) {
        const ctx = document.getElementById('barChart').getContext('2d');
        const data = {
            labels: ['Remaining Allowance', 'Goal'],
            datasets: [{
                label: 'Completion',
                data: [remainingAllowance, goalAmount - remainingAllowance],
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

    function submitGoal() {
        updateCompletionDate();
        window.location.href = "Daily.html";
    }

    function goBack() {
        window.location.href = "Expenses.html";
    }

    function showResultMessage(formattedGoalAmount, timeFrame) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
    `;
}
    
    function calculateRecommendedSpending() {
        const goalAmount = parseFloat(document.getElementById('goal-amount').value);
        const timeFrame = document.getElementById('time-frame').value;

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
}
