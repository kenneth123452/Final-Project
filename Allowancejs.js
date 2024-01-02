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
        document.getElementById("displayValue").innerText = Object.keys(parsedData)[0] + "\n" + Object.values(parsedData)[0];
    }

    window.history.back();
    }
