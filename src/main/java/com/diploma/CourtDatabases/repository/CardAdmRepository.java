package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.CardAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CardAdmRepository extends JpaRepository<CardAdm, Long> {
    CardAdm findByCardNumber (Integer cardNumber);
    List<CardAdm> findByCreateDateBetween(Date dateFrom, Date dateTo);
}
