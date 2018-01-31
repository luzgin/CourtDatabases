package com.diploma.CourtDatabases.entity;

import javax.persistence.*;

@Entity
@Table(name = "article_adm")
public class ArticleAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "article")
    private Integer article;

    @Column(name = "part")
    private Integer part;

    @Column(name = "note")
    private String note;

    public ArticleAdm() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getArticle() {
        return article;
    }

    public void setArticle(Integer article) {
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
