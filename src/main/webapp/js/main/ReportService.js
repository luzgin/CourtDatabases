'use strict';
angular.module('courtApp').factory('ReportService',
    ['$http', '$q', 'urls',
        function ($http, $q, urls) {
            var factory = {
                getReport: getReport,
                getArticle: getArticle,
                getComplaintsForCheck: getComplaintsForCheck
            };
            return factory;

            function getReport(dateFrom, dateTo) {
                var deferred = $q.defer();
                $http.get(urls.CARD_SERVICE_API + "report/" + dateFrom + "/" + dateTo)
                    .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error report');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getArticle(id) {
                console.log('Fetching Article with id :' + id);
                var deferred = $q.defer();
                $http.get(urls.ARTICLE_SERVICE_API + id)
                    .then(
                        function (response) {
                            console.log('Fetched successfully Article with id :' + id);
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while loading Article with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
            function getComplaintsForCheck() {
                var deferred = $q.defer();
                $http.get(urls.COMPLAINT_SERVICE_API + "check")
                    .then(
                        function (response) {
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error getComplaintsForCheck');
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);