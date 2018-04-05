package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.*;
import com.diploma.CourtDatabases.entity.report.Case;
import com.diploma.CourtDatabases.entity.report.ReinstatementOfTerm;
import com.diploma.CourtDatabases.entity.report.ReportEntity;
import com.diploma.CourtDatabases.entity.report.ResultCase;
import com.diploma.CourtDatabases.service.CardAdmService;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import com.diploma.CourtDatabases.service.DateRequestCaseService;
import com.diploma.CourtDatabases.service.DateReturnCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class CardController {
    @Autowired
    private CardAdmService cardAdmService;
    @Autowired
    private ComplaintsAdmService complaintsAdmService;
    @Autowired
    private DateReturnCaseService dateReturnCaseService;

    @GetMapping(value = "/cardAdm/")
    public List<CardAdm> getAllCards() {
        return cardAdmService.findAll();
    }

    @GetMapping("/cardAdm/{id}")
    public CardAdm findById(@PathVariable("id") long id) {
        return cardAdmService.findById(id);
    }

    @PostMapping("/cardAdm/")
    public CardAdm save(@RequestBody CardAdm cardAdm) {
        System.out.println(cardAdm);
        return cardAdmService.save(cardAdm);
    }

    @PutMapping("/cardAdm/{id}")
    public void edit(@PathVariable("id") long id, @RequestBody CardAdm cardAdm) {
        CardAdm currentCardAdm = cardAdmService.findById(id);
        currentCardAdm.setCardNumber(cardAdm.getCardNumber());
        currentCardAdm.setCreateDate(cardAdm.getCreateDate());
        currentCardAdm.setDecreeAdm(cardAdm.getDecreeAdm());
        currentCardAdm.setVialator(cardAdm.getVialator());
        currentCardAdm.setArticleAdm(cardAdm.getArticleAdm());
        currentCardAdm.setEntityDecreeAdm(cardAdm.getEntityDecreeAdm());
        currentCardAdm.setNoteArticle(cardAdm.getNoteArticle());
        currentCardAdm.setJudge(cardAdm.getJudge());
        currentCardAdm.setCardActiv(cardAdm.isCardActiv());
        currentCardAdm.setResultDate(cardAdm.getResultDate());
        currentCardAdm.setResultAdmCase(cardAdm.getResultAdmCase());
        currentCardAdm.setNote(cardAdm.getNote());
        cardAdmService.update(currentCardAdm);
    }

    @DeleteMapping("/cardAdm/{id}")
    public void deleteEntity(@PathVariable("id") long id) {
        cardAdmService.delete(id);
    }

    @GetMapping(value = "/cardAdm/report/{dateFrom}/{dateTo}")
    public ReportEntity qwe(@PathVariable("dateFrom") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFrom, @PathVariable("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateTo) {
        ReportEntity reportEntity = new ReportEntity();
        Integer numberOfCases = 0;
        List<CardAdm> cardsList = cardAdmService.findByCreateDateBetween(dateFrom, dateTo); //список всех карточек за период
        HashSet<DecreeAdm> decreeSet = new HashSet<>();
        for (int i = 0; i < cardsList.size(); i++) {
            decreeSet.add(cardsList.get(i).getDecreeAdm());   //уникальные постановления из текущих карточек
        }
        Iterator<DecreeAdm> iteratorDecree = decreeSet.iterator();
        while (iteratorDecree.hasNext()) {
            DecreeAdm currentDecree = iteratorDecree.next();
            List<ComplaintsAdm> complaintsForCurrentDecree = complaintsAdmService.findByDecreeAdm(currentDecree); //жалобы для выбранного посталовления
            Date secondDate = new Date(1970, 1, 1);
            for (int i = 0; i < complaintsForCurrentDecree.size(); i++) { //фильтрация жалоб за указанный период отчета
                if (complaintsForCurrentDecree.get(i).getCardAdm().getCreateDate().getTime() >= dateFrom.getTime()
                        && complaintsForCurrentDecree.get(i).getCardAdm().getCreateDate().getTime() <= dateTo.getTime()) {
                } else {
                    complaintsForCurrentDecree.remove(i);
                }
            }
            if (complaintsForCurrentDecree.size() > 0) {
                if (complaintsForCurrentDecree.size() == 1) {
                    List<DateReturnCase> dateReturnCases = dateReturnCaseService.findByCardAdm_Id(complaintsForCurrentDecree.get(0).getCardAdm().getId());
                    if (complaintsForCurrentDecree.get(0).getDecreeAdm().getOrganization().getType() == 1) {
                        if (!complaintsForCurrentDecree.get(0).isReinstatementOfTerm()) {
                            ResultCase resultCase = new ResultCase();
                            if (complaintsForCurrentDecree.get(0).getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                resultCase.setResultNumber(6);//Возвращено без рассмотрения
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 1) {
                                resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 2) {
                                resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 3) {
                                resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 4) {
                                resultCase.setResultNumber(4);//Отменено последнее по времени постановление, и ост
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 5) {
                                resultCase.setResultNumber(5);//Изменено постановление
                            }
                            reportEntity.getReportCoutrs().add(resultCase);
                        } else {
                            ReinstatementOfTerm reinstatementOfTerm = new ReinstatementOfTerm();
                            if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 1) {// если жалоба на востановление срока отклонена
                                reinstatementOfTerm.setReinstatementOfTerm(false);
                            } else {
                                reinstatementOfTerm.setReinstatementOfTerm(true);
                            }
                            reportEntity.getReportCoutrs().add(reinstatementOfTerm);
                        }
                    } else {
                        if (!complaintsForCurrentDecree.get(0).isReinstatementOfTerm()) {
                            ResultCase resultCase = new ResultCase();
                            if (complaintsForCurrentDecree.get(0).getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                resultCase.setResultNumber(6);//Возвращено без рассмотрения
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 1) {
                                resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 2) {
                                resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 3) {
                                resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 4) {
                                resultCase.setResultNumber(4);//Отменено последнее по времени постановление, и ост
                            } else if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 5) {
                                resultCase.setResultNumber(5);//Изменено постановление
                            }
                            reportEntity.getOtherOrganization().add(resultCase);
                        } else {
                            ReinstatementOfTerm reinstatementOfTerm = new ReinstatementOfTerm();
                            if (complaintsForCurrentDecree.get(0).getCardAdm().getResultAdmCase().getId() == 1) {// если жалоба на востановление срока отклонена
                                reinstatementOfTerm.setReinstatementOfTerm(false);
                            } else {
                                reinstatementOfTerm.setReinstatementOfTerm(true);
                            }
                            reportEntity.getOtherOrganization().add(reinstatementOfTerm);
                        }
                    }
                } else {// если жалоб на постановление больше 1

                    List<ComplaintsAdm> listComplaintsForCurrentDecree = complaintsForCurrentDecree;
                    for (int i = 0; i < listComplaintsForCurrentDecree.size(); i++) { 
                        ComplaintsAdm complaint1 = listComplaintsForCurrentDecree.get(i);
                        Date firstComplaintCreateDate = complaint1.getComplainDate();
                        Date firstComplaintCardResultDate = complaint1.getCardAdm().getResultDate();
                        for (int j = 0; j < complaintsForCurrentDecree.size(); j++) {
                            ComplaintsAdm complaint2 = complaintsForCurrentDecree.get(j);
                            if (!complaint1.equals(complaint2) && complaint2.getComplainDate().getTime() >= firstComplaintCreateDate.getTime()
                                    && complaint2.getComplainDate().getTime() <= firstComplaintCardResultDate.getTime()) {
                                listComplaintsForCurrentDecree.remove(j);
                            }
                        }
                    }
                    for (ComplaintsAdm complaint:
                            listComplaintsForCurrentDecree) {
                        List<DateReturnCase> dateReturnCases = dateReturnCaseService.findByCardAdm_Id(complaint.getCardAdm().getId());
                        if (complaint.getDecreeAdm().getOrganization().getType() == 1) {
                            if (!complaint.isReinstatementOfTerm()) {
                                ResultCase resultCase = new ResultCase();
                                if (complaint.getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                    resultCase.setResultNumber(6);//Возвращено без рассмотрения
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {
                                    resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 2) {
                                    resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 3) {
                                    resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 4) {
                                    resultCase.setResultNumber(4);//Отменено последнее по времени постановление, и ост
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 5) {
                                    resultCase.setResultNumber(5);//Изменено постановление
                                }
                                reportEntity.getReportCoutrs().add(resultCase);
                            } else {
                                ReinstatementOfTerm reinstatementOfTerm = new ReinstatementOfTerm();
                                if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {// если жалоба на востановление срока отклонена
                                    reinstatementOfTerm.setReinstatementOfTerm(false);
                                } else {
                                    reinstatementOfTerm.setReinstatementOfTerm(true);
                                }
                                reportEntity.getReportCoutrs().add(reinstatementOfTerm);
                            }
                        } else {
                            if (!complaint.isReinstatementOfTerm()) {
                                ResultCase resultCase = new ResultCase();
                                if (complaint.getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                    resultCase.setResultNumber(6);//Возвращено без рассмотрения
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {
                                    resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 2) {
                                    resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 3) {
                                    resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 4) {
                                    resultCase.setResultNumber(4);//Отменено последнее по времени постановление, и ост
                                } else if (complaint.getCardAdm().getResultAdmCase().getId() == 5) {
                                    resultCase.setResultNumber(5);//Изменено постановление
                                }
                                reportEntity.getOtherOrganization().add(resultCase);
                            } else {
                                ReinstatementOfTerm reinstatementOfTerm = new ReinstatementOfTerm();
                                if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {// если жалоба на востановление срока отклонена
                                    reinstatementOfTerm.setReinstatementOfTerm(false);
                                } else {
                                    reinstatementOfTerm.setReinstatementOfTerm(true);
                                }
                                reportEntity.getOtherOrganization().add(reinstatementOfTerm);
                            }
                        }
                    }
                }
            }
        }
        return reportEntity;
    }
}
