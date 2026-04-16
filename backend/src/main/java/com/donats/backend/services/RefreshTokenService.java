package com.donats.backend.services;

import com.donats.backend.entities.RefreshTokenEntity;
import com.donats.backend.repositories.RefreshTokenRepository;
import com.donats.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshTokenEntity createRefreshToken(Long userId) {
        RefreshTokenEntity refreshToken = new RefreshTokenEntity();

        refreshToken.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found")));

        refreshToken.setToken(UUID.randomUUID().toString());
        long refreshTokenDuration = 30L * 24 * 60 * 60 * 1000;
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDuration));

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshTokenEntity> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public boolean isTokenExpired(RefreshTokenEntity refreshToken) {
        return refreshToken.getExpiryDate().isBefore(Instant.now());
    }

    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

}
