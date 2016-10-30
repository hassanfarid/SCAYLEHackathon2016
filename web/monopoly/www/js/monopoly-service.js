angular.module('starter.services').service('monopolyService', ['$http', 'appService', function ($http, appService) {

    // [POST] Create Game
    this.createGame = function (user) {
        return $http.post(appService.serviceURL + "monopoly/create", angular.toJson(user));
    };

    // [POST] Join Game
    this.joinGame = function (payload) {
        return $http.post(appService.serviceURL + "monopoly/join", angular.toJson(payload));
    };

    // [POST] Roll Dice
    this.rollDice = function (payload) {
        return $http.post(appService.serviceURL + "monopoly/move/rollDice", angular.toJson(payload));
    };


}]);