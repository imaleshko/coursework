package com.donats.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "fundraising_updates")
public class FundraisingUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "createdAt")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fundraising_id", nullable = false)
    private Fundraising fundraising;

    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    public FundraisingUpdate() {
    }

    public FundraisingUpdate(Long id, LocalDateTime createdAt, Fundraising fundraising, String message) {
        this.id = id;
        this.createdAt = createdAt;
        this.fundraising = fundraising;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Fundraising getFundraising() {
        return fundraising;
    }

    public void setFundraising(Fundraising fundraising) {
        this.fundraising = fundraising;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
