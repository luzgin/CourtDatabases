package com.diploma.CourtDatabases.entity.report;

public class Case {
    private Integer type;

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Case{" +
                "type=" + type +
                '}';
    }
}
