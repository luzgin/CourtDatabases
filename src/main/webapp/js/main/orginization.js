var organization = angular.module("Organization", []);

organization.controller("FindAllOrganization", ['$scope', '$http', function ($scope, $http) {
    $scope.organizationList = [];
    $http.get('http://localhost:8080/api/findAllOrganization').success(function (data) {
        $scope.organizationList = data;
    })
}]);

organization.controller("SaveOrganization", ['$scope', '$http', function ($scope, $http) {
    $scope.saveOrganization = function () {
        var url = "http://localhost:8080/api/saveOrganization";
        var config = {headers: {'Accept': 'text/plain'}};
        var organization = {
            name: $scope.name,
            type: '2',
        };
        $http.post(url, organization, config).then(function (response) {
            $scope.postResultMessage = response.organization;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.name = "";
    }
}]);
organization.controller("DeleteOrganization", ['$scope', '$http', function ($scope, $http) {
    $scope.deleteOrganization = function (entity) {
        var url = "http://localhost:8080/api/deleteOrganization";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
}]);
organization.controller("EditOrganization", ['$scope', '$http', function ($scope, $http) {
    $scope.editOrganization = function () {
        var url = "http://localhost:8080/api/editOrganization";
        var config = {headers: {'Accept': 'text/plain'}}
        var organization = {
            id: $scope.id1,
            name: $scope.name1,
            type: $scope.type1
        };
        $http.post(url, organization, config).then(function (response) {
            $scope.postResultMessage = response.organization;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
       location.reload();
    };
    $("#organizationModalEdit").on('show.bs.modal', function (e) {
        var organization = $(e.relatedTarget).data('organization');
        $scope.$apply(function () {
            $scope.id1 = organization.id;
            $scope.name1 = organization.name;
            $scope.type1 = organization.type;
        })

    });
}]);
