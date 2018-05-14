'use strict';
angular.module('courtApp').factory('UserService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllUsers: loadAllUsers,
                getAllUsers: getAllUsers
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

        }
    ]);