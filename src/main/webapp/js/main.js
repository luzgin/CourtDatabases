var app = angular.module("courtDatabase", []);

app.controller("FindAllEntityIskAdm", function ($scope, $http) {
    $scope.entitiesAdmIsk = [];
    $http.get('http://localhost:8080/api/entitiesiskadm').success(function (data) {
        $scope.entitiesAdmIsk = data;
    })
});


app.controller('saveEntityIskAdm', function($scope, $http) {
    $scope.saveCtrl = function(){
        var url = "http://localhost:8080/api/save";

        var config = {
            headers : {
                'Accept': 'text/plain'
            }
        }
        var data = {
            name: $scope.name,
        };

        $http.post(url, data, config).then(function (response) {
            $scope.postResultMessage = response.data;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " +  response.statusText;
        });
		location.reload();
        $scope.name = "";

    }
});