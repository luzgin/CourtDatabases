package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private Integer type;

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<DecreeAdm> decreeAdms = new HashSet<>();

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<AuthorDocument> authorDocuments = new HashSet<>();

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SecondInstanceAdm> secondInstanceAdms = new HashSet<>();


    public Set<DecreeAdm> getDecreeAdms() {
        return decreeAdms;
    }

    public void setDecreeAdms(Set<DecreeAdm> decreeAdms) {
        this.decreeAdms = decreeAdms;
    }


    public Set<AuthorDocument> getAuthorDocuments() {
        return authorDocuments;
    }

    public void setAuthorDocuments(Set<AuthorDocument> authorDocuments) {
        this.authorDocuments = authorDocuments;
    }


    public Set<SecondInstanceAdm> getSecondInstanceAdms() {
        return secondInstanceAdms;
    }

    public void setSecondInstanceAdms(Set<SecondInstanceAdm> secondInstanceAdms) {
        this.secondInstanceAdms = secondInstanceAdms;
    }

    public Organization() {

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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                '}';
    }
}
