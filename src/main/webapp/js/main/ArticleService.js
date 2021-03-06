'use strict';
angular.module('courtApp').factory('ArticleService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {
            var factory = {
                loadAllArticles: loadAllArticles,
                getAllArticles: getAllArticles,
                getArticle: getArticle,
                createArticle: createArticle,
                updateArticle: updateArticle,
                removeArticle: removeArticle
            };
            return factory;

            function loadAllArticles() {
                var deferred = $q.defer();
                $http.get(urls.ARTICLE_SERVICE_API)
                    .then(
                        function (response) {
                            $localStorage.articles = response.data;
                            deferred.resolve(response);
                        },
                        function (errResponse) {
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function getAllArticles() {
                return $localStorage.articles;
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

            function createArticle(entity) {
                console.log('Creating entity');
                var deferred = $q.defer();
                $http.post(urls.ARTICLE_SERVICE_API, entity)
                    .then(
                        function (response) {
                            loadAllArticles();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while creating entity : ' + errResponse.data.errorMessage);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function updateArticle(entity, id) {
                console.log('Updating entity with id ' + id);
                var deferred = $q.defer();
                $http.put(urls.ARTICLE_SERVICE_API + id, entity)
                    .then(
                        function (response) {
                            loadAllArticles();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while updating entity with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

            function removeArticle(id) {
                console.log('Removing Article with id ' + id);
                var deferred = $q.defer();
                $http.delete(urls.ARTICLE_SERVICE_API + id)
                    .then(
                        function (response) {
                            loadAllArticles();
                            deferred.resolve(response.data);
                        },
                        function (errResponse) {
                            console.error('Error while removing Article with id :' + id);
                            deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }
        }
    ]);