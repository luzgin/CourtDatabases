package com.diploma.CourtDatabases.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "name_entity_decree_adm")
public class NameEntityDecreeAdm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "name_entity_decree_adm", cascade = CascadeType.ALL)
    private Set<EntityDecreeAdm> entityDecreeAdms = new HashSet<>();

    public NameEntityDecreeAdm(){

    }

    public Set<EntityDecreeAdm> getEntityDecreeAdms() {
        return entityDecreeAdms;
    }

    public void setEntityDecreeAdms(Set<EntityDecreeAdm> entityDecreeAdms) {
        this.entityDecreeAdms = entityDecreeAdms;
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

    @Override
    public String toString() {
        return "NameEntityDecreeAdm{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
