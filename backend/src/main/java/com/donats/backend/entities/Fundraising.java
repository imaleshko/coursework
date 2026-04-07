package com.donats.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "fundraising")
public class Fundraising {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "slug", nullable = false)
    private String slug;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Column(name = "goal", nullable = false)
    private BigDecimal goal;

    @Column(name = "startedAt")
    @CreationTimestamp
    private LocalDateTime startedAt;

    @Column(name = "endedAt")
    private LocalDateTime endedAt;

    @Column(name = "updatedAt")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "endDate", nullable = false)
    private LocalDate endDate;

    @ElementCollection
    @CollectionTable(name = "fundraising_images", joinColumns = @JoinColumn(name = "fundraising_id"))
    @Column(name = "images", nullable = false)
    private List<String> images;

//    private Status status;
//    private List<Donation> donations;
//    private List<Update> updates;


    public Fundraising(Long id, String title, String slug, String description, BigDecimal balance, BigDecimal goal, LocalDateTime startedAt, LocalDateTime endedAt, LocalDateTime updatedAt, LocalDate endData, List<String> images) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.balance = balance;
        this.goal = goal;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.updatedAt = updatedAt;
        this.endData = endData;
        this.images = images;
    }

    public Fundraising() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getGoal() {
        return goal;
    }

    public void setGoal(BigDecimal goal) {
        this.goal = goal;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDate getEndData() {
        return endData;
    }

    public void setEndData(LocalDate endData) {
        this.endData = endData;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }
}
