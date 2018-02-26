'use strict';

angular.module('courtApp').controller('SecondInstanceController',
    ['SecondInstanceService','AuthorService','OrgService', '$scope', function (SecondInstanceService, AuthorService, OrgService, $scope) {
        var self = this;
        self.secondInstance = {};
        self.secondInstances = [];

        self.submit = submit;
        self.createSecondInstance = createSecondInstance;
        self.updateSecondInstance = updateSecondInstance;
        self.getAllSecondInstances = getAllSecondInstances;
        self.getAllAuthors = getAllAuthors;
        self.getAllOrganizations = getAllOrganizations;
        self.editSecondInstance = editSecondInstance;
        self.removeSecondInstance = removeSecondInstance;

        self.done = false;

        function getAllSecondInstances() {
            return SecondInstanceService.getAllSecondInstances();
        }
        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }
        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }

        function submit() {
            console.log('Submitting');
            if (self.secondInstance.id === undefined || self.secondInstance.id === null) {
                console.log('Saving New secondInstance', self.secondInstance);
                createSecondInstance(self.secondInstance);
            } else {
                updateSecondInstance(self.secondInstance, self.secondInstance.id);
                console.log('secondInstance updated with id ', self.secondInstance.id);
            }
        }

        function createSecondInstance(secondInstance) {
            console.log('About to create secondInstance');
            SecondInstanceService.createSecondInstance(secondInstance).then(
                function (response) {
                    console.log('secondInstance created successfully');
                    self.done = true;
                    self.secondInstance = {};
                },
                function (errResponse) {
                    console.error('Error while creating secondInstance');
                }
            );
        }

        function updateSecondInstance(secondInstance, id) {
            console.log('About to update secondInstance');
            SecondInstanceService.updateSecondInstance(secondInstance, id)
                .then(
                    function (response) {
                        console.log('secondInstance updated successfully'+ self.secondInstance);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating secondInstance');
                    }
                );
        }
        function editSecondInstance(id) {
            console.log('secondInstance get');
            SecondInstanceService.getSecondInstance(id).then(
                function (secondInstance) {
                    self.secondInstance = secondInstance;
                    console.log('secondInstance get'+ self.secondInstance);
                },
                function (errResponse) {
                    console.error('Error while removing secondInstance ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeSecondInstance(id){
            console.log('About to remove secondInstance with id '+id);
            SecondInstanceService.removeSecondInstance(id)
                .then(
                    function(){
                        console.log('secondInstance '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing secondInstance '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);