'use strict';

angular.module('courtApp').controller('EntityDecreeController',
    ['EntityDecreeService','NameEntityDecreeService', '$scope', function (EntityDecreeService,NameEntityDecreeService, $scope) {
        var self = this;
        self.entityDecree = {};
        self.entitiesDecree = [];

        self.submit = submit;
        self.createEntityDecree = createEntityDecree;
        self.updateEntityDecree = updateEntityDecree;
        self.getAllEntitiesDecree = getAllEntitiesDecree;
        self.getAllNameEntitiesDecree = getAllNameEntitiesDecree;
        self.getStatus = getStatus;
        self.editEntityDecree = editEntityDecree;
        self.removeEntityDecree = removeEntityDecree;

        self.done = false;

        function getAllEntitiesDecree() {
            return EntityDecreeService.getAllEntitiesDecree();
        }
        function getAllNameEntitiesDecree() {
            return NameEntityDecreeService.getAllNamesEntityDecree();
        }
        function getStatus() {
            return EntityDecreeService.getStatus();
        }

        function submit() {
            console.log('Submitting');
            if (self.entityDecree.id === undefined || self.entityDecree.id === null) {
                console.log('Saving New entityDecree', self.entityDecree);
                createEntityDecree(self.entityDecree);
            } else {
                updateEntityDecree(self.entityDecree, self.entityDecree.id);
                console.log('entityDecree updated with id ', self.entityDecree.id);
            }
        }

        function createEntityDecree(entityDecree) {
            console.log('About to create entityDecree');
            EntityDecreeService.createEntityDecree(entityDecree).then(
                function (response) {
                    console.log('entityDecree created successfully');
                    self.done = true;
                    self.entityDecree = {};
                },
                function (errResponse) {
                    console.error('Error while creating entityDecree');
                }
            );
        }

        function updateEntityDecree(entityDecree, id) {
            console.log('About to update entityDecree');
            EntityDecreeService.updateEntityDecree(entityDecree, id)
                .then(
                    function (response) {
                        console.log('entityDecree updated successfully'+ self.entityDecree);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating entityDecree');
                    }
                );
        }
        function editEntityDecree(id) {
            console.log('entityDecree get');
            EntityDecreeService.getEntityDecree(id).then(
                function (entityDecree) {
                    self.entityDecree = entityDecree;
                    console.log('entityDecree get'+ self.entityDecree);
                },
                function (errResponse) {
                    console.error('Error while removing entityDecree ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeEntityDecree(id){
            console.log('About to remove entityDecree with id '+id);
            EntityDecreeService.removeEntityDecree(id)
                .then(
                    function(){
                        console.log('entityDecree '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing entityDecree '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);