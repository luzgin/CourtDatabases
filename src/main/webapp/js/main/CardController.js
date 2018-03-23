'use strict';

angular.module('courtApp').controller('CardController',
    ['$localStorage', 'CardService', 'ArticleService', 'AuthorService', 'ComplaintService', 'OrgService',
        'DecreeService', 'SecondInstanceService', 'EntityDecreeService', 'EntityService',
        'NameEntityDecreeService', 'ResService', 'VialatorService', 'DateReturnService', 'DateRequestService', '$scope','$rootScope',
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
            self.convertToDate = convertToDate;
            self.getComplaintsForDecree = getComplaintsForDecree;
            self.setComplaintForEdit = setComplaintForEdit;
            self.removeComplaint = removeComplaint;
            self.editComplaint = editComplaint;
            self.getAuthorsForRegionalCourt = getAuthorsForRegionalCourt;
            self.getDateReturnCaseForCard = getDateReturnCaseForCard;
            self.getDateRequestCaseForCard = getDateRequestCaseForCard;
            self.setReturnCase = setReturnCase;
            self.removeReturnCase = removeReturnCase;
            self.setRequestCase = setRequestCase;
            self.removeRequestCase = removeRequestCase;
            self.editReturnCase = editReturnCase;
            self.editRequestCase = editRequestCase;

            self.createComplaint = createComplaint;
            self.createReturnCase = createReturnCase;
            self.createRequestCase = createRequestCase;

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
                if( self.complaintForEdit != item){
                    self.complaintForEdit = item;
                    document.getElementById("editComplaint").removeAttribute('disabled');
                    document.getElementById("removeComplaint").removeAttribute('disabled');
                }else {
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

            function convertToDate(date) {
                var d = new Date(date);
                var s;
                if (d.getDate() < 10) {
                    s = "0" + (d.getDate())
                } else {
                    s = d.getDate()
                }
                s = s + ".";
                if (d.getMonth() < 10) {
                    s = s + "0" + (d.getMonth() + 1)
                } else {
                    s = s + d.getMonth()
                }
                d = s + "." + d.getFullYear();
                return d;
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
                return AuthorService.getAllAuthorsForOrganization();
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
                $rootScope.$broadcast('editComplaint', {a :self.complaintForEdit});
            }
            function editReturnCase() {
                $rootScope.$broadcast('editReturnCase', {b :self.returnCase});
            }
            function editRequestCase() {
                $rootScope.$broadcast('editRequestCase', {c :self.requestCase});
            }
        }
    ]);