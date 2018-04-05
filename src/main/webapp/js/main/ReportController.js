'use strict';

angular.module('courtApp').controller('ReportController',
    ['ReportService', '$scope', function (ReportService, $scope) {
        var self = this;
        self.rep = {};

        self.editArticle = editArticle;
        self.getReport = getReport;

        function editArticle(id) {
            console.log('article get');
            ArticleService.getArticle(id).then(
                function (article) {
                    self.article = article;
                    console.log('article get' + self.article);
                },
                function (errResponse) {
                    console.error('Error while removing article ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function getReport(dateFrom, dateTo) {
            if ($scope.reportForm.$valid) {
                var dateF = new Date(dateFrom);
                var dateT = new Date(dateTo);
                ReportService.getReport(dateF.getFullYear() + "-" + (dateF.getMonth() + 1) + "-" + dateF.getDate(), dateT.getFullYear() + "-" + (dateT.getMonth() + 1) + "-" + dateT.getDate()).then(
                    function (report) {
                        self.rep = report;
                    },
                    function (errResponse) {
                        console.error('Error :' + errResponse.data);
                    }
                )
            } else {
                if ($scope.reportForm.dateFrom.$error.required) {
                    $scope.reportForm.dateFrom.check = true;
                    document.getElementById("dateFrom").focus();
                } else if ($scope.reportForm.dateTo.$error.required) {
                    $scope.reportForm.dateTo.check = true;
                    document.getElementById("dateTo").focus();
                }
            }
        }
    }
    ]);