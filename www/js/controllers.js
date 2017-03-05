angular.module('chatApplication.controllers', [])
    .config(function () {
        document.addEventListener('deviceready', function () {
            console.log('deviceready');
        }, false);
    })
    .controller('loginCtrl', function ($scope) {
        var login = this;
        console.log('login', login);
    })
    .component('googleSignIn', {
        controller: 'googleSignInCtrl',
        controllerAs: 'googleSignIn'
    })
    .component('facebookSignIn', {
        controller: 'facebookSignInCtrl',
        controllerAs: 'facebookSignIn'
    })
    .component('twitterSignIn', {
        controller: 'twitterCtrl',
        controllerAs: 'twitter'
    })
    .controller('googleSignInCtrl', function ($element, $window) {
        var googleSignIn = this;
        $element.bind('click', _clickEvent);
        function _clickEvent(e) {
            window.plugins.googleplus.login(
                {
                    'scopes': 'profile',
                    'webClientId': '944591402434-u1th2jvo705rdblttfe5jkiblu3msb1p.apps.googleusercontent.com',
                    'offline': true,
                },
                function (obj) {
                    console.log(obj)
                    alert(JSON.stringify(obj)); // do something useful instead of alerting
                },
                function (msg) {
                    console.log(msg)
                    alert('error: ' + msg);
                }
            );
        }
    })
    .controller('facebookSignInCtrl', function ($element, $window, $q) {
        var facebookSignIn = this;
        $element.bind('click', _clickEvent);

        function _clickEvent(e) {
            facebookConnectPlugin.getLoginStatus(connectedStatus,disConnectedStatus);
        }

        function connectedStatus (connectRes) {
            console.log(connectRes)
            if(connectRes.status === 'connected') {
                 getFacebookProfileInfo(connectRes.authResponse).then(getProfile, fbLoginError);
            } else {
                 facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        }

        function disConnectedStatus () {
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        }

        function fbLoginSuccess(res) {
            console.log(res);
            getFacebookProfileInfo(res.authResponse).then(getProfile, fbLoginError);
        }

        function fbLoginError(error) {
            console.log(error);
        }

        function getProfile(res) {
            console.log(res);
        }

        function getFacebookProfileInfo(authResponse) {
            var info = $q.defer();
            if (window.cordova) {
                facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
                    function (response) {
                        info.resolve(response);
                    },
                    function (error) {
                        info.reject(error);
                    }
                );
                return info.promise;
            }
        };
    })
    .controller('twitterCtrl', function ($element, $window, $q) {
        var twitter = this;
        $element.bind('click', _clickEvent);

        function _clickEvent(e) {
            //facebookConnectPlugin.getLoginStatus(connectedStatus,disConnectedStatus)
        }
    });