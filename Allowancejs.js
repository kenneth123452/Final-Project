function submitForm() {
    var allowanceValue = document.getElementById("value").value;
    var dataToStore = {
        "Weekly Allowance": allowanceValue
    };
    var jsonString = JSON.stringify(dataToStore);
    localStorage.setItem("Weekly Allowance", jsonString);

    //document.getElementById("displayValue").innerText = "Entered Value: " + allowanceValue;
    var index = "Expenses.html";
    window.location.href = index;
}

function goBack() {
    var storedData = localStorage.getItem("Weekly Allowance");
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        document.getElementById("displayValue").innerText = "Stored Value: " + parsedData["Weekly Allowance"];
    }

    window.history.back();
}
