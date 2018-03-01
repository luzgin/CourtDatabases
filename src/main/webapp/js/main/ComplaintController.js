'use strict';

angular.module('courtApp').controller('ComplaintController',
    ['ComplaintService', 'DecreeService', 'EntityService', '$scope', function (ComplaintService, DecreeService, EntityService, $scope) {
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

        self.done = false;

        function getAllComplaints() {
            return ComplaintService.getAllComplaints();
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
            ComplaintService.createComplaint(complaint).then(
                function (response) {
                    console.log('complaint created successfully');
                    self.done = true;
                    self.complaint = {};
                },
                function (errResponse) {
                    console.error('Error while creating complaint');
                }
            );
        }

        function updateComplaint(complaint, id) {
            console.log('About to update complaint');
            ComplaintService.updateComplaint(complaint, id)
                .then(
                    function (response) {
                        console.log('complaint updated successfully'+ self.complaint);
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
                    console.log('complaint get'+ self.complaint);
                },
                function (errResponse) {
                    console.error('Error while removing complaint ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeComplaint(id){
            console.log('About to remove complaint with id '+id);
            ComplaintService.removeComplaint(id)
                .then(
                    function(){
                        console.log('complaint '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing complaint '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);