angular.module('starter.directives', [])
    .directive('inProgress', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                var text = element.html();

                var showSpinner = function () {
                    element.html('<span><ion-spinner icon="ripple"></ion-spinner></span>');
                };

                var hideSpinner = function () {
                    element.html(text);
                };

                attributes.$observe('inProgress', function (value) {
                    if (value == "true") {
                        showSpinner();
                    }
                    else {
                        hideSpinner();
                    }
                });
            }
        };
    });