'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


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
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    var board_id = "generated-GUID1";

    event = {
        httpMethod: 'GET',
        body: {
            "board_id": board_id,
            "status": "in-play",
            "turn": 0,
            "view": "player",
            "user": [
                {
                    "name": "Robert Marsh",
                    "position": 0,
                    "color": "yellow",
                    "cash": 500000
                },
                {
                    "name": "Margarita Day",
                    "position": 0,
                    "color": "green",
                    "cash": 500000
                },
                {
                    "name": "Latoya Middleton",
                    "position": 0,
                    "color": "red",
                    "cash": 500000
                },
                {
                    "name": "Barron Hess",
                    "position": 0,
                    "color": "blue",
                    "cash": 500000
                }
            ],
            "place": [
                {
                    "name": "GO",
                    "type": "go",
                    "price": 0,
                    "rent": 0,
                    "color": "black",
                    "star": 0,
                    "owner": -1
                },
                {
                    "name": "I.I Chundrigar Rd",
                    "type": "property",
                    "price": 25000,
                    "rent": 5000,
                    "color": "orange",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "M.A Jinnah Rd",
                    "type": "property",
                    "price": 50000,
                    "rent": 12000,
                    "color": "orange",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "Napier Rd",
                    "type": "property",
                    "price": 75000,
                    "rent": 30000,
                    "color": "orange",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "GO To Jail",
                    "type": "go_to_jail",
                    "price": 0,
                    "rent": 0,
                    "color": "black",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "Tipu Sultan Rd",
                    "type": "property",
                    "price": 25000,
                    "rent": 5000,
                    "color": "red",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "Zaibunissa St",
                    "type": "property",
                    "price": 50000,
                    "rent": 12000,
                    "color": "red",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "Zamzama St",
                    "type": "property",
                    "price": 75000,
                    "rent": 30000,
                    "color": "red",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "JAIL",
                    "type": "jail",
                    "price": 0,
                    "rent": 0,
                    "color": "black",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "Shaheed-e-Millat Rd",
                    "type": "property",
                    "price": 25000,
                    "rent": 5000,
                    "color": "yellow",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "University Rd",
                    "type": "property",
                    "price": 50000,
                    "rent": 12000,
                    "color": "yellow",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "Rashid Mihas Rd",
                    "type": "property",
                    "price": 75000,
                    "rent": 30000,
                    "color": "yellow",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "Parking",
                    "type": "parking",
                    "price": 0,
                    "rent": 0,
                    "color": "black",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "Jinnah Airport",
                    "type": "property",
                    "price": 25000,
                    "rent": 5000,
                    "color": "green",
                    "star": 1,
                    "owner": -1
                },
                {
                    "name": "Drigh Rd",
                    "type": "property",
                    "price": 50000,
                    "rent": 12000,
                    "color": "green",
                    "star": 2,
                    "owner": -1
                },
                {
                    "name": "Lyari Expressway",
                    "type": "property",
                    "price": 75000,
                    "rent": 30000,
                    "color": "green",
                    "star": 2,
                    "owner": -1
                }
            ]
        }
    };

    var params = {
        insert: {
            TableName: "test_boards",
            Item: event.body,
        },
        select: {
            TableName: "test_boards",
            KeyConditionExpression: "board_id = :val",
            ExpressionAttributeValues: {
                ":val": board_id
            }
        },
        update: {
            TableName: "test_boards",
            Key:{
                "board_id": board_id
            },
            UpdateExpression: "set place = :place, status = :status, turn = :turn, user = :user, view = :view",
            ExpressionAttributeValues:{
                ":num":1,
                ":place":event.body.space,
                ":status":event.body.status,
                ":user":event.body.user,
                ":view":event.body.view,
                ":turn":event.body.turn,
            },
            ReturnValues:"UPDATED_NEW"
        }
    };

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            dynamo.query(params.select, done);
            break;
        case 'POST':
            dynamo.putItem(params.insert, done);
            break;
        case 'PUT':
            dynamo.updateItem(params.update, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
