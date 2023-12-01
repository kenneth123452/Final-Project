function calculateRecommendedSpending() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = document.getElementById('time-frame').value;
    const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");

    const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
   
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
    `;
    
    if (retrievedRemainingAllowance !== null) {
        console.log("Retrieved Remaining Allowance: ₱" + retrievedRemainingAllowance);
        // Do something with the retrievedRemainingAllowance, such as displaying it on the page
        document.getElementById("displayRemainingAllowance").innerText = "Remaining Allowance: ₱" + retrievedRemainingAllowance;
        // Calculate percentage completion
        const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;
        console.log("Percentage Completion: " + percentageCompletion); // Debugging line
        // Update the progress bar and text
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

    // Check if the chart already exists
    if (window.myBarChart) {
        // Update existing chart
        window.myBarChart.data = data;
        window.myBarChart.update();
    } else {
        // Create a new chart
        window.myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
        /*function redirectToAnotherPage() {
    window.location.href = "Daily.html";
}

function goBack() {
    window.location.href = "Expenses.html";
}*/

