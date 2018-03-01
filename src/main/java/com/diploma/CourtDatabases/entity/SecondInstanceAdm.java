package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "second_instance_adm")
public class SecondInstanceAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_document_id")
    private AuthorDocument authorDocument;

    @Column(name = "decree_date")
    @Temporal(value = TemporalType.DATE)
    private Date decreeDate;

    @JsonIgnore
    @OneToMany(mappedBy = "secondInstanceAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<DecreeAdm> decreeAdms = new HashSet<>();


    public SecondInstanceAdm() {

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

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public AuthorDocument getAuthorDocument() {
        return authorDocument;
    }

    public void setAuthorDocument(AuthorDocument authorDocument) {
        this.authorDocument = authorDocument;
    }

    public Date getDecreeDate() {
        return decreeDate;
    }

    public void setDecreeDate(Date decreeDate) {
        this.decreeDate = decreeDate;
    }

    @Override
    public String toString() {
        return "SecondInstanceAdm{" +
                "id=" + id +
                ", organization=" + organization +
                ", authorDocument=" + authorDocument +
                ", decreeDate=" + decreeDate +
                '}';
    }
}
