'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// submit users
module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userkey = requestBody.userkey;
  const userid = requestBody.userid;
  const username = requestBody.username;

  if (typeof userkey !== 'string' || typeof userid !== 'string' || typeof username !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit user because of validation errors.'));
    return;
  }

  submituserP(userInfo(userkey, userid, username))
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
            'x-custom-header' : 'custom header value',
            "Access-Control-Allow-Origin" : "*" 
        },
        body: JSON.stringify({
          message: `Sucessfully submitted user with username ${username}`,
          userid: res.userid
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        headers: {
            'x-custom-header' : 'custom header value',
            "Access-Control-Allow-Origin" : "*" 
        },
        body: JSON.stringify({
          message: `Unable to submit user with username ${username}`
        })
      })
    });
};


const submituserP = user => {
  console.log('Submitting user');
  const userInfo = {
    TableName: process.env.USERS_TABLE,
    Item: user,
  };
  return dynamoDb.put(userInfo).promise()
    .then(res => user);
};

const userInfo = (userkey, userid, username) => {
  const timestamp = new Date().getTime();
  var ukey = userkey
  if ((userkey === "-1") || (userkey === "")) { ukey = uuid.v1() }
  return {
    userkey: ukey,
    userid: userid,
    username: username,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

