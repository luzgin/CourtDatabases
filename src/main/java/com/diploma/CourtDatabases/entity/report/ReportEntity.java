package com.diploma.CourtDatabases.entity.report;

import java.util.List;

public class ReportEntity {
    private List<Case> reportCoutrs;
    private List<Case> otherOrganization;

    public ReportEntity() {

    }

    public List<Case> getReportCoutrs() {
        return reportCoutrs;
    }

    public void setReportCoutrs(List<Case> reportCoutrs) {
        this.reportCoutrs = reportCoutrs;
    }

    public List<Case> getOtherOrganization() {
        return otherOrganization;
    }

    public void setOtherOrganization(List<Case> otherOrganization) {
        this.otherOrganization = otherOrganization;
    }

    @Override
    public String toString() {
        return "ReportEntity{" +
                "reportCoutrs=" + reportCoutrs +
                ", otherOrganization=" + otherOrganization +
                '}';
    }
}
