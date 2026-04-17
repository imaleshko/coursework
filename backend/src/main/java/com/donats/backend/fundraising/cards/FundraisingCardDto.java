package com.donats.backend.fundraising.cards;

import java.math.BigDecimal;

public record FundraisingCardDto(
        Long id,
        String title,
        String author,
        BigDecimal balance,
        BigDecimal goal,
        String slug
) {
}
