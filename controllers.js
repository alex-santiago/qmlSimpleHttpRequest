// initialize host
var host = "http://all2sys.com/dev/admin/api/";

// initialize application environment variables
var app = {};

app.init = function() {

}

app.controllers = {};

/* users */
// get all users
app.controllers.users = {};
app.controllers.users.listusers = function (onSuccess) {
    requestGet(host + 'users', function (json) {
        onSuccess(json);
    });
}

// get one user
app.controllers.users.getuser = function (parameter, onSuccess) {
    requestGet(host + 'users/' + parameter, function (json) {
        onSuccess(json);
    });
}

// add user
app.controllers.users.adduser = function (parameters, onSuccess) {
    requestPut(host + 'users', parameters, function (json) {
        onSuccess(json);
    });
}

// delete user
app.controllers.users.deleteuser = function (parameters, onSuccess) {
    requestDelete(host + 'users', parameters, function (json) {
        onSuccess(json);
    });
}

//app.controllers.users = {};
//app.controllers.users.getlist = function (parameters, onSuccess) {
//    requestPost(host + 'users/getlist', parameters, function (json) {
//        onSuccess(json);
//    });
//}
