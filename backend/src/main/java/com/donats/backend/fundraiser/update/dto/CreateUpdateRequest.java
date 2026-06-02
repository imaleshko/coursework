package com.donats.backend.fundraiser.update.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateUpdateRequest(
        @NotBlank(message = "Назва обов'язкова")
        String title,

        @NotBlank(message = "Текст оновлення обов'язковий")
        String message
) {
}
