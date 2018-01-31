package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "date_return_case")
public class DateRequestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "organization")
    private String organization;

    @Column(name = "date")
    private Date date;

    public DateRequestCase(){

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
