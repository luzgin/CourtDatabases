package com.diploma.CourtDatabases.entity;

import javax.persistence.*;

@Entity
@Table (name = "vialator")
public class Vialator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "type_vialator")
    private Integer typeVialator;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "secondname")
    private String secondName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "private_number")
    private String privateNumber;

    public Vialator (){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getTypeVialator() {
        return typeVialator;
    }

    public void setTypeVialator(Integer typeVialator) {
        this.typeVialator = typeVialator;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPrivateNumber() {
        return privateNumber;
    }

    public void setPrivateNumber(String privateNumber) {
        this.privateNumber = privateNumber;
    }

    @Override
    public String toString() {
        return "Vialator{" +
                "id=" + id +
                ", typeVialator=" + typeVialator +
                ", firstName='" + firstName + '\'' +
                ", secondName='" + secondName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", privateNumber='" + privateNumber + '\'' +
                '}';
    }
}
