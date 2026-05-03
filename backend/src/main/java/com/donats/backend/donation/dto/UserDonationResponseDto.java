package com.donats.backend.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record UserDonationResponseDto(
        Long id,
        String name,
        BigDecimal amount,
        LocalDateTime createdAt,
        String message,
        String fundraisingTitle,
        String fundraisingSlug,
        String authorUsername
) {
}
