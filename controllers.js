// initialize host
var host = "https://t3q6mcqbhi.execute-api.us-west-2.amazonaws.com/dev/";
//var host = "http://test.solnix.com.br/api/";

// initialize application environment variables
var app = {};

//app.init = function() {
//    console.log('app init');
//}

app.controllers = {};

/* initialize users controller */
app.controllers.users = {};

// get all users
app.controllers.users.listusers = function (callReturn) {
    ControlRequest.requestGet(host + 'users', function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

// get one user
app.controllers.users.getuser = function (parameter, callReturn) {
    ControlRequest.requestGetPathParam(host + 'user/{userid}', parameter, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

// insert update user
app.controllers.users.upsertuser = function (parameters, callReturn) {
    ControlRequest.requestPost(host + 'user', parameters, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}


// add user
app.controllers.users.adduser = function (parameters, onSuccess) {
    ControlRequest.requestPut(host + 'user', parameters, function (json) {
        onSuccess(json);
    });
}

// delete user
app.controllers.users.deleteuser = function (parameters, callReturn) {
    ControlRequest.requestDelete(host + 'user/delete/{userid}', parameters, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

// ==============================================================================
// SIMPLIFIED METHODS FOR THE CLIENT
// ==============================================================================

function getAllUsers(returnResult) {

    app.controllers.users.listusers( returnResult );
}

function getUser(id, returnResult) {

    app.controllers.users.getuser( id, returnResult );
}

function upsertUser(user, returnResult) {

    app.controllers.users.upsertuser( user, returnResult );
}

function deleteUser(id, returnResult) {

    app.controllers.users.deleteuser( id, returnResult );
}

// ==============================================================================
// HTTP METHODS FOR HTML CLIENT
// ==============================================================================

// get one user
app.controllers.users.getuserjs = function (parameter, callReturn) {
    ControlRequest.requestGetPathParam(host + 'users/{userid}', parameter, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

function getUserJS(id, returnResult) {

    app.controllers.users.getuserjs( id, returnResult );
}

// insert update user
app.controllers.users.upsertuserJS = function (parameters, callReturn) {
    ControlRequest.requestPost(host + 'users', parameters, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

function upsertUserJS(user, returnResult) {

    app.controllers.users.upsertuserJS( user, returnResult );
}

// delete user
app.controllers.users.deleteuserJS = function (parameters, callReturn) {
    ControlRequest.requestDelete(host + 'users/{userkey}', parameters, function (json) {
        callReturn(json);
    }, function(errorCode, errorMessage) {
        var json = new Object;
        json.errorCode = errorCode;
        json.errorMessage = errorMessage;
        json = JSON.parse(JSON.stringify(json));
        callReturn(json);
    });
}

function deleteUserJS(id, returnResult) {

    app.controllers.users.deleteuserJS( id, returnResult );
}




