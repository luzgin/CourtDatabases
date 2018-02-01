package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "complaints_adm")
public class ComplaintsAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "date_complaint")
    @Temporal(value = TemporalType.DATE)
    private Date complainDate;

    @ManyToOne
    @JoinColumn(name = "entity_id")
    private EntityIskAdm entityIskAdm;

    @Column(name = "name_author_complaint")
    private String nameAuthorComplaint;

    @Column(name = "activ")
    private boolean activ;

    @ManyToOne
    @JoinColumn(name = "decree_adm_id")
    private DecreeAdm decreeAdm;

    @Column(name = "summ_pishlini")
    private double summPoshlini;

    @ManyToOne
    @JoinColumn(name = "card_adm_id")
    private CardAdm cardAdm;

    public ComplaintsAdm(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getComplainDate() {
        return complainDate;
    }

    public void setComplainDate(Date complainDate) {
        this.complainDate = complainDate;
    }

    public EntityIskAdm getEntityIskAdm() {
        return entityIskAdm;
    }

    public void setEntityIskAdm(EntityIskAdm entityIskAdm) {
        this.entityIskAdm = entityIskAdm;
    }

    public String getNameAuthorComplaint() {
        return nameAuthorComplaint;
    }

    public void setNameAuthorComplaint(String nameAuthorComplaint) {
        this.nameAuthorComplaint = nameAuthorComplaint;
    }

    public boolean isActiv() {
        return activ;
    }

    public void setActiv(boolean activ) {
        this.activ = activ;
    }

    public DecreeAdm getDecreeAdm() {
        return decreeAdm;
    }

    public void setDecreeAdm(DecreeAdm decreeAdm) {
        this.decreeAdm = decreeAdm;
    }

    public double getSummPoshlini() {
        return summPoshlini;
    }

    public void setSummPoshlini(double summPoshlini) {
        this.summPoshlini = summPoshlini;
    }

    public CardAdm getCardAdm() {
        return cardAdm;
    }

    public void setCardAdm(CardAdm cardAdm) {
        this.cardAdm = cardAdm;
    }

    @Override
    public String toString() {
        return "ComplaintsAdm{" +
                "id=" + id +
                ", complainDate=" + complainDate +
                ", entityIskAdm=" + entityIskAdm +
                ", nameAuthorComplaint='" + nameAuthorComplaint + '\'' +
                ", activ=" + activ +
                ", decreeAdm=" + decreeAdm +
                ", summPoshlini=" + summPoshlini +
                ", cardAdm=" + cardAdm +
                '}';
    }
}
