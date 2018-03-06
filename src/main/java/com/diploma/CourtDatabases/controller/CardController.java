package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.CardAdm;
import com.diploma.CourtDatabases.service.CardAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CardController {
    @Autowired
    private CardAdmService cardAdmService;

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
        currentCardAdm.setDateRequestCase(cardAdm.getDateRequestCase());
        currentCardAdm.setDateReturnCase(cardAdm.getDateReturnCase());
        currentCardAdm.setNote(cardAdm.getNote());
        cardAdmService.update(currentCardAdm);
    }

    @DeleteMapping("/cardAdm/{id}")
    public void deleteEntity(@PathVariable("id") long id) {
        cardAdmService.delete(id);
    }
}
