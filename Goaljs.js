function setGoal() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = document.getElementById('time-frame').value;
    const selectedDay = localStorage.getItem('selectedDay');
    const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
    `;

    updateProgressAndChart(goalAmount);

    const goalInfo = {
        goalAmount: goalAmount,
        timeFrame: timeFrame,
        completionDate: null, // Set to null initially
        remainingAllowance: goalAmount // Initialize remaining allowance with the goal amount
    };

    localStorage.setItem('goalInfo', JSON.stringify(goalInfo));
    localStorage.setItem('timeFrame', timeFrame);
}

function updateProgressAndChart(goalAmount) {
    const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");
    const goalInfoString = localStorage.getItem('goalInfo');
    
    if (retrievedRemainingAllowance !== null && !isNaN(retrievedRemainingAllowance)) {
        console.log("Retrieved Remaining Allowance: ₱" + retrievedRemainingAllowance);
        document.getElementById("displayRemainingAllowance").innerText = "Remaining Allowance: ₱" + retrievedRemainingAllowance;

        const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;
        console.log("Percentage Completion: " + percentageCompletion);
        
        updateProgressBar(percentageCompletion);
        createOrUpdateBarChart(retrievedRemainingAllowance, goalAmount);

        /*if (goalInfoString !== null) {
        const goalInfo = JSON.parse(goalInfoString);
        console.log("Retrieved Remaining Allowance: ₱" + goalInfo.remainingAllowance);
        document.getElementById("displayRemainingAllowance").innerText = "Remaining Allowance: ₱" + goalInfo.remainingAllowance;

        const percentageCompletion = (goalInfo.remainingAllowance / goalAmount) * 100;
        console.log("Percentage Completion: " + percentageCompletion);

        updateProgressBar(percentageCompletion);
        createOrUpdateBarChart(goalInfo.remainingAllowance, goalAmount);
        
        }*/
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
    updateCompletionDate()
    window.location.href = "Daily.html";
}
    function goBack() {
    window.location.href = "Expenses.html";
}
