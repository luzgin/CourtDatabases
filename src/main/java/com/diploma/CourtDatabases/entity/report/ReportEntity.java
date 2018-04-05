package com.diploma.CourtDatabases.entity.report;

import java.util.ArrayList;
import java.util.List;

public class ReportEntity {
    private List<Case> reportCourts;
    private List<Case> otherOrganization;

    public ReportEntity() {
        this.reportCourts = new ArrayList<Case>();
        this.otherOrganization = new ArrayList<Case>();
    }

    public List<Case> getReportCoutrs() {
        return reportCourts;
    }

    public void setReportCourts(List<Case> reportCourts) {
        this.reportCourts = reportCourts;
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
                "reportCoutrs=" + reportCourts +
                ", otherOrganization=" + otherOrganization +
                '}';
    }
}
