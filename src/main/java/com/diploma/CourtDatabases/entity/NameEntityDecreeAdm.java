package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Collection;
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


    @JsonIgnore
    @OneToMany(mappedBy = "nameEntityDecreeAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<EntityDecreeAdm> entityDecreeAdms = new HashSet<>();

    public NameEntityDecreeAdm() {

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
