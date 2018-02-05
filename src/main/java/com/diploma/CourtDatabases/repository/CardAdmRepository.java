package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.CardAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardAdmRepository extends JpaRepository<CardAdm, Long> {
    CardAdm findByCardNumber (Integer cardNumber);
}
