'use strict';

angular.module('courtApp').controller('CardController',
    ['$localStorage', 'CardService', 'ArticleService', 'AuthorService', 'ComplaintService', 'OrgService',
        'DecreeService', 'SecondInstanceService', 'EntityDecreeService', 'EntityService',
        'NameEntityDecreeService', 'ResService', 'VialatorService', 'DateReturnService', 'DateRequestService', '$scope', '$rootScope',
        function ($localStorage, CardService, ArticleService, AuthorService, ComplaintService, OrgService,
                  DecreeService, SecondInstanceService, EntityDecreeService, EntityService,
                  NameEntityDecreeService, ResService, VialatorService, DateReturnService, DateRequestService, $scope, $rootScope) {

            var self = this;
            self.card = CardService.getCardLocal();
            self.complaintForEdit = {};
            self.returnCase = {};
            self.requestCase = {};
            self.submit = submit;
            self.createCard = createCard;
            self.updateCard = updateCard;
            self.editCard = editCard;
            self.getAllArticles = getAllArticles;
            self.getAllNamesEntityDecree = getAllNamesEntityDecree;
            self.getAllEntitiesDecree = getAllEntitiesDecree;
            self.getAllResults = getAllResults;
            self.getAllRegulations = getAllRegulations;
            self.getAllSecondInstances = getAllSecondInstances;
            self.getAllAuthors = getAllAuthors;
            self.getAllVialators = getAllVialators;
            self.parseToDate = parseToDate;
            self.getAuthorsForRegionalCourt = getAuthorsForRegionalCourt;
            self.paintTable = paintTable;

            self.createComplaint = createComplaint;
            self.setComplaintForEdit = setComplaintForEdit;
            self.getComplaintsForDecree = getComplaintsForDecree;
            self.editComplaint = editComplaint;
            self.removeComplaint = removeComplaint;

            self.createReturnCase = createReturnCase;
            self.editReturnCase = editReturnCase;
            self.setReturnCase = setReturnCase;
            self.removeReturnCase = removeReturnCase;
            self.getDateReturnCaseForCard = getDateReturnCaseForCard;

            self.createRequestCase = createRequestCase;
            self.setRequestCase = setRequestCase;
            self.editRequestCase = editRequestCase;
            self.removeRequestCase = removeRequestCase;
            self.getDateRequestCaseForCard = getDateRequestCaseForCard;

            self.card.createDate = new Date(self.card.createDate);
            if (self.card.resultDate != null) {
                self.card.resultDate = new Date(self.card.resultDate);
            }
            if (self.card.decreeAdm != null) {
                document.getElementById("addDecree").setAttribute('disabled', 'disabled');
                self.card.decreeAdm.decreeDate = new Date(self.card.decreeAdm.decreeDate);
            }
            if (self.card.vialator != null) {
                document.getElementById("addVialator").setAttribute('disabled', 'disabled');
            }

            document.getElementById("editComplaint").setAttribute('disabled', 'disabled');
            document.getElementById("removeComplaint").setAttribute('disabled', 'disabled');
            document.getElementById("editDateReturn").setAttribute('disabled', 'disabled');
            document.getElementById("removeDateReturn").setAttribute('disabled', 'disabled');
            document.getElementById("editDateRequest").setAttribute('disabled', 'disabled');
            document.getElementById("removeDateRequest").setAttribute('disabled', 'disabled');

            function setReturnCase(item) {
                if (self.returnCase == item) {
                    self.returnCase = {};
                    document.getElementById("editDateReturn").setAttribute('disabled', 'disabled');
                    document.getElementById("removeDateReturn").setAttribute('disabled', 'disabled');
                } else {
                    self.returnCase = item;
                    document.getElementById("editDateReturn").removeAttribute('disabled');
                    document.getElementById("removeDateReturn").removeAttribute('disabled');
                }
            }

            function setRequestCase(item) {
                if (self.requestCase == item) {
                    self.requestCase = {};
                    document.getElementById("editDateRequest").setAttribute('disabled', 'disabled');
                    document.getElementById("removeDateRequest").setAttribute('disabled', 'disabled');
                } else {
                    self.requestCase = item;
                    document.getElementById("editDateRequest").removeAttribute('disabled');
                    document.getElementById("removeDateRequest").removeAttribute('disabled');

                }
            }

            function setComplaintForEdit(item) {
                if (item.cardAdm.cardNumber === document.getElementById("numberCard").value) {
                    if (self.complaintForEdit != item) {
                        self.complaintForEdit = item;
                        document.getElementById("editComplaint").removeAttribute('disabled');
                        document.getElementById("removeComplaint").removeAttribute('disabled');
                    } else {
                        self.complaintForEdit = {};
                        document.getElementById("editComplaint").setAttribute('disabled', 'disabled');
                        document.getElementById("removeComplaint").setAttribute('disabled', 'disabled');
                    }
                }else{
                    self.complaintForEdit = {};
                    document.getElementById("editComplaint").setAttribute('disabled', 'disabled');
                    document.getElementById("removeComplaint").setAttribute('disabled', 'disabled');
                }

            }

            function removeReturnCase() {
                if (self.returnCase != null) {
                    console.log('remove return case', self.returnCase);
                    DateReturnService.removeDateReturn(self.returnCase.id).then(
                        function () {
                            console.log('return case  removed successfully');
                        },
                        function (errResponse) {
                            console.error('Error while removing return case, Error :' + errResponse.data);
                        }
                    );
                    ;
                }
            }

            function removeRequestCase() {
                if (self.requestCase != null) {
                    console.log('remove request case', self.requestCase);
                    DateRequestService.removeDateRequest(self.requestCase.id).then(
                        function () {
                            console.log('request case  removed successfully');
                        },
                        function (errResponse) {
                            console.error('Error while removing request case, Error :' + errResponse.data);
                        }
                    );
                    ;
                }
            }


            function getAllArticles() {
                return ArticleService.getAllArticles();
            }

            function getComplaintsForDecree() {
                return ComplaintService.getComplaintsForDecree();
            }

            function parseToDate(date) {
                return new Date(date);
            }

            function getAllNamesEntityDecree() {
                return NameEntityDecreeService.getAllNamesEntityDecree();
            }

            //пересмотреть и удалить
            function getAllEntitiesDecree() {
                return EntityDecreeService.getAllEntitiesDecree();
            }

            function getAllResults() {
                return ResService.getAllResults();
            }

            function getAuthorsForRegionalCourt() {
                return AuthorService.getAuthorsForRegionalCourt();
            }

            function getAllRegulations() {
                return DecreeService.getAllRegulations();
            }

            function getAllSecondInstances() {
                return SecondInstanceService.getAllSecondInstances();
            }

            function getAllAuthors() {
                return AuthorService.getAllAuthors();
            }

            function getAllVialators() {
                return VialatorService.getAllVialators();
            }

            function getDateReturnCaseForCard() {
                return DateReturnService.getDateReturnForCard();

            }

            function getDateRequestCaseForCard() {
                return DateRequestService.getDateRequestForCard();

            }

            function submit() {
                console.log('Submitting');
                if (self.card.id === undefined || self.card.id === null) {
                    console.log('Saving New card', self.card);
                    createCard(self.card);
                } else {
                    updateCard(self.card, self.card.id);
                    console.log('card updated with id ', self.card.id);
                }
            }

            function createCard(card) {
                console.log('About to create card');
                CardService.createCard(card).then(
                    function (response) {
                        self.card.id = response.id;
                        ComplaintService.loadComplaintsForDecree(self.card.decreeAdm.id);
                        console.log('card created successfully');
                    },
                    function (errResponse) {
                        console.error('Error while creating card');
                    }
                );
            }

            function updateCard(card, id) {
                console.log('About to update card');
                CardService.updateCard(card, id)
                    .then(
                        function (response) {
                            console.log('card updated successfully' + self.card);
                        },
                        function (errResponse) {
                            console.error('Error while updating card');
                        }
                    );
            }

            function editCard(id) {
                console.log('card get');
                CardService.getCard(id).then(
                    function (card) {
                        self.card = card;
                        console.log('card get' + self.card);
                    },
                    function (errResponse) {
                        console.error('Error while removing card ' + id + ', Error :' + errResponse.data);
                    }
                );
            }

            function removeComplaint() {
                console.log('About to remove complaint ');
                ComplaintService.removeComplaint(self.complaintForEdit)
                    .then(
                        function () {
                            console.log('complaint  removed successfully');
                        },
                        function (errResponse) {
                            console.error('Error while removing card, Error :' + errResponse.data);
                        }
                    );
            }

            function createComplaint() {
                $rootScope.$broadcast('createComplaint');


            }

            function createReturnCase() {
                $rootScope.$broadcast('createReturnCase');
            }

            function createRequestCase() {
                $rootScope.$broadcast('createRequestCase');

            }

            function editComplaint() {
                $rootScope.$broadcast('editComplaint', {a: self.complaintForEdit});

            }

            function paintTable() {

            }
            function editReturnCase() {
                $rootScope.$broadcast('editReturnCase', {b: self.returnCase});
            }

            function editRequestCase() {
                $rootScope.$broadcast('editRequestCase', {c: self.requestCase});
            }


            $scope.$on('printTable', function () {
                var table = document.getElementById("complaintsTable");
                for (var i = 1; i < table.rows.length; i++) {
                    if (table.rows[i].cells[0].innerHTML === document.getElementById("numberCard").value) {
                        table.rows[i].style.backgroundColor = '#ceffc3';
                    }
                }
            })
            $scope.$on('setDecreeForCard', function (setDecreeForCard, item) {
                self.card.decreeAdm = item.a;
            })
            $scope.$on('setVialatorForCard', function (setVialatorForCard, item) {
                self.card.vialator = item.a;
            })
        }
    ]);