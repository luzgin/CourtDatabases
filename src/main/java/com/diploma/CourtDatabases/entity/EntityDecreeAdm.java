package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "entity_decree_adm")
public class EntityDecreeAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "name_entity_decree_id")
    private NameEntityDecreeAdm nameEntityDecreeAdm;

    @Column(name = "sum")
    private double sum;

    @OneToMany(mappedBy = "entityDecreeAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CardAdm> cardAdms = new HashSet<>();

    public EntityDecreeAdm() {

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

    public NameEntityDecreeAdm getNameEntityDecreeAdm() {
        return nameEntityDecreeAdm;
    }

    public void setNameEntityDecreeAdm(NameEntityDecreeAdm nameEntityDecreeAdm) {
        this.nameEntityDecreeAdm = nameEntityDecreeAdm;
    }

    public double getSum() {
        return sum;
    }

    public void setSum(double sum) {
        this.sum = sum;
    }

    @Override
    public String toString() {
        return "EntityDecreeAdm{" +
                "id=" + id +
                ", nameEntityDecreeAdm=" + nameEntityDecreeAdm +
                ", sum=" + sum +
                '}';
    }
}
