'use strict';

angular.module('courtApp').controller('VialatorController',
    ['VialatorService', '$scope', function (VialatorService, $scope) {
        var self = this;
        self.vialatorsFiz = [];
        self.vialatorsOrg = [];
        $scope.radioChecked = {on: '1'};

        self.submit = submit;
        self.createVialator = createVialator;
        self.updateVialator = updateVialator;
        self.getAllVialators = getAllVialators;
        self.getAllVialatorsFiz = getAllVialatorsFiz;
        self.getAllVialatorsOrg = getAllVialatorsOrg;
        self.editVialator = editVialator;
        self.removeVialator = removeVialator;

        self.done = false;

        function getAllVialators() {
            return VialatorService.getAllVialators();
        }
        function getAllVialatorsFiz() {
            return VialatorService.getAllVialatorsFiz();
        }
        function getAllVialatorsOrg() {
            return VialatorService.getAllVialatorsOrg();
        }

        function submit() {
            console.log('Submitting');
            if (self.vialator.id === undefined || self.vialator.id === null) {
                if (self.vialator.secondName !== null){
                    self.vialator.typeVialator = 1;
                    console.log("Type fiz");
                }
                if (self.vialator.secondName == null){
                    self.vialator.typeVialator = 2;
                    console.log("Type org");
                }
                console.log('Saving New vialator', self.vialator);
                createVialator(self.vialator);
            } else {
                updateVialator(self.vialator, self.vialator.id);
                console.log('vialator updated with id ', self.vialator.id);
            }
        }

        function createVialator(vialator) {
            console.log('About to create vialator');
            VialatorService.createVialator(vialator).then(
                function (response) {
                    console.log('vialator created successfully');
                    self.done = true;
                    self.vialator = {};
                },
                function (errResponse) {
                    console.error('Error while creating vialator');
                }
            );
        }
        function updateVialator(vialator, id) {
            console.log('About to update vialator');
            VialatorService.updateVialator(vialator, id)
                .then(
                    function (response) {
                        console.log('vialator updated successfully'+ self.vialator);
                        self.done = true;
                    },
                    function (errResponse) {
                        console.error('Error while updating vialator');
                    }
                );
        }
        function editVialator(id) {
            console.log('vialator get');
            VialatorService.getVialator(id).then(
                function (vialator) {
                    self.vialator = vialator;
                    console.log('vialator get'+ self.vialator);
                },
                function (errResponse) {
                    console.error('Error while removing vialator ' + id + ', Error :' + errResponse.data);
                }
            );
        }
        function removeVialator(id){
            console.log('About to remove vialator with id '+id);
            VialatorService.removeVialator(id)
                .then(
                    function(){
                        console.log('vialator '+id + ' removed successfully');
                    },
                    function(errResponse){
                        console.error('Error while removing vialator '+id +', Error :'+errResponse.data);
                    }
                );
        }

    }
    ]);