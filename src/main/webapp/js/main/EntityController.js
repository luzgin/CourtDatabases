'use strict';

angular.module('courtApp').controller('EntityController',
    ['EntityService', '$scope', 'NgTableParams', function (EntityService, $scope, NgTableParams) {
        var self = this;
        self.entity = {};
        self.entities = [];
        var data = getAllEntities();
        self.tableParams = new NgTableParams({
            sorting: {name: "asc"},
            count: 10
        }, {counts: [10, 25, 50], dataset: data});

        self.submit = submit;
        self.createEntity = createEntity;
        self.updateEntity = updateEntity;
        self.getAllEntities = getAllEntities;
        self.editEntity = editEntity;
        self.removeEntity = removeEntity;
        self.clearEntity = clearEntity;
        self.modalShow = modalShow;


        function getAllEntities() {
            return EntityService.getAllEntities();
        }
        function clearEntity() {
            self.entity = {};
        }

        function submit() {
            console.log('Submitting');
            if (self.entity.id === undefined || self.entity.id === null) {
                console.log('Saving New entity', self.entity);
                createEntity(self.entity);
                $('#ModalSaveEntityIsk').modal('toggle');
            } else {
                updateEntity(self.entity, self.entity.id);
                console.log('entity updated with id ', self.entity.id);
                $('#ModalSaveEntityIsk').modal('toggle');
            }
        }

        function createEntity(entity) {
            console.log('About to create entity');
            EntityService.createEntity(entity).then(
                function (response) {
                    Message.generate('Сущность жалобы успешно добавлена!', 1);
                    console.log('entity created successfully');
                    self.entity = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении сущности жалобы!', 3);
                    console.error('Error while creating entity');
                }
            );
        }

        function updateEntity(entity, id) {
            console.log('About to update entity');
            EntityService.updateEntity(entity, id)
                .then(
                    function (response) {
                        Message.generate('Сущность жалобы успешно изменена!', 1);
                        console.log('entity updated successfully'+ self.entity);
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении сущности жалобы!', 3);
                        console.error('Error while updating entity');
                    }
                );
        }

        function modalShow(entity) {
            self.entity = entity;
            $('#ModalSaveEntityIsk').modal('toggle');
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