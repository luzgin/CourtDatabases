'use strict';

angular.module('courtApp').controller('DecreeController',
    ['DecreeService', 'AuthorService', 'OrgService', 'SecondInstanceService', '$scope', function (DecreeService, AuthorService, OrgService, SecondInstanceService, $scope) {
        var self = this;
        self.decree = {};
        self.regulations = [];
        self.submit = submit;
        self.createDecree = createDecree;
        self.updateDecree = updateDecree;
        self.getAllRegulations = getAllRegulations;
        self.getAllAuthors = getAllAuthors;
        self.getAllOrganizations = getAllOrganizations;
        self.getAllSecondInstance = getAllSecondInstance;
        self.editDecree = editDecree;
        self.removeDecree = removeDecree;

        self.decree.decreeDate = new Date(self.decree.decreeDate);

        function getAllRegulations() {
            return DecreeService.getAllRegulations();
        }
        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }
        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }
        function getAllSecondInstance() {
            return SecondInstanceService.getAllSecondInstances();
        }
        function submit() {
            console.log('Submitting');
            if (self.decree.id === undefined || self.decree.id === null) {
                console.log('Saving New decree', self.decree);
                createDecree(self.decree);
            } else {
                updateDecree(self.decree, self.decree.id);
                console.log('decree updated with id ', self.decree.id);
            }
        }

        function createDecree(decree) {
            console.log('About to create decree');
            DecreeService.createDecree(decree).then(
                function (response) {
                    console.log('decree created successfully');
                    self.done = true;
                    self.decree = {};
                },
                function (errResponse) {
                    console.error('Error while creating decree');
                }
            );
        }

        function updateDecree(decree, id) {
            console.log('About to update decree');
            DecreeService.updateDecree(decree, id)
                .then(
                    function (response) {
                        console.log('decree updated successfully'+ self.decree);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating decree');
                    }
                );
        }
        function editDecree(id) {
            console.log('decree get');
            DecreeService.getDecree(id).then(
                function (decree) {
                    self.decree = decree;
                    console.log('decree get successfully'+ self.decree);
                },
                function (errResponse) {
                    console.error('Error while removing decree ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeDecree(id){
            console.log('About to remove decree with id '+id);
            DecreeService.removeDecree(id)
                .then(
                    function(){
                        console.log('decree '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing decree '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);