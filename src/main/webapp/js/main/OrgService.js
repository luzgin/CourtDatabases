'use strict';
angular.module('courtApp').factory('OrgService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllOrganizations: loadAllOrganizations,
                getAllOrganizations: getAllOrganizations,
                getOrganization: getOrganization,
                createOrganization: createOrganization,
                updateOrganization: updateOrganization,
                removeOrganization: removeOrganization
            };
            return factory;

            function loadAllOrganizations() {
                var deferred = $q.defer();
                $http.get(urls.ORGANIZATION_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.organizations = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllOrganizations() {
                return $localStorage.organizations;
            }

            function getOrganization(id) {
                console.log('Fetching Organization with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.ORGANIZATION_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Organization with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Organization with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function createOrganization(organization) {
                console.log('Creating organization');
                var deferred = $q.defer();
                organization.type = '2';
                $http.post(urls.ORGANIZATION_SERVICE_API, organization)
                    .then(
                        function (response) {
                            loadAllOrganizations()
                                .then(
                                    function (response1) {
                                        deferred.resolve(response.data);
                                    },
                                    function (errResponse) {
                                        deferred.reject(errResponse);
                                    });
                        },
                        function (errResponse) {
                            console.error('Error while creating organization : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateOrganization(organization, id) {
                console.log('Updating organization with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.ORGANIZATION_SERVICE_API + id, organization)
                    .then(
                        function (response) {
                            loadAllOrganizations().then(
                                function (response1) {
                                    deferred.resolve(response.data);
                                },
                                function (errResponse) {
                                    deferred.reject(errResponse);
                                });
                        },
                        function (errResponse) {
                            console.error('Error while updating organization with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeOrganization(id) {
                console.log('Removing Organization with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.ORGANIZATION_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllOrganizations();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Organization with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);