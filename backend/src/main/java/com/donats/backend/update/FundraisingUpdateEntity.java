package com.donats.backend.update;

import com.donats.backend.fundraising.FundraisingEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "fundraising_updates")
public class FundraisingUpdateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "createdAt")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fundraising_id", nullable = false)
    private FundraisingEntity fundraising;

    @Column(name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "title", nullable = false)
    private String title;

    public FundraisingUpdateEntity() {
    }

    public FundraisingUpdateEntity(Long id, LocalDateTime createdAt, FundraisingEntity fundraising, String title, String message) {
        this.id = id;
        this.createdAt = createdAt;
        this.fundraising = fundraising;
        this.title = title;
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

    public FundraisingEntity getFundraising() {
        return fundraising;
    }

    public void setFundraising(FundraisingEntity fundraisingEntity) {
        this.fundraising = fundraisingEntity;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
