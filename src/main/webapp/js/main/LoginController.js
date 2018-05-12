'use strict';

angular.module('courtApp')
    .controller('LoginController', function ($http, $scope, $location, AuthService, $rootScope, $q, urls) {
        var self = this;
        self.user = {};
        self.message = '';

        self.login = login;
        self.logout = logout;

        function login() {
            if ($scope.loginForm.$valid) {
                var deferred = $q.defer();
                $http.post(urls.AUTHENTICATE, self.user)
                    .then(
                        function (response) {
                            if (response.data.token) {
                                self.message = '';
                                $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                                AuthService.user = response.data.user;
                                $rootScope.$broadcast('LoginSuccessful');
                                $location.path('/');
                            } else {
                                self.user.password = null;
                                self.message = 'Не верный логин или пароль!';
                                document.getElementById("password").focus();
                            }
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            self.user.password = null;
                            self.message = 'Не верный логин или пароль!';
                            document.getElementById("password").focus();
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            } else {
                if ($scope.loginForm.username.$error.required) {
                    document.getElementById("username").focus();
                    $scope.loginForm.username.check = true;
                }else if ($scope.loginForm.password.$error.required) {
                    document.getElementById("password").focus();
                    $scope.loginForm.password.check = true;
                }
            }

        }

        function logout() {
            AuthService.user = null;
        }
    })
