package com.donats.backend.auth;

import com.donats.backend.auth.dto.LoginRequest;
import com.donats.backend.auth.dto.RegisterRequest;
import com.donats.backend.auth.dto.TokensDto;
import com.donats.backend.auth.dto.UserProfileDto;
import com.donats.backend.entities.RefreshTokenEntity;
import com.donats.backend.entities.UserEntity;
import com.donats.backend.repositories.UserRepository;
import com.donats.backend.services.AccessTokenService;
import com.donats.backend.services.RefreshTokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccessTokenService accessTokenService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AccessTokenService accessTokenService, RefreshTokenService refreshTokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.accessTokenService = accessTokenService;
        this.refreshTokenService = refreshTokenService;
        this.authenticationManager = authenticationManager;
    }

    public TokensDto register(RegisterRequest request) {
        if (userRepository.existsByEmailOrUsername(request.email(), request.username())
        ) {
            throw new RuntimeException("User already exists");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        UserEntity savedUser = userRepository.save(user);

        String accessToken = accessTokenService.generateAccessToken(savedUser.getEmail());
        RefreshTokenEntity refreshToken = refreshTokenService.createRefreshToken(savedUser.getId());

        return new TokensDto(accessToken, refreshToken.getToken());
    }

    public TokensDto login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = accessTokenService.generateAccessToken(user.getEmail());
        RefreshTokenEntity refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return new TokensDto(accessToken, refreshToken.getToken());
    }

    public TokensDto refreshToken(String refreshToken) {
        return refreshTokenService.findByToken(refreshToken)
                .map(RefreshTokenEntity -> {
                    if (refreshTokenService.isTokenExpired(RefreshTokenEntity)) {
                        refreshTokenService.deleteByToken(refreshToken);
                        throw new RuntimeException("Token expired");
                    }
                    return RefreshTokenEntity;
                })
                .map(RefreshTokenEntity::getUser)
                .map(user -> {
                    refreshTokenService.deleteByToken(refreshToken);
                    RefreshTokenEntity newRefreshToken = refreshTokenService.createRefreshToken(user.getId());
                    String newAccessToken = accessTokenService.generateAccessToken(user.getEmail());
                    return new TokensDto(newAccessToken, newRefreshToken.getToken());
                })
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }

    public void logout(String refreshToken) {
        refreshTokenService.deleteByToken(refreshToken);
    }

    public UserProfileDto getUserProfile(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail());
    }
}
