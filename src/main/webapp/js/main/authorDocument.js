var authorDocument = angular.module("AuthorDocument", []);

authorDocument.controller("FindAllAuthorDocument", ['$scope', '$http', function ($scope, $http) {
    $scope.authorDocumentList = [];
    $http.get('http://localhost:8080/api/findAllAuthorDocument').success(function (data) {
        $scope.authorDocumentList = data;
    })
}]);
organization.controller("SaveAuthor", ['$scope', '$http', function ($scope, $http) {
    $scope.saveAuthor = function () {
        $scope.organizationList = [];
        $http.get('http://localhost:8080/api/findAllOrganization').success(function (data) {
            $scope.organizationList = data;
        })
      /*  var url = "http://localhost:8080/api/saveAuthor";
        var config = {headers: {'Accept': 'text/plain'}};
        var org = $scope.org;
        var author = {
            name: $scope.name,
            activWork : '1',
            organization : org
        };
        $http.post(url, author, config).then(function (response) {
            $scope.postResultMessage = response.organization;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });

        location.reload();
        $scope.name = "";*/
    }
}]);