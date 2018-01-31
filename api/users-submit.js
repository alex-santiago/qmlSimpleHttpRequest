'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// submit users
module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const userid = requestBody.userid;
  const username = requestBody.username;

  if (typeof userid !== 'string' || typeof username !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit user because of validation errors.'));
    return;
  }

  submituserP(userInfo(userid, username))
    .then(res => {
      callback(null, {
        statusCode: 200,
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

const userInfo = (userid, username, usergenre) => {
  const timestamp = new Date().getTime();
  return {
    userkey: uuid.v1(),
    userid: userid,
    username: username,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

