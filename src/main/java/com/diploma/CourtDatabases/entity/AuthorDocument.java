package com.diploma.CourtDatabases.entity;

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

    @Column(name = "activ_work")
    private boolean activWork;

    @ManyToOne(optional = false)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @JsonIgnoreProperties(value = "judge", allowSetters = true)
    @OneToMany(mappedBy = "judge", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<CardAdm> cardAdms = new HashSet<>();

    public AuthorDocument() {

    }

    public Set<CardAdm> getCardAdms() {
        return cardAdms;
    }

    public void setCardAdms(Set<CardAdm> cardAdms) {
        this.cardAdms = cardAdms;
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
                ", activWork=" + activWork +
                ", organization=" + organization +
                '}';
    }
}
