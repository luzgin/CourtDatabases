'use strict';
angular.module('courtApp').factory('ComplaintService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllComplaints: loadAllComplaints,
                getAllComplaints: getAllComplaints,
                getComplaint: getComplaint,
                createComplaint: createComplaint,
                updateComplaint: updateComplaint,
                removeComplaint: removeComplaint,
                getComplaintsForDecree: getComplaintsForDecree
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

            function getAllComplaints() {
                return $localStorage.complaints;
            }

            function getComplaint(id) {
                console.log('Fetching Complaint with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.CONPLAINT_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Complaint with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Complaint with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
            function getComplaintsForDecree(id) {
                console.log('Fetching Complaints for decree with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.CONPLAINT_SERVICE_API + "dec/" + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Complaints for decree with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Complaints for decree with id :' + id);
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
                            loadAllComplaints();
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
                            loadAllComplaints();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeComplaint(id) {
                console.log('Removing Complaint with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.CONPLAINT_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllComplaints();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Complaint with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);