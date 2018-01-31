
var requestGet = function(url, onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {

        if (xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            onSuccess(json);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

var requestPost = function(url, json, onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {

        if (xhr.status === 200) {
            var json={};

            if(xhr.responseText){
                json = JSON.parse(xhr.responseText);
            }

            onSuccess(json);
        }
        else{
            var json = JSON.parse(xhr.responseText);
            onError(json);
        }
    };

    var jsonStr = '';

    if(json){
        jsonStr = JSON.stringify(json);
    }

    xhr.send(jsonStr);
}

var requestPut = function(url, json, onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {

        if (xhr.status === 200) {
            onSuccess();
        }
        else{
            var json = JSON.parse(xhr.responseText);
            onError(json);
        }
    };
    xhr.send(JSON.stringify(json));
}

var requestDelete = function(url, onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);
    xhr.onload = function() {

        if (xhr.status === 200) {
            onSuccess();
        }
        else{
            var json = JSON.parse(xhr.responseText);
            onError(json);
        }
    };

    xhr.send();
}
