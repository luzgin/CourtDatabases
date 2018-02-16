package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "result_adm")
public class ResultAdmCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;
    @JsonIgnoreProperties(value = "resultAdmCase", allowSetters = true)
    @OneToMany(mappedBy = "resultAdmCase", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CardAdm> cardAdms = new HashSet<>();


    public Set<CardAdm> getCardAdms() {
        return cardAdms;
    }

    public void setCardAdms(Set<CardAdm> cardAdms) {
        this.cardAdms = cardAdms;
    }

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
