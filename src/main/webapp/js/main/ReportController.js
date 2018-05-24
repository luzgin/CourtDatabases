'use strict';

angular.module('courtApp').controller('ReportController',
    ['ReportService', '$scope', 'NgTableParams', 'CardViewService', 'ComplaintService', 'DateReturnService', 'DateRequestService',
        function (ReportService, $scope, NgTableParams, CardViewService, ComplaintService, DateReturnService, DateRequestService) {
            var self = this;
            self.rep = {};
            self.dataComplaints = [];
            self.editArticle = editArticle;
            self.getReport = getReport;
            self.getComplaintsForCheck = getComplaintsForCheck;
            self.setCard = setCard;
            getComplaintsForCheck();

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

            function setCard(item) {
                CardViewService.setCard(item.cardAdm);
                ComplaintService.loadComplaintsForDecree(item.decreeAdm.id);
                DateReturnService.loadDateReturnForCard(item.cardAdm.id);
                DateRequestService.loadDateRequestForCard(item.cardAdm.id);
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

            function getComplaintsForCheck() {
                ReportService.getComplaintsForCheck().then(
                    function (response) {
                        self.dataComplaints = response;
                       /*
                        for (var i = 0; i < response.length; i++) {
                            var date = new Date(response[i].complainDate);
                            date.setDate(date.getDate() + 30);
                            self.dataComplaints[i].dateAnswer = date;
                        }
*/
                        self.tableComplaints = new NgTableParams({
                            sorting: {name: "asc"},
                            count: 15
                        }, {counts: [15, 50, 100], dataset: self.dataComplaints});

                    }, function (errResponse) {
                        console.log('Error getComplaintsForCheck' + errResponse.data)
                    }
                )

            }
        }
    ]);