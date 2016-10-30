// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'starter.controllers', 'starter.services', 'satellizer'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(['$stateProvider', '$urlRouterProvider', '$ionicCloudProvider', '$authProvider',
    function ($stateProvider, $urlRouterProvider, $ionicCloudProvider, $authProvider) {

      $authProvider.loginRedirect = '/game/new';

      $authProvider.facebook({
        clientId: '333125333711603',
        redirectUri: (window.location.origin || window.location.protocol + '//' + window.location.host) + '/',
      });

      $authProvider.google({
        clientId: 'Google Client ID'
      });

      $authProvider.github({
        clientId: 'GitHub Client ID'
      });

      $authProvider.linkedin({
        clientId: 'LinkedIn Client ID'
      });

      $authProvider.instagram({
        clientId: 'Instagram Client ID'
      });

      $authProvider.yahoo({
        clientId: 'Yahoo Client ID / Consumer Key'
      });

      $authProvider.live({
        clientId: 'Microsoft Client ID'
      });

      $authProvider.twitch({
        clientId: 'Twitch Client ID'
      });

      $authProvider.bitbucket({
        clientId: 'Bitbucket Client ID'
      });

      $authProvider.spotify({
        clientId: 'Spotify Client ID'
      });

      // No additional setup required for Twitter
      // Twitter
      $authProvider.twitter({
        url: '/auth/twitter'
      });

      $authProvider.oauth2({
        name: 'foursquare',
        url: '/auth/foursquare',
        clientId: 'Foursquare Client ID',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
      });


      $ionicCloudProvider.init({
        "core": {
          "app_id": "4117d899"
        }
      });

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.dash', {
          url: '/dash',
          views: {
            'tab-dash': {
              templateUrl: 'templates/tab-dash.html',
              controller: 'DashCtrl'
            }
          }
        })

        .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl'
            }
          }
        })
        .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-detail.html',
              controller: 'ChatDetailCtrl'
            }
          }
        })

        .state('tab.account', {
          url: '/account',
          views: {
            'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

    }])
  .run(function ($ionicPlatform, appService) {
    
  });
