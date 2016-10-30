angular.module('starter.services').service('monopolyService', ['$http', 'appService', function ($http, appService) {

    // [POST] Create Game
    this.createGame = function (user) {
        return $http.post(appService.serviceURL + "monopoly/create", angular.toJson(user));
    };


}]);