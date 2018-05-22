'use strict';

angular.module('courtApp').controller('VialatorController',
    ['VialatorService', '$scope', '$rootScope', 'NgTableParams', function (VialatorService, $scope, $rootScope, NgTableParams) {
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
        self.modalShow = modalShow;


        self.tableFiz = new NgTableParams({
            sorting: {name: "asc"},
            count: 15
        }, {counts: [15, 50, 100], dataset: getAllVialatorsFiz()});

        self.tableOrg = new NgTableParams({
            sorting: {name: "asc"},
            count: 15
        }, {counts: [15, 50, 100], dataset: getAllVialatorsOrg()});

        $("#ModalSaveVialators").on('show.bs.modal', function () {
            if (document.getElementById("vialatorId") != null) {
                if (document.getElementById("vialatorId").value != null) {
                    $scope.$apply(function () {
                        try {
                            self.vialator = document.getElementById("uiVialator").value;
                        } catch (e) {
                        }
                        if (self.vialator != null) {
                            if (self.vialator.typeVialator == 2) {
                                $scope.radioChecked = {on: '2'};
                            } else {
                                $scope.radioChecked = {on: '1'};
                            }
                        }
                    })
                }
            }
        });


        function modalShow(vialator) {
            self.vialator = vialator;
            $('#ModalSaveVialators').modal('toggle');
        }

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
                        Message.generate('Укажите личный номер!', 2);
                        document.getElementById("privateNumber").focus();
                    } else if ($scope.vialatorFormFiz.firstNameModalVialator.$error.required) {
                        Message.generate('Укажите фамилию!', 2);
                        $scope.vialatorFormFiz.firstNameModalVialator.check = true;
                        document.getElementById("firstName").focus();
                    } else if ($scope.vialatorFormFiz.secondNameModalVialator.$error.required) {
                        Message.generate('Укажите имя!', 2);
                        $scope.vialatorFormFiz.secondNameModalVialator.check = true;
                        document.getElementById("secondNameFiz").focus();
                    } else if ($scope.vialatorFormFiz.lastNameModalVialator.$error.required) {
                        Message.generate('Укажите отчество!', 2);
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
                        Message.generate('Укажите УНП!', 2);
                    } else if ($scope.vialatorFormUr.firstNameUrModalVialator.$error.required) {
                        $scope.vialatorFormUr.firstNameUrModalVialator.check = true;
                        Message.generate('Укажите название!', 2);
                        document.getElementById("firstNameUrModalVialator").focus();
                    }

                }
            }

        }

        function createVialator(vialator) {
            console.log('About to create vialator');
            VialatorService.createVialator(vialator).then(
                function (response) {
                    Message.generate('Правонарушитель успешно добавлен!', 1);
                    console.log('vialator created successfully');
                    self.vialator = {};
                },
                function (errResponse) {
                    Message.generate('Ошибка при добавлении правонарушителя', 3);
                    console.error('Error while creating vialator');
                }
            );
        }

        function updateVialator(vialator, id) {
            console.log('About to update vialator');
            VialatorService.updateVialator(vialator, id)
                .then(
                    function (response) {
                        Message.generate('Правонарушитель успешно изменен!', 1);
                        console.log('vialator updated successfully' + self.vialator);
                        self.done = true;
                    },
                    function (errResponse) {
                        Message.generate('Ошибка при изменении правонарушителя', 3);
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