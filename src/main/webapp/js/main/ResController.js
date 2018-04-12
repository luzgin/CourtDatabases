'use strict';

angular.module('courtApp').controller('ResController',
    ['ResService', '$scope', function (ResService, $scope) {
        var self = this;
        self.result = {};
        self.results = [];

        self.submit = submit;
        self.createResult = createResult;
        self.updateResult = updateResult;
        self.getAllResults = getAllResults;
        self.editResult = editResult;
        self.removeResult = removeResult;

        self.done = false;

        function getAllResults() {
            return ResService.getAllResults();
        }

        function submit() {
            console.log('Submitting');
            if (self.result.id === undefined || self.result.id === null) {
                console.log('Saving New result', self.result);
                createResult(self.result);
            } else {
                updateResult(self.result, self.result.id);
                console.log('result updated with id ', self.result.id);
            }
        }

        function createResult(result) {
            console.log('About to create result');
            ResService.createResult(result).then(
                function (response) {
                    console.log('result created successfully');
                    Message.generate('Результат успешно добавлен!', 1);
                    self.result = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении результата!', 3);
                    console.error('Error while creating result');
                }
            );
        }

        function updateResult(result, id) {
            console.log('About to update result');
            ResService.updateResult(result, id)
                .then(
                    function (response) {
                        console.log('result updated successfully'+ self.organization);
                        Message.generate('Результат успешно изменен!', 1);
                    },
                    function (errResponse) {
                        console.error('Error while updating result');
                        Message.generate('Ошибка при изменении результата!', 3);
                    }
                );
        }
        function editResult(id) {
            console.log('result get');
            ResService.getResult(id).then(
                function (result) {
                    self.result = result;
                    console.log('Result get'+ self.result);
                },
                function (errResponse) {
                    console.error('Error while removing result ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeResult(id){
            console.log('About to remove result with id '+id);
            ResService.removeResult(id)
                .then(
                    function(){
                        console.log('Result '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing Result '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);