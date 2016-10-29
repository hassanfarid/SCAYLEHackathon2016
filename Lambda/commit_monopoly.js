'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


var Request = function() {
    var payload = {};
    var task = '';

    function validateCreateRequest() {
        // @todo add code
        return true;
    }
    function validateJoinRequest() {
        // @todo add code
        return true;
    }

    var validateRequest = function(event) {
        if (!event.body || !event.pathParameters || !event.pathParameters.task)
            return false;

        payload = event.body;
        task = event.pathParameters.task;

        switch (task) {
            case 'create':
                return validateCreateRequest();
                break;
            case 'join':
                return validateJoinRequest();
                break;
            default:
                return false;
        }
    }

    var preocessRequest = function() {
        switch (task) {
            case 'create':
                return payload;
                break;
            case 'join':
                return payload;
                break;
            default:
                return null;
    }

    return {
        validate: validateRequest,
        process: preocessRequest
    }
}();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'POST':
            if (Request.validate(event)) {
                var response = Request.process();
                console.log('Response: ', JSON.stringify(response, null, 2));
                done(null, response);
            }
            else
                done({message:"body section missing from request"}, null);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};