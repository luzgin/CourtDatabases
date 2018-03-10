function MainCntl($scope, $route, $routeParams, $location) {
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        startDate: "01-05-2014",
        endDate: "31-12-2017",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });

}
