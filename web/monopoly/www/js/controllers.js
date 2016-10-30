angular.module('starter.controllers', [])

  .controller('ParentCtrl', function ($scope, appService) {
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
        appService.user = { user: 'guest' + Date.now() };
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
  .controller('DashCtrl', function ($scope, $ionicAuth, $ionicUser, $auth, monopolyService, $stateParams, appService) {
    console.log($auth.isAuthenticated());
    console.log(angular.toJson($auth.getPayload()));
    console.log(appService.user);

    $scope.gameState = {};

    // Start game if not yet started
    if (appService.gameState == null) {
      create();
    }
    else {
      console.log("Joining existing game");
      join(appService.gameState.board_id);
    }

    function create() {
      monopolyService.createGame(appService.user)
        .success(function (data) {
          console.log(data);
          appService.gameState = data.game_state;
          $scope.gameState = data.game_state;
        })
        .error(function (error) {
          console.log(error);
        });
    }

    function join(gameId) {
      var payload = {
        user: appService.user,
        game_id: gameId
      };
      monopolyService.joinGame(payload)
        .success(function (data) {
          console.log(data);
          $scope.gameState = data.game_state;
        })
        .error(function (error) {
          console.log(error);
        });
    }

    // Join from gameId provided by user
    $scope.joinGame = function () {

    }

    // Create new game
    $scope.newGame = function () {
      appService.gameState = null;
      create();
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
