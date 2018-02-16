package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "entity_isk_adm")
public class EntityIskAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @JsonIgnoreProperties(value = "entityIskAdm", allowSetters = true)
    @OneToMany(mappedBy = "entityIskAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ComplaintsAdm> complaintsAdms = new HashSet<>();


    public Set<ComplaintsAdm> getComplaintsAdm() {
        return complaintsAdms;
    }

    public void setComplaintsAdm(Set<ComplaintsAdm> complaintsAdms) {
        this.complaintsAdms = complaintsAdms;
    }

    public EntityIskAdm(){

    }

    public EntityIskAdm(String name) {
        this.name = name;
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
        return "EntityIskAdm{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
