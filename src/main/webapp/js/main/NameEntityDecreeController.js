'use strict';

angular.module('courtApp').controller('NameEntityDecreeController',
    ['NameEntityDecreeService', '$scope', function (NameEntityDecreeService, $scope) {
        var self = this;
        self.nameEntityDecree = {};
        self.namesEntityDecree = [];

        self.submit = submit;
        self.createNameEntityDecree = createNameEntityDecree;
        self.updateNameEntityDecree = updateNameEntityDecree;
        self.getAllNamesEntityDecree = getAllNamesEntityDecree;
        self.editNameEntityDecree = editNameEntityDecree;
        self.removeNameEntityDecree = removeNameEntityDecree;

        self.clearMameEntityDecree = clearMameEntityDecree;

        function getAllNamesEntityDecree() {
            return NameEntityDecreeService.getAllNamesEntityDecree();
        }
        function clearMameEntityDecree() {
            self.nameEntityDecree = {};
        }

        function submit() {
            console.log('Submitting');
            if (self.nameEntityDecree.id === undefined || self.nameEntityDecree.id === null) {
                console.log('Saving New nameEntityDecree', self.nameEntityDecree);
                createNameEntityDecree(self.nameEntityDecree);
                $('#ModalSaveNameEntityDecree').modal('toggle');
            } else {
                updateNameEntityDecree(self.nameEntityDecree, self.nameEntityDecree.id);
                console.log('nameEntityDecree updated with id ', self.nameEntityDecree.id);
                $('#ModalSaveNameEntityDecree').modal('toggle');
            }
        }

        function createNameEntityDecree(nameEntityDecree) {
            console.log('About to create nameEntityDecree');
            NameEntityDecreeService.createNameEntityDecree(nameEntityDecree).then(
                function (response) {
                    console.log('nameEntityDecree created successfully');
                    Message.generate('Сущность постановления успешно добавлена!', 1);
                    self.nameEntityDecree = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении сущности постановления!', 3);
                    console.error('Error while creating nameEntityDecree');
                }
            );
        }

        function updateNameEntityDecree(nameEntityDecree, id) {
            console.log('About to update nameEntityDecree');
            NameEntityDecreeService.updateNameEntityDecree(nameEntityDecree, id)
                .then(
                    function (response) {
                        console.log('nameEntityDecree updated successfully'+ self.organization);
                        Message.generate('Сущность постановления успешно изменена!', 1);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении сущности постановления!', 3);
                        console.error('Error while updating nameEntityDecree');
                    }
                );
        }
        function editNameEntityDecree(id) {
            console.log('nameEntityDecree get');
            NameEntityDecreeService.getNameEntityDecree(id).then(
                function (nameEntityDecree) {
                    self.nameEntityDecree = nameEntityDecree;
                    console.log('NameEntityDecree get'+ self.nameEntityDecree);
                },
                function (errResponse) {
                    console.error('Error while removing nameEntityDecree ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeNameEntityDecree(id){
            console.log('About to remove nameEntityDecree with id '+id);
            NameEntityDecreeService.removeNameEntityDecree(id)
                .then(
                    function(){
                        console.log('NameEntityDecree '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing NameEntityDecree '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);