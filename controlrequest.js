
var requestGet = function(url, onSuccess, onError){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {

        if (xhr.status === 200 && xhr.readyState === 4) {
            var json = JSON.parse(xhr.responseText);
            onSuccess(json);
        }
        else if (xhr.status !== 200 && xhr.readyState === 4) {
            onError( xhr.status, 'Request failed. Status: ' + xhr.status + ' readyState: ' + xhr.readyState + ' responseText: ' + xhr.responseText );
        }
    };

    xhr.send();
}

var requestGetPathParam = function(url, param, onSuccess, onError){
    var xhr = new XMLHttpRequest();

    url = buildUrl(url, param);
    console.log('url');
    console.log(url);
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {

        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                if (xhr.responseText == '') {
                    var json = {};
                } else {
                    var json = JSON.parse(xhr.responseText);
                    onSuccess(json);
                }
            }
            else {
                onError( xhr.status, 'Request failed. Status: ' + xhr.status + ' readyState: ' + xhr.readyState + ' responseText: ' + xhr.responseText );
            }
        }
    };

    xhr.send();
}

var requestPost = function(url, json, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    console.log(1);
    console.log(url);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(2);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.OPENED) {
            console.log('OPENED');
        }
        if (xhr.readyState === xhr.LOADING){
            console.log('LOADING');
        }
        if (xhr.readyState === xhr.HEADERS_RECEIVED){
            console.log('HEADERS');
        }
        if (xhr.readyState === xhr.DONE) {
            console.log(3);
            if (xhr.status === 200) {
                var json={};
                console.log(4);
                if(xhr.responseText){
                    console.log(5);
                    json = JSON.parse(xhr.responseText);
                }
                console.log(6);
                onSuccess(json);
            }
            else {
                console.log(7);
                onError( xhr.status, 'Request failed. Status: ' + xhr.status + ' readyState: ' + xhr.readyState + ' responseText: ' + xhr.responseText );
            }
        }
    };

    var jsonStr = '';

    if(json){
        jsonStr = JSON.stringify(json);
    }
    console.log('jsonStr');
    console.log(jsonStr);
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

var requestDelete = function(url, param, onSuccess, onError){
    var xhr = new XMLHttpRequest();

    url = buildUrl(url, param);

    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {

        if (xhr.status === 200 && xhr.readyState === 4) {
            var json = JSON.parse(xhr.responseText);
            onSuccess(json);
        }
        else if (xhr.status !== 200 && xhr.readyState === 4) {
            onError( xhr.status, 'Request failed. Status: ' + xhr.status + ' readyState: ' + xhr.readyState + ' responseText: ' + xhr.responseText );
        }
    };

    xhr.send();
}

// ------------------------------------------------------
// API CLIENT FUNCTIONS
// ------------------------------------------------------
var paramToString = function (param) {
    if (param == undefined || param == null) {
        return 'null';
    }
    if (param instanceof Date) {
        return param.toJSON();
    }
    return param.toString();
}

// Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
var buildUrl = function (path, pathParams) {
//    if (!path.match(/^\//)) {
//        path = '/' + path;
//    }
    var url = path;

    url = url.replace(/\{([\w-]+)\}/g, function(fullMatch, key) {
        var value;
        if (pathParams.hasOwnProperty(key)) {
            value = paramToString(pathParams[key]);
        } else {
            value = paramToString(pathParams);
        }
        return encodeURIComponent(value);
    });
    return url;
}

/**
* Parses an ISO-8601 string representation of a date value.
* @param {String} str The date value as a string.
* @returns {Date} The parsed date object.
*/
var parseDate = function (str) {
    return new Date(str.replace(/T/i, ' '));
}

/**
* Converts a value to the specified type.
* @param {(String|Object)} data The data to convert, as a string or object.
* @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
* or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
* return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
* all properties on <code>data<code> will be converted to this type.
* @returns An instance of the specified type or null or undefined if data is null or undefined.
*/
var convertToType = function (data, type) {
    if (data === null || data === undefined)
        return data

    switch (type) {
        case 'Boolean':
            return Boolean(data);
        case 'Integer':
            return parseInt(data, 10);
        case 'Number':
            return parseFloat(data);
        case 'String':
            return String(data);
        case 'Date':
            return ApiClient.parseDate(String(data));
        case 'Blob':
            return data;
        default:
            if (type === Object) {
                // generic object, return directly
                return data;
            } else if (typeof type === 'function') {
                // for model type like: User
                return type.constructFromObject(data);
            } else if (Array.isArray(type)) {
                // for array type like: ['String']
                var itemType = type[0];

                return data.map(function (item) {
                    return ApiClient.convertToType(item, itemType);
                });
            } else if (typeof type === 'object') {
                // for plain object type like: {'String': 'Integer'}
                var keyType, valueType;
                for (var k in type) {
                    if (type.hasOwnProperty(k)) {
                        keyType = k;
                        valueType = type[k];
                        break;
                    }
                }

                var result = {};
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        var key = ApiClient.convertToType(k, keyType);
                        var value = ApiClient.convertToType(data[k], valueType);
                        result[key] = value;
                    }
                }

                return result;
            } else {
                // for unknown type, return the data directly
                return data;
            }
    }
}

