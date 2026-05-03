package com.donats.backend.update;

import java.time.LocalDateTime;

public record FundraisingUpdateResponseDto(
        Long id,
        String title,
        String message,
        LocalDateTime createdAt
) {
}
