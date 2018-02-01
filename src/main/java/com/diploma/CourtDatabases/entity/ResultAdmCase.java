package com.diploma.CourtDatabases.entity;

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

    private Set<CardAdm> cardAdms = new HashSet<>();

    @OneToMany(mappedBy = "result_adm", cascade = CascadeType.ALL)
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
