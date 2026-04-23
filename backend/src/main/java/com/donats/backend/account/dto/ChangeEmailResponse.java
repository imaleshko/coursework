package com.donats.backend.account.dto;

public record ChangeEmailResponse(UserDto user, String accessToken) {
}
