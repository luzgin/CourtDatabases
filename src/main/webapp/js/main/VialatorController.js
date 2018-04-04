'use strict';

angular.module('courtApp').controller('VialatorController',
    ['VialatorService', '$scope', '$rootScope', function (VialatorService, $scope, $rootScope) {
        var self = this;
        self.vialatorsFiz = [];
        self.vialatorsOrg = [];
        self.vialators = [];
        self.vialator = {};
        $scope.radioChecked = {on: '1'};

        self.submit = submit;
        self.createVialator = createVialator;
        self.updateVialator = updateVialator;
        self.getAllVialators = getAllVialators;
        self.getAllVialatorsFiz = getAllVialatorsFiz;
        self.getAllVialatorsOrg = getAllVialatorsOrg;
        self.editVialator = editVialator;
        self.removeVialator = removeVialator;
        self.save = save;

        $("#ModalSaveVialators").on('show.bs.modal', function () {
            if (document.getElementById("vialatorId").value != null) {
                $scope.$apply(function () {
                    self.vialator = document.getElementById("uiVialator").value;
                    if (self.vialator != null) {
                        if (self.vialator.typeVialator == 2) {
                            $scope.radioChecked = {on: '2'};
                        }
                    }
                })
            }
        });

        function getAllVialators() {
            return VialatorService.getAllVialators();
        }

        function getAllVialatorsFiz() {
            return VialatorService.getAllVialatorsFiz();
        }

        function getAllVialatorsOrg() {
            return VialatorService.getAllVialatorsOrg();
        }

        function save() {
            console.log('Submitting');
            if (self.vialator.id === undefined || self.vialator.id === null) {
                if (self.vialator.secondName !== null) {
                    self.vialator.typeVialator = 1;
                    console.log("Type fiz");
                }
                if (self.vialator.secondName == null) {
                    self.vialator.typeVialator = 2;
                    console.log("Type org");
                }
                console.log('Saving New vialator', self.vialator);
                createVialator(self.vialator);
                //$rootScope.$broadcast('setVialatorForCard', {a: self.vialator});
                $('#ModalSaveVialators').modal('toggle');
            } else {
                updateVialator(self.vialator, self.vialator.id);
                console.log('vialator updated with id ', self.vialator.id);
                $('#ModalSaveVialators').modal('toggle');
            }
        }

        function submit() {
            if ($scope.radioChecked.on == '1') {
                if ($scope.vialatorFormFiz.$valid) {
                    save();
                } else {
                    if ($scope.vialatorFormFiz.privateNumberModalVialator.$invalid) {
                        $scope.vialatorFormFiz.privateNumberModalVialator.check = true;
                        document.getElementById("privateNumber").focus();
                    } else if ($scope.vialatorFormFiz.firstNameModalVialator.$error.required) {
                        $scope.vialatorFormFiz.firstNameModalVialator.check = true;
                        document.getElementById("firstName").focus();
                    } else if ($scope.vialatorFormFiz.secondNameModalVialator.$error.required) {
                        $scope.vialatorFormFiz.secondNameModalVialator.check = true;
                        document.getElementById("secondNameFiz").focus();
                    } else if ($scope.vialatorFormFiz.lastNameModalVialator.$error.required) {
                        $scope.vialatorFormFiz.lastNameModalVialator.check = true;
                        document.getElementById("lastNameModalVialator").focus();
                    }
                }
            } else {
                if ($scope.vialatorFormUr.$valid) {
                    save();
                } else {
                    if ($scope.vialatorFormUr.unpModalVialator.$invalid) {
                        $scope.vialatorFormUr.unpModalVialator.check = true;
                        document.getElementById("unpModalVialator").focus();
                    } else if ($scope.vialatorFormUr.firstNameUrModalVialator.$error.required) {
                        $scope.vialatorFormUr.firstNameUrModalVialator.check = true;
                        document.getElementById("firstNameUrModalVialator").focus();
                    }

                }
            }

        }

        function createVialator(vialator) {
            console.log('About to create vialator');
            VialatorService.createVialator(vialator).then(
                function (response) {
                    console.log('vialator created successfully');
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
                        console.log('vialator updated successfully' + self.vialator);
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
                    console.log('vialator get' + self.vialator);
                },
                function (errResponse) {
                    console.error('Error while removing vialator ' + id + ', Error :' + errResponse.data);
                }
            );
        }

        function removeVialator(id) {
            console.log('About to remove vialator with id ' + id);
            VialatorService.removeVialator(id)
                .then(
                    function () {
                        console.log('vialator ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing vialator ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

    }
    ]);