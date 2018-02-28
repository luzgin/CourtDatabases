package com.diploma.CourtDatabases.entity;

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

    @Column(name = "card_number")
    private Integer cardNumber;

    @ManyToOne(optional = false)
    @JoinColumn(name = "decree_adm_id")
    private DecreeAdm decreeAdm;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vialator_id")
    private Vialator vialator;

    @ManyToOne(optional = false)
    @JoinColumn(name = "article_id")
    private ArticleAdm articleAdm;

    @ManyToOne(optional = false)
    @JoinColumn(name = "entity_decree_id")
    private EntityDecreeAdm entityDecreeAdm;

    @Column(name = "note_article")
    private String noteArticle;

    @ManyToOne(optional = false)
    @JoinColumn(name = "judge_id")
    private AuthorDocument judge;

    @Column(name = "card_activ")
    private boolean cardActiv;

    @Column(name = "result_date")
    @Temporal(value = TemporalType.DATE)
    private Date resultDate;

    @ManyToOne(optional = false)
    @JoinColumn(name = "result_id")
    private ResultAdmCase resultAdmCase;

    @ManyToOne(optional = false)
    @JoinColumn(name = "date_request_delo_id")
    private DateRequestCase dateRequestCase;

    @ManyToOne(optional = false)
    @JoinColumn(name = "date_return_delo_id")
    private DateReturnCase dateReturnCase;

    @Column(name = "note")
    private String note;
/*
    @JsonIgnoreProperties(value = "cardAdm", allowSetters = true)
    @OneToMany(mappedBy = "cardAdm", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ComplaintsAdm> complaintsAdms = new HashSet<>();

*/
    public CardAdm (){

    }
/*
    public Set<ComplaintsAdm> getComplaintsAdms() {
        return complaintsAdms;
    }

    public void setComplaintsAdms(Set<ComplaintsAdm> complaintsAdms) {
        this.complaintsAdms = complaintsAdms;
    }
*/
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Integer cardNumber) {
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

    public DateRequestCase getDateRequestCase() {
        return dateRequestCase;
    }

    public void setDateRequestCase(DateRequestCase dateRequestCase) {
        this.dateRequestCase = dateRequestCase;
    }

    public DateReturnCase getDateReturnCase() {
        return dateReturnCase;
    }

    public void setDateReturnCase(DateReturnCase dateReturnCase) {
        this.dateReturnCase = dateReturnCase;
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
                ", decreeAdm=" + decreeAdm +
                ", vialator=" + vialator +
                ", articleAdm=" + articleAdm +
                ", entityDecreeAdm=" + entityDecreeAdm +
                ", noteArticle='" + noteArticle + '\'' +
                ", judge=" + judge +
                ", cardActiv=" + cardActiv +
                ", resultDate=" + resultDate +
                ", resultAdmCase=" + resultAdmCase +
                ", dateRequestCase=" + dateRequestCase +
                ", dateReturnCase=" + dateReturnCase +
                ", note='" + note + '\'' +
                '}';
    }
}
