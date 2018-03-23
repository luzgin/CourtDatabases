'use strict';
angular.module('courtApp').factory('ComplaintService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllComplaints: loadAllComplaints,
                loadComplaintsForDecree: loadComplaintsForDecree,
                getAllComplaints: getAllComplaints,
                getComplaintsForDecree: getComplaintsForDecree,
                getComplaint: getComplaint,
                createComplaint: createComplaint,
                updateComplaint: updateComplaint,
                removeComplaint: removeComplaint
            };
            return factory;

            function loadAllComplaints() {
                var deferred = $q.defer();
                $http.get(urls.CONPLAINT_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.complaints = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function loadComplaintsForDecree(id) {
                var deferred = $q.defer();
                $http.get(urls.CONPLAINT_SERVICE_API + "dec/" + id)
                    .then(
                        function (response) {
                            $localStorage.complaintsForDecree = response.data;
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllComplaints() {
                return $localStorage.complaints;
            }
            function getComplaintsForDecree() {
                return $localStorage.complaintsForDecree;
            }

            function getComplaint(item) {
                console.log('Fetching Complaint');
                var deferred = $q.defer();
                $http.get(urls.CONPLAINT_SERVICE_API + item.id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Complaint with id :' + item.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Complaint with id :' + item.id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }


            function createComplaint(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.CONPLAINT_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadComplaintsForDecree(entity.decreeAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateComplaint(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.CONPLAINT_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadComplaintsForDecree(entity.decreeAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeComplaint(item) {
                console.log('Removing Complaint with id ' + item.id);
                var deferred = $q.defer();
                $http.delete(urls.CONPLAINT_SERVICE_API + item.id)
                    .then(
                        function (response) {
                            loadComplaintsForDecree($localStorage.card.decreeAdm.id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Complaint with id :' + item.id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);