package com.diploma.CourtDatabases.entity.report;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import lombok.Data;

import java.util.Date;

@Data
public class ComplaintAdmReport extends ComplaintsAdm {
    private Date dateAnswer;
}
