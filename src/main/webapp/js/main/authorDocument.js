var authorDocument = angular.module("AuthorDocument", []);

authorDocument.controller("FindAllAuthorDocument", ['$scope', '$http', function ($scope, $http) {
    $scope.authorDocumentList = [];
    $http.get('http://localhost:8080/api/findAllAuthorDocument').success(function (data) {
        $scope.authorDocumentList = data;
    })
}]);
authorDocument.controller("SaveAuthor", ['$scope', '$http', function ($scope, $http) {
    $scope.organizationList = [];
    $http.get('http://localhost:8080/api/findAllOrganization').success(function (data) {
        $scope.organizationList = data;
    })
    $scope.saveAuthor = function () {
        var url = "http://localhost:8080/api/saveAuthor";
        var config = {headers: {'Accept': 'text/plain'}};
        var author = {
            name: $scope.name,
            activWork : true,
            organization: $scope.organization
        };
        $http.post(url, author, config).then(function (response) {
            $scope.postResultMessage = response.author;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.name = "";
        $scope.organization = "";
    }
}]);