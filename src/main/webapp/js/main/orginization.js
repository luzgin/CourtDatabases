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
    $scope.editOrganization = function (entity) {
        var url = "http://localhost:8080/api/editOrganization";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
}]);

$("#organizationModal").on('show.bs.modal', function (e) {
    var organization = $(e.relatedTarget).data('organization');
    $('#idInput').val(organization.id);
    $('#nameInput').val(organization.name);
    $('#typeInput').val(organization.type);
});

$("#organizationModal").on('hidden.bs.modal', function () {
    var form = $(this).find('form');
    form[0].reset();
});