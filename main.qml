import QtQuick 2.9
import QtQuick.Controls 2.2

import "controllers.js" as Controllers
import "controlrequest.js"  as ControlRequest;

ApplicationWindow {
    visible: true
    width: 800
    height: 600
    title: qsTr("Scroll")    

    property var selectedUser: new Object
    property int currentRow: -1

    ScrollView {
        id: scrollView
        anchors.fill: parent

        Rectangle {
            id: title
            color: "Black"
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            height: 40
            Label {
                color: "white"
                text: "HttpRequest"
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.verticalCenter: parent.verticalCenter
            }
        }

        Column {
            id: column
            anchors.top: title.bottom
            anchors.topMargin: 10
            anchors.left: parent.left
            anchors.leftMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            spacing: 10
            Label {
                text: "User Key:"
            }
            Text {
                id: txUserKey
                text: "No user selected."
            }
            Label {
                text: "User Id:"
            }
            TextField {
                id: tfUserId
                width: parent.width * 0.75
            }
            Label {
                text: "User Name:"
            }
            TextField {
                id: tfUserName
                width: parent.width * 0.75
            }
        }
        Row {
            id: rowSolnix
            height: 40
            anchors.top: column.bottom
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.left: parent.left
            anchors.leftMargin: 0
            Button {
               id: buttonLoadAllSolnix
               text: "Solnix Load All"
               width: parent.width / 4 - 2
               onClicked: {
                   Controllers.host = "http://test.solnix.com.br/api/";
                   Controllers.getAllUsers(returnResultSolnix);
               }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonLoadOneSolnix
               text: "Solnix Load One"
               width: parent.width / 4 - 2
               onClicked: {
                   Controllers.host = "http://test.solnix.com.br/api/";
                   var param = new Object;
                   param.userid = "1";
                   Controllers.getUser(param, returnResultSolnix);
               }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonSaveSolnix
               text: "Solnix Save"
               width: parent.width / 4 - 2
               onClicked: {
                   Controllers.host = "http://test.solnix.com.br/api/";
                   var user = new Object;
                   user = createUser();
                   Controllers.upsertUser(user, returnResultSolnix);
               }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonDeleteSolnix
               text: "Solnix Delete"
               width: parent.width / 4
               onClicked: {
                   Controllers.host = "http://test.solnix.com.br/api/";
                   var param = new Object;
                   param.userid = "1";
                   Controllers.deleteUser(param, returnResultSolnix);
               }
            }
        }

        Row {
            id: row
            height: 40
            anchors.top: rowSolnix.bottom
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.left: parent.left
            anchors.leftMargin: 0
            Button {
                id: buttonNew
                text: "New"
                width: parent.width / 4 - 2
                onClicked: {
                    txUserKey.text = "No user selected"
                    tfUserId.text = ""
                    tfUserName.text = ""

                    currentRow = -1
                    selectedUser.userkey = "-1"
                    selectedUser.userid = ""
                    selectedUser.username = ""
                }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonLoad
               text: "Load"
               width: parent.width / 4 - 2
               onClicked: {
                   txUserKey.text = "No user selected"
                   tfUserId.text = ""
                   tfUserName.text = ""

                   currentRow = -1
                   selectedUser.userkey = "-1"
                   selectedUser.userid = ""
                   selectedUser.username = ""

                   Controllers.getAllUsers(returnResult);
               }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonSave
               text: "Save"
               width: parent.width / 4 - 2
               onClicked: {
                   var user = new Object;
                   user = createUserJS();
                   Controllers.upsertUserJS(user, returnResult);
               }
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonDelete
               text: "Delete"
               width: parent.width / 4
               onClicked: {
                   var param = new Object;
                   param.userkey = selectedUser.userkey
                   Controllers.deleteUserJS(param, returnResultDelete);
                   Controllers.getAllUsers(returnResult);
               }
            }
        }
        ListModel {
            id: usersModel
        }
        Component {
            id: userComponent
            Row {
                id: userRow
                spacing: 20
                Rectangle {
                    color: "white"
                    border.color: "white"
                    width: scrollView.width
                    height: 30
                    Row {
                        Text {
                            color: "#000"
                            text: "userid: " + userid
                        }
                        Text {
                            color: "#000"
                            text: " username: " + username
                        }
                        Text {
                            color: "#000"
                            text: " userkey: " + userkey
                        }
                    }
                    MouseArea {
                        anchors.fill: parent
                        onClicked: {
                            selectedUser.userkey = usersModel.get(index).userkey
                            selectedUser.userid = usersModel.get(index).userid
                            selectedUser.username = usersModel.get(index).username

                            currentRow = index
                            txUserKey.text = selectedUser.userkey
                            tfUserId.text = selectedUser.userid
                            tfUserName.text = selectedUser.username
                        }
                    }
                }
            }
        }

        Rectangle {
            id: rect
            color: "#000"
            anchors.top: row.bottom
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.left: parent.left
            anchors.leftMargin: 0
            anchors.bottom: parent.bottom

            ListView {
                id: listusers
                anchors.fill: parent
                model: usersModel
                delegate: userComponent
                focus: true
                onCurrentItemChanged: {
                    listusers.currentItem.focus
                }
            }
        }

    }

    function returnResultSolnix(result) {
        txUserKey.text = "No user selected"
        tfUserId.text = ""
        tfUserName.text = ""

        if (result.errorCode) {
            console.log('result with error');
            console.log(JSON.stringify(result));
        }
        else {
            console.log('result no error');
            console.log(JSON.stringify(result));
        }
        tfUserId.text = JSON.stringify(result);
    }

    function returnResult(result) {
        if (result.errorCode) {
            console.log('result with error');
            console.log(JSON.stringify(result));
        }
        else {
            console.log('result no error');
            console.log(JSON.stringify(result));
            var users =  Object(result.users);
            usersModel.clear();
            for (var i = 0; i<users.length; i++) {
                usersModel.append(users[i]);
            }
            listusers.model = usersModel;
        }
    }

    function returnResultDelete(result) {
        if (result.errorCode) {
            console.log('result with error');
            console.log(JSON.stringify(result));
        }
        else {
            txUserKey.text = "No user selected"
            tfUserId.text = ""
            tfUserName.text = ""

            currentRow = -1
            selectedUser.userkey = "-1"
            selectedUser.userid = ""
            selectedUser.username = ""
            console.log('result no error');
            console.log(JSON.stringify(result));
            var users =  Object(result.users);
            usersModel.clear();
            for (var i = 0; i<users.length; i++) {
                usersModel.append(users[i]);
            }
            listusers.model = usersModel;
        }
    }

    function createUserJS() {
        var newUser = new Object;

        newUser.userkey = selectedUser.userkey;
        newUser.userid = tfUserId.text;
        newUser.username = tfUserName.text;

        return newUser;
    }

    function createUser() {
        var period = [];

        period.push(new Object);

        period[0].sunday = false; // **Boolean** [optional]
        period[0].monday = true; // **Boolean** [optional]
        period[0].tuesday = true; // **Boolean** [optional]
        period[0].wednesday = true; // **Boolean** [optional]
        period[0].thursday = true; // **Boolean** [optional]
        period[0].friday = true; // **Boolean** [optional]
        period[0].saturday = false; // **Boolean** [optional]
        period[0].initial_time = "08:00"; // **String** "hh:mm" [optional]
        period[0].final_time = "18:00"; // **String** "hh:mm" [optional]

        period.push(new Object);

        period[1].sunday = true; // **Boolean** [optional]
        period[1].monday = false; // **Boolean** [optional]
        period[1].tuesday = false; // **Boolean** [optional]
        period[1].wednesday = false; // **Boolean** [optional]
        period[1].thursday = false; // **Boolean** [optional]
        period[1].friday = false; // **Boolean** [optional]
        period[1].saturday = true; // **Boolean** [optional]
        period[1].initial_time = "08:00"; // **String** "hh:mm" [optional]
        period[1].final_time = "12:00"; // **String** "hh:mm" [optional]

        var newUser = new Object;

        newUser.name = "Andre Paim Lemos"; // **String** [optional]
        newUser.administrator = true; // **Boolean** [optional]
        newUser.registration_number = "A23478237984"; // **String** [optional]
        newUser.face_access_allowed = true; // **Boolean** [optional]
        newUser.password_access_allowed = true; // **Boolean** [optional]
        newUser.rfid_access_allowed = true; // **Boolean** [optional]
        newUser.initial_access_time = "2018-01-01T08:00:00Z"; // **String** "YYYY-MM-DDTHH:mm:SSZ" [optional]
        newUser.final_access_time = "2018-12-31T00:00:00Z"; // **String** "YYYY-MM-DDTHH:mm:SSZ" [optional]
        newUser.password = "avra-cadabra"; // **String** [optional]
        newUser.rfid = "CT0001"; // **String** [optional]
        newUser.access_periods = period; // **[AccessPeriod]** [optional]

        return newUser;
    }
}
