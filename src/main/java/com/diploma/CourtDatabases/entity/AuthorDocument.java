package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "author_document")
public class AuthorDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private String position;

    @Column(name = "activ_work")
    private boolean activWork;

    @ManyToOne
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @JsonIgnore
    @OneToMany(mappedBy = "judge", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<CardAdm> cardAdms = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "authorDocument", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<SecondInstanceAdm> secondInstanceAdms = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "authorDocument", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<DecreeAdm> decreeAdms = new HashSet<>();

    public AuthorDocument() {

    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Set<CardAdm> getCardAdms() {
        return cardAdms;
    }

    public void setCardAdms(Set<CardAdm> cardAdms) {
        this.cardAdms = cardAdms;
    }

    public Set<SecondInstanceAdm> getSecondInstanceAdms() {
        return secondInstanceAdms;
    }

    public void setSecondInstanceAdms(Set<SecondInstanceAdm> secondInstanceAdms) {
        this.secondInstanceAdms = secondInstanceAdms;
    }

    public Set<DecreeAdm> getDecreeAdms() {
        return decreeAdms;
    }

    public void setDecreeAdms(Set<DecreeAdm> decreeAdms) {
        this.decreeAdms = decreeAdms;
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

    public boolean isActivWork() {
        return activWork;
    }

    public void setActivWork(boolean activWork) {
        this.activWork = activWork;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    @Override
    public String toString() {
        return "AuthorDocument{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", position='" + position + '\'' +
                ", activWork=" + activWork +
                ", organization=" + organization +
                '}';
    }
}
