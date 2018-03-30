package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.CardAdm;

import java.util.Date;
import java.util.List;

public interface CardAdmService {
    CardAdm save(CardAdm cardAdm);

    CardAdm update(CardAdm cardAdm);

    void delete(long id);

    List<CardAdm> findAll();

    CardAdm findById(long id);

    CardAdm findByCardNumber(Integer cardNumber);

    List<CardAdm> findByCreateDateBetween(Date dateFrom, Date dateTo);
}
