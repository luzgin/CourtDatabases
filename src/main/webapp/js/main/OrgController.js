'use strict';

angular.module('courtApp').controller('OrgController',
    ['OrgService', '$scope', function (OrgService, $scope) {
        var self = this;
        self.organization = {};
        self.organizations = [];

        self.submit = submit;
        self.createOrganization = createOrganization;
        self.updateOrganization = updateOrganization;
        self.getAllOrganizations = getAllOrganizations;
        self.editOrganization = editOrganization;
        self.removeOrganization = removeOrganization;

        self.done = false;

        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }

        function submit() {
            console.log('Submitting');
            if (self.organization.id === undefined || self.organization.id === null) {
                console.log('Saving New organization', self.organization);
                createOrganization(self.organization);
                $('#ModalSaveOrganization').modal('toggle');
            } else {
                updateOrganization(self.organization, self.organization.id);
                console.log('organization updated with id ', self.organization.id);
                $('#ModalSaveOrganization').modal('toggle');
            }
        }

        function createOrganization(organization) {
            console.log('About to create organization');
            OrgService.createOrganization(organization).then(
                function (response) {
                    console.log('organization created successfully');
                    self.done = true;
                    self.organization = {};
                },
                function (errResponse) {
                    console.error('Error while creating organization');
                }
            );
        }

        function updateOrganization(organization, id) {
            console.log('About to update organization');
            OrgService.updateOrganization(organization, id)
                .then(
                    function (response) {
                        console.log('organization updated successfully'+ self.organization);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating User');
                    }
                );
        }
        function editOrganization(id) {
            console.log('organization get');
             OrgService.getOrganization(id).then(
                function (organization) {
                    self.organization = organization;
                    console.log('organization get'+ self.organization);
                },
                function (errResponse) {
                    console.error('Error while removing organization ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeOrganization(id){
            console.log('About to remove organization with id '+id);
            OrgService.removeOrganization(id)
                .then(
                    function(){
                        console.log('organization '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing organization '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);