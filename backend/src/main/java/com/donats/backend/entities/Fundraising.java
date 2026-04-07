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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "imagesUrl", nullable = false)
    private List<String> imagesUrl;

    @Enumerated(EnumType.STRING)
    private FundraisingStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "fundraising", cascade = CascadeType.ALL)
    private List<Donation> donations;

    @OneToMany(mappedBy = "fundraising", cascade = CascadeType.ALL)
    private List<FundraisingUpdate> updates;

    public Fundraising() {
    }

    public Fundraising(Long id, String title, String slug, String description, BigDecimal balance, BigDecimal goal, LocalDateTime startedAt, LocalDateTime endedAt, LocalDateTime updatedAt, LocalDate endDate, List<String> imagesUrl, FundraisingStatus status, User user, List<Donation> donations, List<FundraisingUpdate> updates) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.balance = balance;
        this.goal = goal;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.updatedAt = updatedAt;
        this.endDate = endDate;
        this.imagesUrl = imagesUrl;
        this.status = status;
        this.user = user;
        this.donations = donations;
        this.updates = updates;
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

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public List<String> getImagesUrl() {
        return imagesUrl;
    }

    public void setImagesUrl(List<String> images) {
        this.imagesUrl = images;
    }

    public FundraisingStatus getStatus() {
        return status;
    }

    public void setStatus(FundraisingStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Donation> getDonations() {
        return donations;
    }

    public void setDonations(List<Donation> donations) {
        this.donations = donations;
    }

    public List<FundraisingUpdate> getUpdates() {
        return updates;
    }

    public void setUpdates(List<FundraisingUpdate> updates) {
        this.updates = updates;
    }
}
