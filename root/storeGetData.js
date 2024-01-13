function storeData(key, value, callback) {
    const url = 'https://surfnet.website/ron/post/';
    const apiKey = 'ronvinz';

    fetch(url, {
        method: 'POST',
        headers: {
            'key': key,
            'value': value,
            'x-api-key': apiKey,
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(response => response.json())
        .then(responseData => {
            callback(null, responseData); // Pass null as the error parameter and responseData as the result
        })
        .catch(error => {
            callback(error, null); // Pass the error and null as the result
        });
}

function getData(key, callback) {
    const url = 'https://surfnet.website/ron/get/';
    const apiKey = 'ronvinz';

    fetch(url, {
        method: 'GET',
        headers: {
            'key': key,
            'x-api-key': apiKey,
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then(response => response.json())
        .then(responseData => {
            callback(null, responseData); // Pass null as the error parameter and responseData as the result
        })
        .catch(error => {
            callback(error, null); // Pass the error and null as the result
        });
}