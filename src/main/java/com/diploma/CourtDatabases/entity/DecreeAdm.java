package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "decree_adm")
public class DecreeAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "author_document_id")
    private AuthorDocument authorDocument;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @Column(name = "decree_date")
    @Temporal(value = TemporalType.DATE)
    private Date decreeDate;

    @Column(name = "entered_into_force")
    private boolean enteredIntoForce;

    @ManyToOne
    @JoinColumn(name = "second_instance_id")
    private SecondInstanceAdm secondInstanceAdm;

    @OneToMany(mappedBy = "decree_adm", cascade = CascadeType.ALL)
    private Set<ComplaintsAdm> complaintsAdms = new HashSet<>();

    @OneToMany(mappedBy = "decree_adm", cascade = CascadeType.ALL)
    private Set<CardAdm> cardAdms = new HashSet<>();

    public DecreeAdm (){

    }

    public Set<ComplaintsAdm> getComplaintsAdms() {
        return complaintsAdms;
    }

    public void setComplaintsAdms(Set<ComplaintsAdm> complaintsAdms) {
        this.complaintsAdms = complaintsAdms;
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

    public AuthorDocument getAuthorDocument() {
        return authorDocument;
    }

    public void setAuthorDocument(AuthorDocument authorDocument) {
        this.authorDocument = authorDocument;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Date getDecreeDate() {
        return decreeDate;
    }

    public void setDecreeDate(Date decreeDate) {
        this.decreeDate = decreeDate;
    }

    public boolean isEnteredIntoForce() {
        return enteredIntoForce;
    }

    public void setEnteredIntoForce(boolean enteredIntoForce) {
        this.enteredIntoForce = enteredIntoForce;
    }

    public SecondInstanceAdm getSecondInstanceAdm() {
        return secondInstanceAdm;
    }

    public void setSecondInstanceAdm(SecondInstanceAdm secondInstanceAdm) {
        this.secondInstanceAdm = secondInstanceAdm;
    }

    @Override
    public String toString() {
        return "DecreeAdm{" +
                "id=" + id +
                ", authorDocument=" + authorDocument +
                ", organization=" + organization +
                ", decreeDate=" + decreeDate +
                ", enteredIntoForce=" + enteredIntoForce +
                ", secondInstanceAdm=" + secondInstanceAdm +
                '}';
    }
}
