package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "card_adm")
public class CardAdm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @Column(name = "card_create_date", nullable = false)
    @Temporal(value = TemporalType.DATE)
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "decree_adm_id", nullable = false)
    private DecreeAdm decreeAdm;

    @ManyToOne
    @JoinColumn(name = "vialator_id", nullable = false)
    private Vialator vialator;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private ArticleAdm articleAdm;

    @ManyToOne
    @JoinColumn(name = "entity_decree_id", nullable = false)
    private EntityDecreeAdm entityDecreeAdm;

    @Column(name = "note_article")
    private String noteArticle;

    @ManyToOne
    @JoinColumn(name = "judge_id")
    private AuthorDocument judge;

    @Column(name = "card_activ", nullable = false)
    private boolean cardActiv;

    @Column(name = "result_date")
    @Temporal(value = TemporalType.DATE)
    private Date resultDate;

    @ManyToOne
    @JoinColumn(name = "result_id")
    private ResultAdmCase resultAdmCase;

    @Column(name = "note")
    private String note;

    @JsonIgnore
    @OneToMany(mappedBy = "cardAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<DateRequestCase> dateRequestCases = new HashSet<DateRequestCase>();

    @JsonIgnore
    @OneToMany(mappedBy = "cardAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private  Set<DateReturnCase> dateReturnCases = new HashSet<DateReturnCase>();


    @JsonIgnore
    @OneToMany(mappedBy = "cardAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ComplaintsAdm> complaintsAdms = new HashSet<ComplaintsAdm>();


    public CardAdm (){

    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Set<ComplaintsAdm> getComplaintsAdms() {
        return complaintsAdms;
    }

    public void setComplaintsAdms(Set<ComplaintsAdm> complaintsAdms) {
        this.complaintsAdms = complaintsAdms;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public DecreeAdm getDecreeAdm() {
        return decreeAdm;
    }

    public void setDecreeAdm(DecreeAdm decreeAdm) {
        this.decreeAdm = decreeAdm;
    }

    public Vialator getVialator() {
        return vialator;
    }

    public void setVialator(Vialator vialator) {
        this.vialator = vialator;
    }

    public ArticleAdm getArticleAdm() {
        return articleAdm;
    }

    public void setArticleAdm(ArticleAdm articleAdm) {
        this.articleAdm = articleAdm;
    }

    public EntityDecreeAdm getEntityDecreeAdm() {
        return entityDecreeAdm;
    }

    public void setEntityDecreeAdm(EntityDecreeAdm entityDecreeAdm) {
        this.entityDecreeAdm = entityDecreeAdm;
    }

    public String getNoteArticle() {
        return noteArticle;
    }

    public void setNoteArticle(String noteArticle) {
        this.noteArticle = noteArticle;
    }

    public AuthorDocument getJudge() {
        return judge;
    }

    public void setJudge(AuthorDocument judge) {
        this.judge = judge;
    }

    public boolean isCardActiv() {
        return cardActiv;
    }

    public void setCardActiv(boolean cardActiv) {
        this.cardActiv = cardActiv;
    }

    public Date getResultDate() {
        return resultDate;
    }

    public void setResultDate(Date resultDate) {
        this.resultDate = resultDate;
    }

    public ResultAdmCase getResultAdmCase() {
        return resultAdmCase;
    }

    public void setResultAdmCase(ResultAdmCase resultAdmCase) {
        this.resultAdmCase = resultAdmCase;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "CardAdm{" +
                "id=" + id +
                ", cardNumber=" + cardNumber +
                ", createDate=" + createDate +
                ", decreeAdm=" + decreeAdm +
                ", vialator=" + vialator +
                ", articleAdm=" + articleAdm +
                ", entityDecreeAdm=" + entityDecreeAdm +
                ", noteArticle='" + noteArticle + '\'' +
                ", judge=" + judge +
                ", cardActiv=" + cardActiv +
                ", resultDate=" + resultDate +
                ", resultAdmCase=" + resultAdmCase +
                ", note='" + note + '\'' +
                '}';
    }
}
