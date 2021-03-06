'use strict';

angular.module('courtApp').controller('AuthorController',
    ['AuthorService', 'OrgService', '$scope','NgTableParams', function (AuthorService, OrgService, $scope, NgTableParams) {
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
        self.clearAuthor = clearAuthor;
        self.modalShow = modalShow;

        var data = getAllAuthors();

        self.tableParams = new NgTableParams({
            sorting: {name: "asc"},
            count: 15
        }, {counts: [15, 50, 100], dataset: data});


        function getAllAuthors() {
            return AuthorService.getAllAuthors();
        }

        function modalShow(item) {
            self.author = item;
            $('#ModalSaveAuthor').modal('toggle');
        }
        function clearAuthor() {
            self.author = {};
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

                } else {
                    updateAuthor(self.author, self.author.id);
                    console.log('author updated with id ', self.author.id);
                }
                $('#ModalSaveAuthor').modal('toggle');
            } else {
                if ($scope.authorForm.nameModalAuthor.$error.required){
                    Message.generate('Укажите имя автора!', 2);
                    document.getElementById("nameSave").focus();
                    $scope.authorForm.nameModalAuthor.check = true;

                }else if ($scope.authorForm.positionModalAuthor.$error.required){
                    Message.generate('Укажите должность автора!', 2);
                    document.getElementById("positionSave").focus();
                    $scope.authorForm.positionModalAuthor.check = true;

                }else if ($scope.authorForm.organizationModalAuthor.$error.required){
                    Message.generate('Укажите организацию!', 2);
                    $scope.authorForm.organizationModalAuthor.check = true;
                }
            }
        }

        function createAuthor(author) {
            console.log('About to create author');
            AuthorService.createAuthor(author).then(
                function (response) {
                    Message.generate('Автор успешно добавлен', 1);
                    self.author = {};
                    self.tableParams.reload();
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении автора', 1);
                }
            );
        }

        function updateAuthor(author, id) {
            console.log('About to update author');
            AuthorService.updateAuthor(author, id)
                .then(
                    function (response) {
                        Message.generate('Автор успешно изменен', 1);
                        console.log('author updated successfully' + self.author);
                        self.done = true;
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении автора', 1);
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