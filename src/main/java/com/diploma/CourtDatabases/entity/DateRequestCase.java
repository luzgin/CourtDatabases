package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "date_request_case")
public class DateRequestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "organization")
    private String organization;

    @Column(name = "date")
    @Temporal(value = TemporalType.DATE)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "card_id", nullable = false)
    private CardAdm cardAdm;

    public DateRequestCase() {

    }

    public CardAdm getCardAdm() {
        return cardAdm;
    }

    public void setCardAdm(CardAdm cardAdm) {
        this.cardAdm = cardAdm;
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
        return "DateRequestCase{" +
                "id=" + id +
                ", organization='" + organization + '\'' +
                ", date=" + date +
                '}';
    }
}
