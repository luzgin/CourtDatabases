package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "article_adm")
public class ArticleAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "article")
    private String article;

    @Column(name = "part")
    private Integer part;

    @Column(name = "note")
    private String note;

    @JsonIgnore
    @OneToMany(mappedBy = "articleAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CardAdm> cardAdms = new HashSet<CardAdm>();

    public Set<CardAdm> getCardAdms() {
        return cardAdms;
    }

    public void setCardAdms(Set<CardAdm> cardAdms) {
        this.cardAdms = cardAdms;
    }

    public ArticleAdm() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getArticle() {
        return article;
    }

    public void setArticle(String article) {
        this.article = article;
    }

    public Integer getPart() {
        return part;
    }

    public void setPart(Integer part) {
        this.part = part;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "ArticleAdm{" +
                "id=" + id +
                ", article=" + article +
                ", part=" + part +
                ", note='" + note + '\'' +
                '}';
    }
}
