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
    });
    $scope.saveAuthor = function () {
        var url = "http://localhost:8080/api/saveAuthor";
        var config = {headers: {'Accept': 'text/plain'}};
        var author = {
            name: $scope.name,
            activWork: true,
            organization: $scope.organizationSave
        };
        $http.post(url, author, config).then(function (response) {
            $scope.postResultMessage = response.author;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
       // location.reload();
        $scope.name = "";
        $scope.organization = "";
    }
    $("#authorModalSave").on('show.bs.modal', function (e) {
        $('.selectpicker').selectpicker('refresh');
    });

}]);

authorDocument.controller("EditAuthor", ['$scope', '$http', function ($scope, $http) {
    $scope.organizationList = [];
    $http.get('http://localhost:8080/api/findAllOrganization').success(function (data) {
        $scope.organizationList = data;
    });
    $scope.editAuthor = function () {
        var url = "http://localhost:8080/api/editAuthor";
        var config = {headers: {'Accept': 'text/plain'}}
        var author = {
            name: $scope.nameEdit,
            activWork: $scope.activWork,
            organization: $scope.organizationEdit
        };
        $http.post(url, author, config).then(function (response) {
            $scope.postResultMessage = response.author;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });

        $scope.name = "";
        $scope.activWork = "";
        $scope.organization = "";
    };
    $("#authorModalEdit").on('show.bs.modal', function (e) {
        $('.selectpicker').selectpicker('refresh');
        var author = $(e.relatedTarget).data('author');
        $scope.$apply(function () {
            $scope.nameEdit = author.name;
            $scope.activWork = author.activWork;
            $scope.organizationEdit = author.organization;
        })

    });
    //location.reload();
}]);


authorDocument.controller("DeleteAuthor", ['$scope', '$http', function ($scope, $http) {
    $scope.deleteAuthor = function (entity) {
        var url = "http://localhost:8080/api/deleteAuthor";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
}]);