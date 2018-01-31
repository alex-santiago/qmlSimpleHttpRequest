import QtQuick 2.9
import QtQuick.Controls 2.2

ApplicationWindow {
    visible: true
    width: 640
    height: 480
    title: qsTr("Scroll")

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
                text: "Code:"
            }
            TextField {
                id: tfCode
            }
            Label {
                text: "Description:"
            }
            TextField {
                id: tfDescription
            }
        }
        Row {
            height: 40
            anchors.top: column.bottom
            anchors.topMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 0
            anchors.left: parent.left
            anchors.leftMargin: 0
            Button {
               id: buttonLoad
               text: "Load"
               width: parent.width / 4 - 1
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
            }
            Rectangle {
                anchors.top: parent.top
                anchors.bottom: parent.bottom
                color: "black"
                width: 2
            }
            Button {
               id: buttonUpdate
               text: "Update"
               width: parent.width / 4 - 2
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
            }
        }
        ListView {
            id: listusers

        }

    }
}
