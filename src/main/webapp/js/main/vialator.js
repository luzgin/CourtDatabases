var vialator = angular.module("Vialator", []);

vialator.controller("RadioController",function($scope){
    $scope.radioChecked={on:'1'};

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