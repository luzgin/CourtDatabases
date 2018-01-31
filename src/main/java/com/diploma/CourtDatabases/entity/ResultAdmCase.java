package com.diploma.CourtDatabases.entity;

import javax.persistence.*;

@Entity
@Table(name = "result_adm")
public class ResultAdmCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public ResultAdmCase(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ResultAdmCase{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
