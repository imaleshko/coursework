package com.donats.backend.account;

import com.donats.backend.account.dto.*;
import com.donats.backend.entities.UserEntity;
import com.donats.backend.security.AccessTokenService;
import com.donats.backend.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;
    private final AccessTokenService accessTokenService;

    public AccountController(AccountService accountService, AccessTokenService accessTokenService) {
        this.accountService = accountService;
        this.accessTokenService = accessTokenService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        UserDto profile = accountService.getUser(userDetails.getUsername());
        return ResponseEntity.ok(profile);
    }


    @PatchMapping("/email")
    public ResponseEntity<ChangeEmailResponse> changeEmail(
            @RequestBody ChangeEmailRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        UserEntity updatedUser = accountService.changeEmail(userDetails.getUsername(), request.email());

        String accessToken = accessTokenService.generateAccessToken(updatedUser.getEmail());

        UserDto userDto = toDto(updatedUser);
        return ResponseEntity.ok(new ChangeEmailResponse(userDto, accessToken));
    }

    @PatchMapping("/username")
    public ResponseEntity<UserDto> changeUsername(
            @RequestBody ChangeUsernameRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        UserEntity updatedUser = accountService.changeUsername(userDetails.getUsername(), request.username());

        return ResponseEntity.ok(toDto(updatedUser));
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        accountService.changePassword(userDetails.getUsername(), request.oldPassword(), request.newPassword());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/avatar")
    public ResponseEntity<UserDto> changeAvatar(
            @RequestBody ChangeAvatarRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        UserEntity updatedUser = accountService.changeAvatar(userDetails.getUsername(), request.avatarUrl());

        return ResponseEntity.ok(toDto(updatedUser));
    }

    private UserDto toDto(UserEntity user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getAvatarUrl());
    }
}
