'use strict';

angular.module('courtApp').controller('ComplaintController',
    ['ComplaintService', 'DecreeService', 'EntityService', 'CardService', '$scope', function (ComplaintService, DecreeService, EntityService, CardService, $scope) {
        var self = this;
        self.complaint = {};
        self.complaints = [];

        self.submit = submit;
        self.createComplaint = createComplaint;
        self.updateComplaint = updateComplaint;
        self.getAllComplaints = getAllComplaints;
        self.getAllRegulations = getAllRegulations;
        self.getAllEntities = getAllEntities;
        self.editComplaint = editComplaint;
        self.removeComplaint = removeComplaint;
        self.convertToDate = convertToDate;

        self.complaint.complainDate = new Date(self.complaint.complainDate);

        function getAllComplaints() {
            return ComplaintService.getAllComplaints();
        }

        function convertToDate(date) {
            var d = new Date(date);
            var s;
            if (d.getDate() < 10) {
                s = "0" + (d.getDate())
            } else {
                s = d.getDate()
            }
            s = s + ".";
            if (d.getMonth() < 10) {
                s = s + "0" + (d.getMonth() + 1)
            } else {
                s = s + d.getMonth()
            }
            d = s + "." + d.getFullYear();
            return d;
        }

        function getAllRegulations() {
            return DecreeService.getAllRegulations();
        }

        function getAllEntities() {
            return EntityService.getAllEntities();
        }

        function submit() {
            console.log('Submitting');
            if (self.complaint.id === undefined || self.complaint.id === null) {
                console.log('Saving New complaint', self.complaint);
                createComplaint(self.complaint);
            } else {
                updateComplaint(self.complaint, self.complaint.id);
                console.log('complaint updated with id ', self.complaint.id);
            }
        }

        function createComplaint(complaint) {
            console.log('About to create complaint');
            CardService.getCard(document.getElementById("cardId").value).then(
                function (response) {
                    complaint.cardAdm = response;
                    ComplaintService.createComplaint(complaint).then(
                        function (response) {
                            console.log('complaint created successfully');
                            self.complaint = {};
                        },
                        function (errResponse) {
                            console.error('Error while creating complaint');
                        }
                    );
                },
                function (errResponse) {
                    console.error('Error while creating complaint');
                }
            )
        }

        function updateComplaint(complaint, id) {
            console.log('About to update complaint');
            ComplaintService.updateComplaint(complaint, id)
                .then(
                    function (response) {
                        console.log('complaint updated successfully' + self.complaint);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating complaint');
                    }
                );
        }

        function editComplaint(id) {
            console.log('complaint get');
            ComplaintService.getComplaint(id).then(
                function (complaint) {
                    self.complaint = complaint;
                    console.log('complaint get' + self.complaint);
                },
                function (errResponse) {
                    console.error('Error while removing complaint ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeComplaint(id) {
            console.log('About to remove complaint with id ' + id);
            ComplaintService.removeComplaint(id)
                .then(
                    function () {
                        console.log('complaint ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing complaint ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

    }
    ]);