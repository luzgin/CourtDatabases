package com.diploma.CourtDatabases.entity.report;

public class ResultCase extends Case {
    private Integer resultNumber;
    private boolean senondInstance;

    public ResultCase() {
        setType(1);
    }

    public boolean isSenondInstance() {
        return senondInstance;
    }

    public void setSenondInstance(boolean senondInstance) {
        this.senondInstance = senondInstance;
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
                ", senondInstance=" + senondInstance +
                '}';
    }
}
