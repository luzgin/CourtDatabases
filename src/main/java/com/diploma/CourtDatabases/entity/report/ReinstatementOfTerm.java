package com.diploma.CourtDatabases.entity.report;

import com.diploma.CourtDatabases.entity.CardAdm;

public class ReinstatementOfTerm extends Case {
    private boolean reinstatementOfTerm;

    public ReinstatementOfTerm() {
    }

    public boolean isReinstatementOfTerm() {
        return reinstatementOfTerm;
    }

    public void setReinstatementOfTerm(boolean reinstatementOfTerm) {
        this.reinstatementOfTerm = reinstatementOfTerm;
    }


    @Override
    public String toString() {
        return "ReinstatementOfTerm{" +
                "reinstatementOfTerm=" + reinstatementOfTerm +
                '}';
    }
}
