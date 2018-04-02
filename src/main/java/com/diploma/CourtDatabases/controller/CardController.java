package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.CardAdm;
import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.DateRequestCase;
import com.diploma.CourtDatabases.entity.DecreeAdm;
import com.diploma.CourtDatabases.service.CardAdmService;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import com.diploma.CourtDatabases.service.DateRequestCaseService;
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
    private DateRequestCaseService dateRequestCaseService;

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
    public Integer qwe(@PathVariable("dateFrom")@DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFrom, @PathVariable("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd")Date dateTo ){
        Integer numberOfCases = 0;
        List<CardAdm> cardsList = cardAdmService.findByCreateDateBetween(dateFrom,dateTo); //список всех карточек за период
        HashSet<DecreeAdm> decreeSet = new HashSet<>();
        for (int i = 0; i < cardsList.size(); i++) {
            decreeSet.add(cardsList.get(i).getDecreeAdm());   //уникальные постановления из текущих карточек
        }
        Iterator <DecreeAdm> iteratorDecree = decreeSet.iterator();
        while (iteratorDecree.hasNext()){
            DecreeAdm currentDecree = iteratorDecree.next();
            List<ComplaintsAdm> complaintsForCurrentDecree = complaintsAdmService.findByDecreeAdm(currentDecree); //жалобы для выбранного посталовления
            for (int i = 0; i < complaintsForCurrentDecree.size(); i++) { //фильтрация жалоб за указанный период отчета
                if (complaintsForCurrentDecree.get(i).getCardAdm().getCreateDate().getTime() >= dateFrom.getTime()
                        && complaintsForCurrentDecree.get(i).getCardAdm().getCreateDate().getTime() <= dateTo.getTime()){
                }else{
                    complaintsForCurrentDecree.remove(i);
                }
            }

            if (complaintsForCurrentDecree.size() > 0){
                if(complaintsForCurrentDecree.size() == 1){
                    if (!complaintsForCurrentDecree.get(0).isReinstatementOfTerm()) {
                        numberOfCases++;
                    }
                }else { // если жалоб на постановление больше 1
                    int numberOfCasesForCurrentComplaint = 0;
                    numberOfCases++;
                    for (int i = 0; i < complaintsForCurrentDecree.size(); i++) {
                        ComplaintsAdm complaint1 = complaintsForCurrentDecree.get(i);
                        Date firstComplaintCreateDate = complaint1.getComplainDate();
                        Date firstComplaintCardResultDate = complaint1.getCardAdm().getResultDate();
                        if (!complaint1.isReinstatementOfTerm()){ //если не восстановление срока
                            if (firstComplaintCardResultDate != null){
                                for (int j = 0; j < complaintsForCurrentDecree.size(); j++) {
                                    ComplaintsAdm complaint2 = complaintsForCurrentDecree.get(j);
                                    if (complaint2.getComplainDate().getTime() >= firstComplaintCreateDate.getTime()
                                            && complaint2.getComplainDate().getTime() <= firstComplaintCardResultDate.getTime()){
                                    }else{
                                        if (complaint2.getComplainDate().getTime()> firstComplaintCreateDate.getTime()) {
                                            numberOfCasesForCurrentComplaint++;
                                        }
                                    }
                                }
                            }else{
                                List<DateRequestCase> dateRequestCases = dateRequestCaseService.findByCardAdm_Id(complaint1.getCardAdm().getId());
                                if (dateRequestCases.size() != 0){
                                    for (int j = 0; j < complaintsForCurrentDecree.size(); j++) {
                                        ComplaintsAdm complaint2 = complaintsForCurrentDecree.get(j);
                                        if (complaint2.getComplainDate().getTime() >= firstComplaintCreateDate.getTime()
                                                && complaint2.getComplainDate().getTime() <= (dateRequestCases.get(0).getDate().getTime()+ 30*24*60*60*1000)){
                                        }else{
                                            if (complaint2.getComplainDate().getTime()> (dateRequestCases.get(0).getDate().getTime()+ 30*24*60*60*1000)) {
                                                numberOfCasesForCurrentComplaint++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    numberOfCases += numberOfCasesForCurrentComplaint;
                }
            }
        }
        return numberOfCases;
    }
}
