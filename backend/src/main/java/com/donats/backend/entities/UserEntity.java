package com.donats.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<FundraisingEntity> fundraisings;

    @OneToMany(mappedBy = "user") // ми не можемо видалити зроблений донат
    private List<DonationEntity> donations;

    @CreationTimestamp
    @Column(name = "createdAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public UserEntity() {
    }

    public UserEntity(Long id, String username, String password, String email, List<FundraisingEntity> fundraisings, List<DonationEntity> donations, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fundraisings = fundraisings;
        this.donations = donations;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<FundraisingEntity> getFundraisings() {
        return fundraisings;
    }

    public void setFundraisings(List<FundraisingEntity> fundraisingEntity) {
        this.fundraisings = fundraisingEntity;
    }

    public List<DonationEntity> getDonations() {
        return donations;
    }

    public void setDonations(List<DonationEntity> donations) {
        this.donations = donations;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
