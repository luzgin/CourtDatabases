package com.diploma.CourtDatabases.entity.report;

import java.util.ArrayList;
import java.util.List;

public class Organization {
    private List<ResultCase> resultCases;
    private List<ReinstatementOfTerm> reinstatementOfTerms;

    public Organization() {
        setResultCases(new ArrayList<ResultCase>());
        setReinstatementOfTerms(new ArrayList<ReinstatementOfTerm>());
    }

    public List<ResultCase> getResultCases() {
        return resultCases;
    }

    public void setResultCases(List<ResultCase> resultCases) {
        this.resultCases = resultCases;
    }

    public List<ReinstatementOfTerm> getReinstatementOfTerms() {
        return reinstatementOfTerms;
    }

    public void setReinstatementOfTerms(List<ReinstatementOfTerm> reinstatementOfTerms) {
        this.reinstatementOfTerms = reinstatementOfTerms;
    }

    @Override
    public String toString() {
        return "ReportCoutrs{" +
                "resultCases=" + resultCases +
                ", reinstatementOfTerms=" + reinstatementOfTerms +
                '}';
    }
}
