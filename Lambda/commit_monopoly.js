'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

// Source: http://jsfiddle.net/briguy37/2mvfd/
function generateUUID() {
    
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
var MonopolyDB = function() {

    var DB_operation_completed = false;
    var DB_operation_success = false;
    var TableName_Boards = "test_boards";    
    var params = {
        insert: {
            TableName: "test_boards",
            Item: {board_id:""},
        },
        select: {
            TableName: "test_boards",
            KeyConditionExpression: "board_id = :val",
            ExpressionAttributeValues: {
                ":val": ""
            }
        }
    }

    function reset() {
        DB_operation_completed = false;
        DB_operation_success = false;
    }
    function DB_requestCallback(err, res) {
        console.log("C");
        //callback
        if (err) {
            console.log("F");
            console.log(err.message);
            DB_operation_completed = true;
            DB_operation_success = false;
        }
        else {
            console.log("S");
            DB_operation_completed = true;
            DB_operation_success = true;
        }
    }

    var createGame = function(Item, callback_func) {
        reset();

        console.log("A");
        params.insert.Item = JSON.parse(JSON.stringify(Item));
        params.insert.TableName = TableName_Boards;
        console.log(params.insert);
        dynamo.putItem(params.insert, callback_func ? callback_func : DB_requestCallback);
        console.log("B");
    }
    var updateGame = function(Item) {
        createGame(Item);
    }
    var queryGame = function(board_id, callback_func) {
        reset();

        params.select.ExpressionAttributeValues = {":val": board_id};
        params.select.TableName = TableName_Boards;
        dynamo.query(params.select, callback_func ? callback_func : DB_requestCallback);
    }

    var get_DB_operation_completed = function() { return DB_operation_completed;}
    var get_DB_operation_success = function() { return DB_operation_success;}

    return {
        create: createGame,
        update: updateGame,
        query: queryGame,
        operationCompleted: get_DB_operation_completed,
        operationSuccess: get_DB_operation_success
    }
}();

var Monopoly = function() {

    const MAX_USER_PER_BOARD = 4;
    var userColors = ["yellow", "green", "red", "blue"];
    var currentGameState = {
        "board_id": "581274e5e8841a5d34292af1",
        "status": "in-play",
        "turn": 0,
        "view": "player",
        "user": [
            {
                "name": "Robert Marsh",
                "position": 0,
                "hash": "",
                "color": "yellow",
                "cash": 500000
            },
            {
                "name": "Margarita Day",
                "position": 0,
                "hash": "",
                "color": "green",
                "cash": 500000
            },
            {
                "name": "Latoya Middleton",
                "position": 0,
                "hash": "",
                "color": "red",
                "cash": 500000
            },
            {
                "name": "Barron Hess",
                "position": 0,
                "hash": "",
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

    function validateGameState(game_state) {
        //@todo - add code
        return true;
    }
    function validateUser(user_obj) {
        // @todo - add code

        return true;
    }
    function validateTurn(action_object) {
        //#todo - write code
        return true;
    }
    var saveToDB = function() {
        MonopolyDB.create(currentGameState, null);
    }

    var createNewGame = function(game_id) {
        currentGameState.board_id = game_id;
        currentGameState.user = [];
        return true;
    }
    var initializeGame = function(game_state) {
        if (!validateGameState(game_state))
            return false;

        currentGameState = game_state;
        return true;
    }

    var removeUserFunction = function(user_index) { // 0 - N-1
        var nUsers = currentGameState.user.length;
        if (nUsers <= user_index)
            return false;
        
        currentGameState.user = currentGameState.user.splice(user_index, 1);
        return ((nUsers-1) == currentGameState.user.length);
    }
    var addUserFunction = function(user_obj) {
        if (!validateUser(user_obj))
            return false;
        
        var nUsers = currentGameState.user.length;
        if (MAX_USER_PER_BOARD <= nUsers)
            return false;

        var user_item =  {
            "name": "Player " + nUsers+1,
            "position": 0,
            "hash": user_obj.user,
            "color": userColors[nUsers],
            "cash": 500000
        };
        currentGameState.user.push(user_item);
        return true;
    }

    var passOnTurn = function(action_obj) {
        // @toso - add code
        return true;
    }
    var buyOnTurn = function(action_obj) {
        // @toso - add code
        return true;
    }
    var payRentOnTurn = function(action_obj) {
        // @toso - add code
        return true;
    }

    var makeMove = function(action_obj) {
        if (!validateTurn(action_obj))
            return false;
    }

    var getGameState = function() { return currentGameState;}
    return {
        create: createNewGame,
        init: initializeGame,
        validate: validateGameState,
        save: saveToDB,
        
        addUser: addUserFunction,
        removeUser: removeUserFunction,

        move: makeMove,

        state: getGameState
    }
}();

var Request = function() {
    var payload = {};
    var task = '';

    function validateCreateRequest() {
        // @todo - add code
        return true;
    }
    function validateJoinRequest() {
        // @todo add code
        return true;
    }

    var validateRequest = function(event) {
        if (!event.body || !event.path)
            return false;
        
        payload = event.body;
        task = event.path;

        switch (task) {
            case '/monopoly/create':
                return validateCreateRequest();
            case '/monopoly/join':
                return validateJoinRequest();
            default:
                return false;
        }
    }

    function createServer() {
        var uuid = generateUUID();
        if (!Monopoly.create(uuid))
            return {
                status: "error",
                message: "Unable to create new board"
            };
        if (!Monopoly.addUser(payload))
            return {
                status: "error",
                message: "Unable to add new user"
            };
        
        Monopoly.save();

        return {
            status: "success",
            game_id: uuid,
            game_state: Monopoly.state()
        };
    }

    function joinServer() {
        // @todo - add code
        return {
            status: "error",
            message: "Not implemented"
        };
    }

    var preocessRequest = function() {
        switch (task) {
            case '/monopoly/create':
                return createServer();
            case '/monopoly/join':
                return joinServer();
            default:
                return null;
        }
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
        body: err ? JSON.stringify(err) : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'POST':
            if (Request.validate(event)) {
                var response = Request.process();
                if (response) {
                    console.log('Response: ', JSON.stringify(response, null, 2));
                    done(null, response);
                }
                else
                    done({status: "error", message:"response was null"}, null);
            }
            else
                done({status: "error", message:"Unknown Request Format" + JSON.stringify(event)}, null);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};