'use strict';

angular.module('courtApp')
    .controller('LoginController', function ($http, $scope, $location, AuthService, $rootScope, $q, urls) {
        var self = this;
        self.user = {};
        self.message = {};

        self.login = login;

        function login() {
            $http({
                url: urls.AUTHENTICATE,
                method: "POST",
                params: {
                    username: self.user.username,
                    password: self.user.password
                }
            }).then(function (response) {
                self.user.password = null;
                if (response.data.token) {
                    self.message = '';
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                    AuthService.user = response.data.user;
                    $rootScope.$broadcast('LoginSuccessful');
                    $location.path('/');
                } else {
                    self.message = 'Authetication Failed !';
                }
            }), function (error) {
                self.message = 'Authetication Failed !';
            }

        }
    })
