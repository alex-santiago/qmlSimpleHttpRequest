'use strict';

const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// list all users
module.exports.listall = (event, context, callback) => {
    var params = {
        TableName: process.env.USERS_TABLE,
        ProjectionExpression: "userkey, userid, username, submittedAt"
    };

    console.log("Scanning user table.");
    const onScan = (err, data) => {

        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err, { 
                statusCode: 400,
                headers: {
                    'x-custom-header' : 'custom header value',
                    "Access-Control-Allow-Origin" : "*" 
                },
                body: JSON.stringify(err, null, 2)
            });
        } else {
            console.log("Scan succeeded.");
            return callback(null, {
                statusCode: 200,
                headers: {
                    'x-custom-header' : 'custom header value',
                    "Access-Control-Allow-Origin" : "*" 
                },
                body: JSON.stringify({
                    users: data.Items
                })
            });
        }

    };

    dynamoDb.scan(params, onScan);

};
