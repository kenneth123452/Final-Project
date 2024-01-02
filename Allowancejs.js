function submitForm() {
    function submitForm() {
    var allowanceValue = document.getElementById("value").value;
    var allowanceValue2= document.getElementById("value").value;
    var allowanceValue3= document.getElementById("value").value;
    var dataToStore = {
        "Weekly Allowance": allowanceValue
        "Daily Allowance" : allowanceValue2
        "Monthly Allowance" : allowanceValue3
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
            "Stored Value: " + parsedData["Weekly Allowance"];
            "Stored Value: " + parsedData["Daily Allowance"];
            "Stored Value: " + parsedData["Monthly Allowance"];
    }

    window.history.back();
}
