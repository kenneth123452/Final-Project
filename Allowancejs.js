function submitForm() {
    function submitForm() {
    var allowanceType = document.getElementById("allowanceType").value;
    var allowanceValue = document.getElementById("value").value;

    var dataToStore = {
        [allowanceType]: allowanceValue
    };
    var jsonString = JSON.stringify(dataToStore);
    localStorage.setItem("DataAllowance", jsonString);

    //document.getElementById("displayValue").innerText = "Entered Value: " + allowanceValue;
    var index = "Expenses.html";
    window.location.href = index;
}

function goBack() {
    var storedData = localStorage.getItem("DataAllowance");
    if (storedData) {
        var parsedData = JSON.parse(storedData);
        document.getElementById("displayValue").innerText =
            "Stored Weekly Allowance: " + parsedData["Weekly Allowance"] + "\n" +
            "Stored Daily Allowance: " + parsedData["Daily Allowance"] + "\n" +
            "Stored Monthly Allowance: " + parsedData["Monthly Allowance"];
    }

    window.history.back();
    }
}
