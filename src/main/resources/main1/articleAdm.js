var articleAdm = angular.module("ArticleAdm", []);
/*
articleAdm.controller("FindAllArticleAdm", ['$scope', '$http', function ($scope, $http) {
    $scope.articleAdmList = [];
    $http.get('http://localhost:8080/api/findAllArticleAdm').success(function (data) {
        $scope.articleAdmList = data;
    })
}]);

articleAdm.controller("SaveArticleAdm", ['$scope', '$http', function ($scope, $http) {
    $scope.saveArticleAdm = function () {
        var url = "http://localhost:8080/api/saveArticleAdm";
        var config = {headers: {'Accept': 'text/plain'}}
        var articleAdm = {
            article: $scope.article,
            part: $scope.part,
            note: $scope.note
        };
        $http.post(url, articleAdm, config).then(function (response) {
            $scope.postResultMessage = response.articleAdm;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.article = "";
        $scope.part = "";
        $scope.note = "";
    }
}]);

articleAdm.controller("DeleteAtricleAdm", ['$scope', '$http', function ($scope, $http) {
    $scope.deleteArticleAdm = function (entity) {
        var url = "http://localhost:8080/api/deleteArticleAdm";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
}])

*/