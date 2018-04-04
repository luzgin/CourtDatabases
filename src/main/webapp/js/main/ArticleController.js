'use strict';

angular.module('courtApp').controller('ArticleController',
    ['ArticleService', '$scope', function (ArticleService, $scope) {
        var self = this;
        self.article = {};
        self.articles = [];

        self.submit = submit;
        self.createArticle = createArticle;
        self.updateArticle = updateArticle;
        self.getAllArticles = getAllArticles;
        self.editArticle = editArticle;
        self.removeArticle = removeArticle;

        function getAllArticles() {
            return ArticleService.getAllArticles();
        }

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
                    self.done = true;
                    self.article = {};
                },
                function (errResponse) {
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
                        self.done = true;
                    },
                    function (errResponse) {
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

    }
    ]);