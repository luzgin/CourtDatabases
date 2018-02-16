var vialator = angular.module("Vialator", []);

vialator.controller("RadioController", function ($scope) {
    $scope.radioChecked = {on: '1'};

});
vialator.controller("FindAllVialatorsFiz", ['$scope', '$http', function ($scope, $http) {
    $scope.vialatorsFizList = [];
    $http.get('http://localhost:8080/api/findAllVialatorsFiz').success(function (data) {
        $scope.vialatorsFizList = data;
    })
}]);
vialator.controller("FindAllVialatorsOrg", ['$scope', '$http', function ($scope, $http) {
    $scope.vialatorsOrgList = [];
    $http.get('http://localhost:8080/api/findAllVialatorsOrg').success(function (data) {
        $scope.vialatorsOrgList = data;
    })
}]);

vialator.controller("SaveVialatorFiz", ['$scope', '$http', function ($scope, $http) {
    $scope.saveVialatorFiz = function () {
        var url = "http://localhost:8080/api/saveVialator";
        var config = {headers: {'Accept': 'text/plain'}};
        var vialator = {
            typeVialator: '1',
            privateNumber: $scope.privateNumber,
            firstName: $scope.firstname,
            secondName: $scope.secondname,
            lastName: $scope.lastname,
        };
        $http.post(url, vialator, config).then(function (response) {
            $scope.postResultMessage = response.vialator;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.privateNumber = "",
        $scope.firstname = "",
        $scope.secondname = "",
        $scope.lastname = ""
    }
}]);
vialator.controller("SaveVialatorOrg", ['$scope', '$http', function ($scope, $http) {
    $scope.saveVialatorOrg = function () {
        var url = "http://localhost:8080/api/saveVialator";
        var config = {headers: {'Accept': 'text/plain'}};
        var vialator = {
            typeVialator: '2',
            privateNumber: $scope.unpNumber,
            firstName: $scope.firstname
        };
        $http.post(url, vialator, config).then(function (response) {
            $scope.postResultMessage = response.vialator;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.unpNumber = "",
            $scope.firstname = ""
    }
}]);
vialator.controller("DeleteVialator", ['$scope', '$http', function ($scope, $http) {
    $scope.deleteVialator = function (entity) {
        var url = "http://localhost:8080/api/deleteVialator";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
}]);