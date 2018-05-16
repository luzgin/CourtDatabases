'use strict';

angular.module('courtApp').controller('OrgController',
    ['OrgService', '$scope', 'NgTableParams', function (OrgService, $scope, NgTableParams) {
        var self = this;
        self.organization = {};
        self.organizations = [];

        self.submit = submit;
        self.createOrganization = createOrganization;
        self.updateOrganization = updateOrganization;
        self.getAllOrganizations = getAllOrganizations;
        self.editOrganization = editOrganization;
        self.removeOrganization = removeOrganization;
        self.modalShow = modalShow;

        var data = getAllOrganizations();
        self.tableParams = new NgTableParams({
            count: 15
        }, {counts: [15, 50, 100], dataset: data});

        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }

        function modalShow(organization) {
            if (organization.type =='1'){
                Message.generate('Нельзя редактировать название суда!', 3);
            }else {
                self.organization = organization;
                $('#ModalSaveOrganization').modal('toggle');
            }
        }

        function submit() {
            if ($scope.organizationForm.$valid) {
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
            else {
                if ($scope.organizationForm.nameModalOrganization.$error.required) {
                    document.getElementById("nameInputSave").focus();
                    Message.generate('Введите название организации!', 2);
                    $scope.organizationForm.nameModalOrganization.check = true;
                }
            }
        }

        function createOrganization(organization) {
            console.log('About to create organization');
            OrgService.createOrganization(organization).then(
                function (response) {
                    Message.generate('Организация успешно добавлена', 1);
                    console.log('organization created successfully');
                    self.organization = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении организации!', 3);
                    console.error('Error while creating organization');
                }
            );
        }

        function updateOrganization(organization, id) {
            console.log('About to update organization');
            OrgService.updateOrganization(organization, id)
                .then(
                    function (response) {
                        Message.generate('Организация успешно изменена', 1);
                        console.log('organization updated successfully' + self.organization);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении организации!', 3);
                        console.error('Error while updating User');
                    }
                );
        }

        function editOrganization(id) {
            console.log('organization get');
            OrgService.getOrganization(id).then(
                function (organization) {
                    self.organization = organization;
                    console.log('organization get' + self.organization);
                },
                function (errResponse) {
                    console.error('Error while removing organization ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeOrganization(id) {
            console.log('About to remove organization with id ' + id);
            OrgService.removeOrganization(id)
                .then(
                    function () {
                        console.log('organization ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing organization ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

    }
    ]);