package com.diploma.CourtDatabases.entity.report;

public class ResultCase extends Case {
    private Integer resultNumber;

    public ResultCase() {
    }

    public Integer getResultNumber() {
        return resultNumber;
    }

    public void setResultNumber(Integer resultNumber) {
        this.resultNumber = resultNumber;
    }


    @Override
    public String toString() {
        return "ResultCase{" +
                "resultNumber=" + resultNumber +
                '}';
    }
}
