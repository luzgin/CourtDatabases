'use strict';

angular.module('courtApp').controller('AuthorController',
    ['AuthorService', 'OrgService', '$scope', function (AuthorService, OrgService, $scope) {
        var self = this;
        self.author = {};
        self.authors = [];

        self.submit = submit;
        self.createAuthor = createAuthor;
        self.updateAuthor = updateAuthor;
        self.getAllAuthors = getAllAuthors;
        self.getStatus = getStatus;
        self.getAllOrganizations = getAllOrganizations;
        self.editAuthor = editAuthor;
        self.removeAuthor = removeAuthor;

        self.done = false;

        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }

        function getAllOrganizations() {
            return OrgService.getAllOrganizations();
        }

        function getStatus() {
            return AuthorService.getStatus();
        }

        function submit() {
            if ($scope.authorForm.$valid) {
                console.log('Submitting');
                if (self.author.id === undefined || self.author.id === null) {
                    console.log('Saving New author', self.author);
                    createAuthor(self.author);
                    $('#ModalSaveAuthor').modal('toggle');
                } else {
                    updateAuthor(self.author, self.author.id);
                    console.log('author updated with id ', self.author.id);
                    $('#ModalSaveAuthor').modal('toggle');
                }
            } else {
                if ($scope.authorForm.nameModalAuthor.$error.required){
                    document.getElementById("nameSave").focus();
                    $scope.authorForm.nameModalAuthor.check = true;

                }else if ($scope.authorForm.positionModalAuthor.$error.required){
                    document.getElementById("positionSave").focus();
                    $scope.authorForm.positionModalAuthor.check = true;

                }else if ($scope.authorForm.organizationModalAuthor.$error.required){
                    $scope.authorForm.organizationModalAuthor.check = true;
                }
            }
        }

        function createAuthor(author) {
            console.log('About to create author');
            AuthorService.createAuthor(author).then(
                function (response) {
                    console.log('author created successfully');
                    self.done = true;
                    self.author = {};
                },
                function (errResponse) {
                    console.error('Error while creating author');
                }
            );
        }

        function updateAuthor(author, id) {
            console.log('About to update author');
            AuthorService.updateAuthor(author, id)
                .then(
                    function (response) {
                        console.log('author updated successfully' + self.author);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating author');
                    }
                );
        }

        function editAuthor(id) {
            console.log('author get');
            AuthorService.getAuthor(id).then(
                function (author) {
                    self.author = author;
                    console.log('author get' + self.author);
                },
                function (errResponse) {
                    console.error('Error while removing author ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeAuthor(id) {
            console.log('About to remove author with id ' + id);
            AuthorService.removeAuthor(id)
                .then(
                    function () {
                        console.log('author ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing author ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        $scope.$on('setOrganizationForAuthor', function (setOrganizationForAuthor, item) {
            self.author.organization = item.a;
        })

    }
    ]);