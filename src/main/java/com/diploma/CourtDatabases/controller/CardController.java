package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.CardAdm;
import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.DecreeAdm;
import com.diploma.CourtDatabases.service.CardAdmService;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class CardController {
    @Autowired
    private CardAdmService cardAdmService;
    @Autowired
    private ComplaintsAdmService complaintsAdmService;

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

    public void qwe(@PathVariable("dateFrom")Date dateFrom, @PathVariable("dateTo")Date dateTo){
        Integer numberOfCases = 0;
        List<CardAdm> cardsList = cardAdmService.findByCreateDateBetween(dateFrom,dateTo); //список всех карточек за период
        HashSet<DecreeAdm> decreeSet = new HashSet<>();
        for (int i = 0; i < cardsList.size(); i++) {
            decreeSet.add(cardsList.get(i).getDecreeAdm());   //уникальные постановления из текущих карточек
        }
        Iterator <DecreeAdm> iterator = decreeSet.iterator();
        while (iterator.hasNext()){
            DecreeAdm currentDecree = iterator.next();
            List<ComplaintsAdm> complaintsForCurrentDecree = complaintsAdmService.findByDecreeAdm(currentDecree); //постановления для выбранной жалобы
            if (complaintsForCurrentDecree.size() > 0){
                if(complaintsForCurrentDecree.size() == 1){
                    numberOfCases++;   //TODO может понадобится проверка на дату жалобы по постановлению
                }else {
                    int nimberOfCasesForCurrentComplaint = 0;
                    for (int i = 0; i < complaintsForCurrentDecree.size(); i++) {
                        ComplaintsAdm com = complaintsForCurrentDecree.get(i);
                        if (com.isReinstatementOfTerm() == false){ //если не восстановление срока

                        }
                    }
                }

            }
        }
    }
}
