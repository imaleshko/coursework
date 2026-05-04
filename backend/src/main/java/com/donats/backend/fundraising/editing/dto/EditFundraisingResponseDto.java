package com.donats.backend.fundraising.editing.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record EditFundraisingResponseDto(
        Long id,
        String title,
        String slug,
        String description,
        BigDecimal goal,
        LocalDate endDate,
        List<String> existingImagesUrls
) {
}
