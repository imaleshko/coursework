package com.donats.backend.fundraising.page.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record FundraisingDonationsResponseDto(
        Long id,
        String name,
        BigDecimal amount,
        LocalDateTime createdAt,
        String message) {
}
