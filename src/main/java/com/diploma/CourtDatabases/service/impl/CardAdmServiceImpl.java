package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.CardAdm;
import com.diploma.CourtDatabases.repository.CardAdmRepository;
import com.diploma.CourtDatabases.service.CardAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
@Service("CardAdmService")
@Transactional
public class CardAdmServiceImpl implements CardAdmService {
    @Autowired
    private CardAdmRepository cardAdmRepository;

    @Override
    public CardAdm save(CardAdm cardAdm) {
        return cardAdmRepository.save(cardAdm);
    }

    @Override
    public CardAdm update(CardAdm cardAdm) {
        return cardAdmRepository.save(cardAdm);
    }

    @Override
    public void delete(long id) {
        cardAdmRepository.delete(id);
    }

    @Override
    public List<CardAdm> findAll() {
        return cardAdmRepository.findAll();
    }

    @Override
    public CardAdm findById(long id) {
        return cardAdmRepository.findOne(id);
    }

    @Override
    public CardAdm findByCardNumber(Integer cardNumber) {
        return cardAdmRepository.findByCardNumber(cardNumber);
    }

    @Override
    public List<CardAdm> findByCreateDateBetween(Date dateFrom, Date dateTo) {
        return cardAdmRepository.findByCreateDateBetween(dateFrom,dateTo);
    }
}
