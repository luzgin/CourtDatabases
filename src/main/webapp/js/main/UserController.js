'use strict';

angular.module('courtApp').controller('UserController',
    ['UserService', '$scope', 'NgTableParams', function (UserService, $scope, NgTableParams) {
        var self = this;
        self.user = {};

        self.submit = submit;
        //  self.createUser = createUser;
        //  self.updateUser = updateUser;
        self.findAllUsers = findAllUsers;
        //   self.editUser = editUser;
        //   self.removeUser = removeUser;
        self.clearUser = clearUser;
        self.modalShow = modalShow;

        var data = UserService.getAllUsers();
        var oldPassword = '';
        self.tableParams = new NgTableParams({
            sorting: {name: "asc"},
            count: 10
        }, {counts: [10, 25, 50], dataset: data});


        $scope.roles = ['USER', 'ADMIN', 'SUPER_ADMIN'];
        $scope.selection = [];
        $scope.toggleSelection = function toggleSelection(role) {
            var idx = $scope.selection.indexOf(role);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            } else {
                $scope.selection.push(role);
            }
        };

        function findAllUsers() {
            return UserService.getAllUsers();
        }

        function modalShow(user) {
            self.user = user;
            $('#ModalSave').modal('toggle');
            $scope.selection = self.user.authorities;
            oldPassword = self.user.password;
            self.user.password = null;
            if (self.user.id != null) {
                document.getElementById("usernameSave").readOnly = true;
            }

        }

        function clearUser() {
            $scope.selection = ['USER'];
            self.user = {};
        }

        function submit() {
            console.log('Submitting');
            console.log(self.user.password);
            if (self.user.password === null) {
                self.user.password = oldPassword;
            }
            if (self.user.id === undefined || self.user.id === null) {
                self.user.authorities = $scope.selection;
                console.log('Saving New user', self.user);
                createUser(self.user);
            } else {
                updateUser(self.user, self.user.id);
                console.log('user updated with id ', self.user);
            }
            $('#ModalSave').modal('toggle');
        }


        function createUser(user) {
            console.log('About to create user');
            UserService.createUser(user).then(
                function (response) {
                    console.log('user created successfully');
                    Message.generate('Пользователь успешно добавлен', 1);
                    self.user = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении пользователя', 3);
                    console.error('Error while creating user');
                }
            );
        }


        function updateUser(user, id) {
            console.log('About to update article');
            UserService.updateUser(user, id)
                .then(
                    function (response) {
                        console.log('user updated successfully' + self.user);
                        Message.generate('Пользователь успешно изменен', 1);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении пользователя', 3);
                        console.error('Error while updating user');
                    }
                );
        }

        /*
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
        function removeArticle(id){
            console.log('About to remove article with id '+id);
            ArticleService.removeArticle(id)
                .then(
                    function(){
                        console.log('article '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing article '+id +', Error :'+errResponse.data);
                    }
                );
        }
*/
    }
    ]);