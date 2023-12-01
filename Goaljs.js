function calculateRecommendedSpending() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const timeFrame = document.getElementById('time-frame').value;
    const retrievedRemainingAllowance = localStorage.getItem("Remaining Allowance");

    const formattedGoalAmount = goalAmount.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your goal of ${formattedGoalAmount} in ${timeFrame} has been set.</p>
    `;
    const suggestions = getSuggestions(); // Replace this with your actual function or API call

      // Display suggestions
    displaySuggestions(suggestions);
    
    if (retrievedRemainingAllowance !== null) {
        console.log("Retrieved Remaining Allowance: ₱" + retrievedRemainingAllowance);

        // Do something with the retrievedRemainingAllowance, such as displaying it on the page
        document.getElementById("displayRemainingAllowance").innerText = "Remaining Allowance: ₱" + retrievedRemainingAllowance;

        // Calculate percentage completion
        const percentageCompletion = (retrievedRemainingAllowance / goalAmount) * 100;

        // Update the progress bar and text
        updateProgressBar(percentageCompletion);
      }
}

    function updateProgressBar(percentage) {
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');

      progressBar.style.width = `${percentage}%`;
      progressText.innerText = `Progress: ${percentage.toFixed(2)}%`;
    }

    function getSuggestions() {
      // For demonstration purposes, using a simple array
      return [
        "Consider reducing dining out expenses.",
        "Explore cost-effective subscription plans.",
        "Look for additional income sources.",
        // Add more suggestions as needed
      ];
    }

    // Function to display suggestions
    function displaySuggestions(suggestions) {
      const suggestionList = document.getElementById('suggestion-list');
      suggestionList.innerHTML = ''; // Clear existing suggestions

      suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionList.appendChild(li);
      });
    }
