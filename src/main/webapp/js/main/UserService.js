'use strict';
angular.module('courtApp').factory('UserService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllUsers: loadAllUsers,
                getAllUsers: getAllUsers,
                createUser: createUser,
                updateUser: updateUser
            };
            return factory;

            function loadAllUsers() {
                var deferred = $q.defer();
                $http.get(urls.USER_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.users = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllUsers() {
                return $localStorage.users;
            }

            function createUser(user) {
                console.log('Creating user');
                var deferred = $q.defer();
                user.accountNonExpired = true;
                user.accountNonLocked = true;
                user.credentialsNonExpired = true;
                user.enabled = true;
                $http.post(urls.USER_SERVICE_API, user)
                    .then(
                        function (response) {
                            loadAllUsers();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating user : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateUser(user, id) {
                console.log('Updating user with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.USER_SERVICE_API + id, user)
                    .then(
                        function (response) {
                            loadAllUsers();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating user with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;

            }
        }
    ]);