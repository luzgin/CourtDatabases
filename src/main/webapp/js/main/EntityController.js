'use strict';

angular.module('courtApp').controller('EntityController',
    ['EntityService', '$scope', function (EntityService, $scope) {
        var self = this;
        self.entity = {};
        self.entities = [];

        self.submit = submit;
        self.createEntity = createEntity;
        self.updateEntity = updateEntity;
        self.getAllEntities = getAllEntities;
        self.editEntity = editEntity;
        self.removeEntity = removeEntity;

        self.done = false;

        function getAllEntities() {
            return EntityService.getAllEntities();
        }

        function submit() {
            console.log('Submitting');
            if (self.entity.id === undefined || self.entity.id === null) {
                console.log('Saving New entity', self.entity);
                createEntity(self.entity);
            } else {
                updateEntity(self.entity, self.entity.id);
                console.log('entity updated with id ', self.entity.id);
            }
        }

        function createEntity(entity) {
            console.log('About to create entity');
            EntityService.createEntity(entity).then(
                function (response) {
                    console.log('entity created successfully');
                    self.done = true;
                    self.entity = {};
                },
                function (errResponse) {
                    console.error('Error while creating entity');
                }
            );
        }

        function updateEntity(entity, id) {
            console.log('About to update entity');
            EntityService.updateEntity(entity, id)
                .then(
                    function (response) {
                        console.log('entity updated successfully'+ self.entity);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating entity');
                    }
                );
        }
        function editEntity(id) {
            console.log('entity get');
            EntityService.getEntity(id).then(
                function (entity) {
                    self.entity = entity;
                    console.log('entity get'+ self.entity);
                },
                function (errResponse) {
                    console.error('Error while removing entity ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeEntity(id){
            console.log('About to remove entity with id '+id);
            EntityService.removeEntity(id)
                .then(
                    function(){
                        console.log('entity '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing entity '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);