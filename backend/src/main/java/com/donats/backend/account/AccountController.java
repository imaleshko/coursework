package com.donats.backend.account;

import com.donats.backend.account.dto.*;
import com.donats.backend.entities.UserEntity;
import com.donats.backend.security.AccessTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
    public ResponseEntity<UserDto> getUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserDto profile = accountService.getUser(userDetails.getUsername());
        return ResponseEntity.ok(profile);
    }


    @PatchMapping("/email")
    public ResponseEntity<ChangeEmailResponse> changeEmail(
            @RequestBody ChangeEmailRequest request,
            Authentication authentication
    ) {
        String currentEmail = authentication.getName();
        UserEntity updatedUser = accountService.changeEmail(currentEmail, request.email());

        String accessToken = accessTokenService.generateAccessToken(updatedUser.getEmail());

        UserDto userDto = toDto(updatedUser);
        return ResponseEntity.ok(new ChangeEmailResponse(userDto, accessToken));
    }

    @PatchMapping("/username")
    public ResponseEntity<UserDto> changeUsername(
            @RequestBody ChangeUsernameRequest request,
            Authentication authentication
    ) {
        String currentEmail = authentication.getName();
        UserEntity updatedUser = accountService.changeUsername(currentEmail, request.username());

        return ResponseEntity.ok(toDto(updatedUser));
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {
        String currentEmail = authentication.getName();
        accountService.changePassword(currentEmail, request.oldPassword(), request.newPassword());

        return ResponseEntity.ok().build();
    }

    private UserDto toDto(UserEntity user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail());
    }
}
