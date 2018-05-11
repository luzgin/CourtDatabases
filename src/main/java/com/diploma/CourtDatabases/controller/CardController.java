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
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/cardAdm/")
    public List<CardAdm> getAllCards() {
        return cardAdmService.findAll();
    }

    @GetMapping("/cardAdm/{id}")
    public CardAdm findById(@NonNull @PathVariable("id") long id) {
        return cardAdmService.findById(id);
    }

    @PostMapping("/cardAdm/")
    public CardAdm save(@NonNull @RequestBody CardAdm cardAdm) {
        System.out.println(cardAdm);
        return cardAdmService.save(cardAdm);
    }

    @PutMapping("/cardAdm/{id}")
    public void edit(@NonNull @PathVariable("id") long id, @NonNull @RequestBody CardAdm cardAdm) {
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
    public void deleteEntity(@NonNull @PathVariable("id") long id) {
        cardAdmService.delete(id);
    }

    @GetMapping(value = "/cardAdm/report/{dateFrom}/{dateTo}")
    public ReportEntity finalReport(@NonNull @PathVariable("dateFrom") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFrom,
                                    @NonNull @PathVariable("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateTo) {
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
                // если жалоб на постановление больше 1

                List<ComplaintsAdm> listComplaintsForCurrentDecree = complaintsForCurrentDecree;
                for (int i = 0; i < listComplaintsForCurrentDecree.size(); i++) {
                    ComplaintsAdm complaint1 = listComplaintsForCurrentDecree.get(i);
                    Date firstComplaintCreateDate = complaint1.getComplainDate();
                    Date firstComplaintCardResultDate = complaint1.getCardAdm().getResultDate();
                    List<DateReturnCase> dateReturnCasesCom1 = dateReturnCaseService.findByCardAdm_Id(complaint1.getCardAdm().getId());
                    if (firstComplaintCardResultDate == null && dateReturnCasesCom1.size() == 0) {
                        listComplaintsForCurrentDecree.remove(i);
                    } else if (firstComplaintCardResultDate == null && dateReturnCasesCom1.size() != 0) {
                        firstComplaintCardResultDate = dateReturnCasesCom1.get(0).getDate();
                    } else {
                        for (int j = 0; j < complaintsForCurrentDecree.size(); j++) {
                            ComplaintsAdm complaint2 = complaintsForCurrentDecree.get(j);
                            if (!complaint1.equals(complaint2)) {
                                Date secondComplaintCardResultDate = complaint2.getCardAdm().getResultDate();
                                List<DateReturnCase> dateReturnCasesCom2 = dateReturnCaseService.findByCardAdm_Id(complaint2.getCardAdm().getId());
                                if ((secondComplaintCardResultDate != null) || (secondComplaintCardResultDate == null && dateReturnCasesCom2.size() != 0)) {
                                    if (complaint2.getComplainDate().getTime() >= firstComplaintCreateDate.getTime()
                                            && complaint2.getComplainDate().getTime() <= firstComplaintCardResultDate.getTime()) {
                                        listComplaintsForCurrentDecree.remove(j);
                                    }
                                }
                            }
                        }
                    }
                }
                for (ComplaintsAdm complaint :
                        listComplaintsForCurrentDecree) {
                    List<DateReturnCase> dateReturnCases = dateReturnCaseService.findByCardAdm_Id(complaint.getCardAdm().getId());
                    if (complaint.getDecreeAdm().getOrganization().getType() == 1) { //подведомственно судам
                        if (!complaint.isReinstatementOfTerm()) {
                            ResultCase resultCase = new ResultCase();
                            if (complaint.getDecreeAdm().getSecondInstanceAdm() != null){
                                resultCase.setSenondInstance(true);
                            }else{
                                resultCase.setSenondInstance(false);
                            }
                            if (complaint.getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                resultCase.setResultNumber(8);//Возвращено без рассмотрения
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {
                                resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 2) {
                                resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 3) {
                                resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 4) {
                                resultCase.setResultNumber(4);//Отменено полностью или в части и прекращено дело в связи с возбуждением уголовного дела
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 5) {
                                resultCase.setResultNumber(5);//Отменено последнее по времени постановление, и ост
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 6) {
                                resultCase.setResultNumber(6);//Изменено постановление
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 7) {
                                resultCase.setResultNumber(7);//Направлено на рассмотрение в другие органы
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
                    } else { //подведомственно другим организациям
                        if (!complaint.isReinstatementOfTerm()) {
                            ResultCase resultCase = new ResultCase();
                            if (complaint.getCardAdm().getResultDate() == null && dateReturnCases.size() != 0) {
                                resultCase.setResultNumber(8);//Возвращено без рассмотрения
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 1) {
                                resultCase.setResultNumber(1); //Оставлено без изменения, а жалоба (протест) - без
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 2) {
                                resultCase.setResultNumber(2);//Отменено полностью или в части и направлено на нов.
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 3) {
                                resultCase.setResultNumber(3);//Отменено полностью или в части и прекращено дело
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 4) {
                                resultCase.setResultNumber(4);//Отменено полностью или в части и прекращено дело в связи с возбуждением уголовного дела
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 5) {
                                resultCase.setResultNumber(5);//Отменено последнее по времени постановление, и ост
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 6) {
                                resultCase.setResultNumber(6);//Изменено постановление
                            } else if (complaint.getCardAdm().getResultAdmCase().getId() == 7) {
                                resultCase.setResultNumber(7);//Направлено на рассмотрение в другие органы
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
        return reportEntity;
    }
}
