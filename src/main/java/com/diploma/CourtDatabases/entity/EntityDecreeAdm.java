package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Column(name = "prim")
    private String prim;


    @JsonIgnore
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

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    @Override
    public String toString() {
        return "EntityDecreeAdm{" +
                "id=" + id +
                ", nameEntityDecreeAdm=" + nameEntityDecreeAdm +
                ", sum=" + prim +
                '}';
    }
}
