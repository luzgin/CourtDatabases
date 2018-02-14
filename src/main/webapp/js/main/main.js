var app = angular.module("courtDatabase", []);

app.controller("FindAllEntityIskAdm", function ($scope, $http) {
    $scope.entitiesAdmIsk = [];
    $http.get('http://localhost:8080/api/entitiesiskadm').success(function (data) {
        $scope.entitiesAdmIsk = data;
    })
});

app.controller('saveEntityIskAdm', function ($scope, $http) {
    $scope.saveCtrl = function () {
        var url = "http://localhost:8080/api/save";
        var config = {
            headers: {
                'Accept': 'text/plain'
            }
        }
        var data = {
            name: $scope.name
        };
        $http.post(url, data, config).then(function (response) {
            $scope.postResultMessage = response.data;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        //location.reload();
        $scope.name = "";
    }
});
app.controller('deleteEntityIskAdm', function ($scope, $http) {
    $scope.deleteCtrl = function (entity) {
        var url = "http://localhost:8080/api/delete";
        var config = {
            headers: {
                'Accept': 'text/plain'
            }
        }
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
});

app.controller('findAllResultAdmCaseList', function ($scope, $http) {
    $scope.resultAdmCaseList = [];
    $http.get('http://localhost:8080/api/getResultAdmCaseList').success(function (data) {
        $scope.resultAdmCaseList = data;
    })

});


app.controller('saveResultAdmCase', function ($scope, $http) {
    $scope.saveResultAdmCaseCtrl = function () {
        var url = "http://localhost:8080/api/saveResultAdmCase";
        var config = {
            headers: {
                'Accept': 'text/plain'
            }
        }
        var result = {
            name: $scope.name
        };
        $http.post(url, result, config).then(function (response) {
            $scope.postResultMessage = response.result;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
        $scope.resultName = "";
    }
});

app.controller('deleteResultAdmCase', function ($scope, $http) {
    $scope.deleteResultAdmCaseCtrl = function (entity) {
        var url = "http://localhost:8080/api/deleteResultAdmCase";
        var config = {headers: {'Accept': 'text/plain'}}
        $http.post(url, entity, config).then(function (response) {
            $scope.postResultMessage = response.entity;
        }, function error(response) {
            $scope.postResultMessage = "Error with status: " + response.statusText;
        });
        location.reload();
    }
});

$("#myModal").on('show.bs.modal', function (e) {
    var userId = $(e.relatedTarget).data('user-id');

    var cols = $('#user-' + userId + ' td');
    var firstName = $(cols[0]).text();
    var name = $(cols[1]).text();
    $('#firstNameInput').val(firstName);
    $('#nameInput').val(name);
});

$("#myModal").on('hidden.bs.modal', function () {
    var form = $(this).find('form');
    form[0].reset();
});