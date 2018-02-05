package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.CardAdm;

import java.util.List;

public interface CardAdmService {
    CardAdm save (CardAdm cardAdm);
    void delete(long id);
    List<CardAdm> getAll();
    CardAdm findById(long id);
    CardAdm findByCardNumber(Integer cardNumber);
}
