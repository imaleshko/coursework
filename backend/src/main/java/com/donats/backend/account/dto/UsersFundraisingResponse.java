package com.donats.backend.account.dto;

import com.donats.backend.fundraising.FundraisingStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record UsersFundraisingResponse(
        Long id,
        String title,
        String slug,
        String username,
        LocalDateTime startedAt,
        FundraisingStatus status,
        BigDecimal balance,
        Long totalDonationsCount
) {
}
