package com.donats.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "createdAt")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "message")
    private String message;

    @Column(name = "amount")
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fundraising_id", nullable = false)
    private Fundraising fundraising;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Donation() {
    }

    public Donation(Long id, String name, LocalDateTime createdAt, String message, BigDecimal amount, Fundraising fundraising, User user) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.message = message;
        this.amount = amount;
        this.fundraising = fundraising;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Fundraising getFundraising() {
        return fundraising;
    }

    public void setFundraising(Fundraising fundraising) {
        this.fundraising = fundraising;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
