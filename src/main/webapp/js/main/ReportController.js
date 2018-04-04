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
                    console.log('article get'+ self.article);
                },
                function (errResponse) {
                    console.error('Error while removing article ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function getReport(dateFrom,dateTo) {
            var dateF = new Date(dateFrom);
            var dateT = new Date(dateTo);
            ReportService.getReport(dateF.getFullYear()+"-"+(dateF.getMonth()+1)+"-"+dateF.getDate(),dateT.getFullYear()+"-"+(dateT.getMonth()+1)+"-"+dateT.getDate()).then(
                function (report) {
                    self.rep.total = report;
                },
                function (errResponse) {
                    console.error('Error report ' + id + ', Error :' + errResponse.data);
                }
            )

        }

    }
    ]);