'use strict';

angular.module('courtApp').controller('UserController',
    ['UserService', '$scope', 'NgTableParams', function (UserService, $scope, NgTableParams) {
        var self = this;
        self.user = {};

        //  self.submit = submit;
        //  self.createUser = createUser;
        //  self.updateUser = updateUser;
        self.findAllUsers = findAllUsers;
        //   self.editUser = editUser;
        //     self.removeUser = removeUser;
        self.clearUser = clearUser;

        var data = UserService.getAllUsers();
        self.tableParams = new NgTableParams({
            sorting: {surname: "asc"},
            count: 10
        }, {counts: [10, 25, 50], dataset: data});

        function findAllUsers() {
            return UserService.getAllUsers();
        }

        function clearUser() {
            self.user = {};
        }

        /*
                function submit() {
                    console.log('Submitting');
                    if (self.article.id === undefined || self.article.id === null) {
                        console.log('Saving New article', self.article);
                        createArticle(self.article);
                    } else {
                        updateArticle(self.article, self.article.id);
                        console.log('article updated with id ', self.article.id);
                    }
                }

                function createArticle(article) {
                    console.log('About to create article');
                    ArticleService.createArticle(article).then(
                        function (response) {
                            console.log('article created successfully');
                            Message.generate('Статья успешно добавлена', 1);
                            self.article = {};
                        },
                        function (errResponse) {
                            Message.generate('Ошибка при добавлении статьи', 3);
                            console.error('Error while creating article');
                        }
                    );
                }

                function updateArticle(article, id) {
                    console.log('About to update article');
                    ArticleService.updateArticle(article, id)
                        .then(
                            function (response) {
                                console.log('article updated successfully'+ self.article);
                                Message.generate('Статья успешно изменена', 1);
                            },
                            function (errResponse) {
                                Message.generate('Ошибка при изменении статьи', 3);
                                console.error('Error while updating article');
                            }
                        );
                }
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