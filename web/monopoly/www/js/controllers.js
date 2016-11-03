angular.module('starter.controllers', [])

  .controller('ParentCtrl', function ($scope, appService) {

    $scope.appService = function () {
      return appService;
    }

    if (appService.firstLoad) {

      var appServiceToString;
      var encrypted;
      if ((angular.isDefined(sessionStorage.appServiceVariables)) && (sessionStorage.appServiceVariables !== null)) {

        try {
          var decrypted = CryptoJS.AES.decrypt(sessionStorage.appServiceVariables, appService.key).toString(CryptoJS.enc.Utf8);
          var temp = JSON.parse(decrypted);

          appService.isLoggedIn = temp.isLoggedIn;
          appService.user = temp.user;
          appService.gameState = temp.gameState;
          appService.isError = false;
          appService.error = {};
          appServiceToString = JSON.stringify(appService);
          encrypted = CryptoJS.AES.encrypt(appServiceToString, appService.key);
          sessionStorage.appServiceVariables = encrypted.toString();
          // sessionStorage.appServiceVariables = JSON.stringify(appService);
          if (appService.isLoggedIn) {
            // connect to pubnub
          }
        } catch (err) {
          //console.log(err);
          sessionStorage.clear();
          appServiceToString = JSON.stringify(appService);
          encrypted = CryptoJS.AES.encrypt(appServiceToString, appService.key);
          sessionStorage.appServiceVariables = encrypted.toString();
        }
      } else {
        // Encrypting and then saving to the session storage
        appService.user = 'guest' + Date.now();
        appServiceToString = JSON.stringify(appService);
        encrypted = CryptoJS.AES.encrypt(appServiceToString, appService.key);
        sessionStorage.appServiceVariables = encrypted.toString();
      }
      // Add mutation watcher on appServiceVariables, incase of change update in sessionStorage
      $scope.$watch(function () {
        return appService;
      }, function (newVal, oldVal) {
        var appServiceToString = JSON.stringify(newVal);
        var encrypted = CryptoJS.AES.encrypt(appServiceToString, appService.key);
        sessionStorage.appServiceVariables = encrypted.toString();
      }, true);
      appService.firstLoad = false;
    }
  })

  // Actual Monopoly Board Controller
  .controller('DashCtrl', function ($rootScope, $scope, $ionicAuth, $ionicUser, $auth, monopolyService, $stateParams, appService, Pubnub) {
    console.log($auth.isAuthenticated());
    console.log(angular.toJson($auth.getPayload()));
    console.log(appService.user);

    $scope.gameState = {};
    $scope.asyncTaskInProgress = false;

    // Start game if not yet started
    if (appService.gameState == null) {
      create();
    }
    else {
      console.log("Joining existing game");
      join(appService.gameState.game_id);
    }

    function create() {
      var payload = {
        user: appService.user
      }
      $scope.asyncTaskInProgress = true;
      monopolyService.createGame(payload)
        .success(function (data) {
          console.log(data);
          appService.gameState = angular.copy(data.game_state);
          $scope.gameState = angular.copy(data.game_state);
          subscribeUpdates();
        })
        .error(function (error) {
          console.log(error);
        })
        .finally(function () {
          $scope.asyncTaskInProgress = false;
        });
    }

    function join(gameId) {
      var payload = {
        user: appService.user,
        game_id: gameId
      };
      $scope.asyncTaskInProgress = true;
      monopolyService.joinGame(payload)
        .success(function (data) {
          console.log(data);
          $scope.gameState = angular.copy(data.game_state);
          appService.gameState = angular.copy(data.game_state);
          subscribeUpdates();
        })
        .error(function (error) {
          console.log(error);
        })
        .finally(function () {
          $scope.asyncTaskInProgress = false;
        });
    }

    Pubnub.init({
      publish_key: 'pub-c-82772049-53f1-4515-8458-65e353717814',
      subscribe_key: 'sub-c-1ac7aae8-9ea9-11e6-a0c0-0619f8945a4f',
      ssl : (('https:' == document.location.protocol) ? true : false)
    });

    function subscribeUpdates() {

      Pubnub.subscribe({
        channel: $scope.gameState.game_id,
        message: function (m) {
          var temp = angular.fromJson(m);

          $scope.$apply(function () {
            $scope.gameState = angular.copy(temp);
            appService.gameState = angular.copy(temp);
          });
        },
        error: function (error) {
          // Handle error here
          console.log("error = " + JSON.stringify(error));
        }
      });

      $rootScope.$on(Pubnub.getMessageEventNameFor($scope.gameState.game_id), function (ngEvent, envelope) {
        $scope.$apply(function () {
          // add message to the messages list
          console.log(envelope);
        });
      });
    }

    function cancelUpdates() {
      console.log('cancel = ' + appService.gameState.game_id);
      Pubnub.unsubscribe({
        channel: [appService.gameState.game_id]
      });
    }

    // Join from gameId provided by user
    $scope.joinGame = function () {
      cancelUpdates();
      var gameId = appService.gameState.game_id;
      appService.gameState = null;
      join(gameId);
    }

    // Create new game
    $scope.newGame = function () {
      cancelUpdates();
      appService.gameState = null;
      create();
    }

    $scope.rollDice = function () {
      var payload = {
        user: appService.user,
        game_id: $scope.gameState.game_id
      };
      $scope.asyncTaskInProgress = true;
      monopolyService.rollDice(payload)
        .success(function (data) {
          console.log(data);

          if (data.status == 'success') {
            appService.gameState = data.game_state;
            $scope.gameState = data.game_state;
          }
        })
        .error(function (error) {
          console.log(error);
        })
        .finally(function () {
          $scope.asyncTaskInProgress = false;
        });
    }

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider);
    };
  })


  .controller('JoinCtrl', function ($scope, $ionicAuth, $ionicUser, $auth, monopolyService, $stateParams, appService) {
    console.log($auth.isAuthenticated());
    console.log(angular.toJson($auth.getPayload()));

    var gameId = $stateParams.gameId;
    $scope.gameState = {};



    $scope.authenticate = function (provider) {
      $auth.authenticate(provider);
    };
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
