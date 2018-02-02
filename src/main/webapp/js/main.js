var app = angular.module("courtDatabase", []);
app.controller("AppCtrl", function ($scope, $http) {

    $scope.entitiesAdmIsk = [];

    $http.get('http://localhost:8080//api/entitiesiskadm').success(function (data) {
        $scope.entitiesAdmIsk = data;
    })


/*    <tr ng-repeat="item in ">
        <td>{{item.id}}}</td>
    <td>{{item.name}}}</td>
</tr>
    */
})