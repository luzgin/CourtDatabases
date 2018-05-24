package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.DecreeAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintsAdmRepository extends JpaRepository<ComplaintsAdm, Long> {
    List<ComplaintsAdm> findByDecreeAdm_Id(Long id);
    List<ComplaintsAdm> findByDecreeAdm(DecreeAdm decreeAdm);
    List<ComplaintsAdm> findByActiv(Boolean active);
}
