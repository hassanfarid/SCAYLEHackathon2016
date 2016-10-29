'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

var Monopoly = function() {

    const MAX_USER_PER_BOARD = 4;
    var currentGameState = {
        "board_id": "581274e5e8841a5d34292af1",
        "state": "in-play",
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
        "space": [
            {
                "name": "GO",
                "type": "go",
                "price": 0,
                "rent": 0,
                "color": "",
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
                "color": "",
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
                "color": "",
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
                "color": "",
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
        //@todo - add code
        return true;
    }
    function validateTurn(action_object) {
        //#todo - write code
        return true;
    }

    var createNewGame = function(game_id) {
        currentGameState.board_id = game_id;
        currentGameState.user = [];
        return currentGameState;
    }
    var initializeGame = function(game_state) {
        if (!validateGameState(game_state))
            return false;

        currentGameState = game_state;
        return true;
    }

    var removeUser = function(user_index) { // 0 - N-1
        var nUsers = currentGameState.user.length;
        if (nUsers <= user_index)
            return false;
        
        currentGameState.user = currentGameState.user.splice(user_index, 1);
        return ((nUsers-1) == currentGameState.user.length);
    }
    var addUser = function(user_obj) {
        if (!validateUser(user_obj))
            return false;
        
        var nUsers = currentGameState.user.length;
        if (MAX_USER_PER_BOARD <= nUsers)
            return false;

        currentGameState.user.push_back(user_obj);
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
        
        addUser: removeUser,
        removeUser: addUser,

        move: makeMove,

        state: getGameState
    }
}();

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
        // @todo - add code
        return {
            status: "success",
            game_id: "ABC-random-XYZ",
            game_state: {game_id: "ABC-random-XYZ"}
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
                done({status: "error", message:"Unknown Request Format"}, null);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};