package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "date_return_case")
public class DateReturnCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "organization")
    private String organization;

    @Column(name = "date")
    @Temporal(value = TemporalType.DATE)
    private Date date;

    private Set<CardAdm> cardAdms = new HashSet<>();

    @OneToMany(mappedBy = "date_return_case", cascade = CascadeType.ALL)
    public Set<CardAdm> getCardAdms() {
        return cardAdms;
    }

    public void setCardAdms(Set<CardAdm> cardAdms) {
        this.cardAdms = cardAdms;
    }

    public DateReturnCase(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "DateReturnCase{" +
                "id=" + id +
                ", organization='" + organization + '\'' +
                ", date=" + date +
                '}';
    }
}
