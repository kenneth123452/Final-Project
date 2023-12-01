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
        // Update the progress bar and text
        updateProgressBar(percentageCompletion);
      }
     /*const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
    `;*/
}

    function updateProgressBar(percentage) {
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');

      progressBar.style.width = `${percentage}%`;
      progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;
    }
