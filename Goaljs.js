function setGoal() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = document.getElementById('time-frame').value;
    console.log(`Your goal of ${goalAmount} in ${timeFrame} has been set.`);
    
    updateProgressAndChart(goalAmount);
}

function updateProgressAndChart(goalAmount) {
    const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");
    
    if (retrievedRemainingAllowance !== null) {
        console.log("Retrieved Remaining Allowance: ₱" + retrievedRemainingAllowance);
        document.getElementById("displayRemainingAllowance").innerText = "Remaining Allowance: ₱" + retrievedRemainingAllowance;

        const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
        `;

        const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;
        console.log("Percentage Completion: " + percentageCompletion);
        
        updateProgressBar(percentageCompletion);
        createOrUpdateBarChart(retrievedRemainingAllowance, goalAmount);
    }
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

    if (window.myBarChart) {
        window.myBarChart.data = data;
        window.myBarChart.update();
    } else {
        window.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
}

