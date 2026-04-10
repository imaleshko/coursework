package com.donats.backend.dto;

import java.math.BigDecimal;

public record FundraisingCardDto (
        Long id,
        String title,
        String authorName,
        BigDecimal balance,
        BigDecimal goal,
        String slug
        ) {
}
