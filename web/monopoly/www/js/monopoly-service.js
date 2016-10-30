angular.module('starter.services').service('monopolyService', ['$http', 'appService', function ($http, appService) {

    // [POST] Submit Rating
    this.postRating = function (RatingDTO) {
        return $http.post(appService.serviceURL + "ratings", JSON.stringify(RatingDTO));
    };

    // [POST] Create Game
    this.createGame = function (encounterId) {
        return $http.post(appService.serviceURL + "monopoly/create", JSON.stringify({user: 1}));
    };


}]);