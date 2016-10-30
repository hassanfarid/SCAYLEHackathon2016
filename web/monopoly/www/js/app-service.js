(function() {
    angular.module('starter.services').factory('appService', ["$window", function($window) {

        /* Global Variables */
        var appServiceVariables = {

            // Key for using AES algo
            key: "monopoly",
            firstLoad: true,

            serviceURL: "https://wzz31he6pj.execute-api.us-west-2.amazonaws.com/dev/",
        };
        /* End of Global Variables */

        return appServiceVariables;
    }]);
})();
