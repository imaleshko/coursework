package com.donats.backend.account;

import com.donats.backend.account.dto.*;
import com.donats.backend.donation.DonationEntity;
import com.donats.backend.donation.DonationRepository;
import com.donats.backend.donation.DonationStatusEnum;
import com.donats.backend.donation.dto.UserDonationResponseDto;
import com.donats.backend.entities.UserEntity;
import com.donats.backend.security.AccessTokenService;
import com.donats.backend.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;
    private final AccessTokenService accessTokenService;
    private final DonationRepository donationRepository;

    public AccountController(AccountService accountService, AccessTokenService accessTokenService, DonationRepository donationRepository) {
        this.accountService = accountService;
        this.accessTokenService = accessTokenService;
        this.donationRepository = donationRepository;
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

        UserDto userDto = toUserDto(updatedUser);
        return ResponseEntity.ok(new ChangeEmailResponse(userDto, accessToken));
    }

    @PatchMapping("/username")
    public ResponseEntity<UserDto> changeUsername(
            @RequestBody ChangeUsernameRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        UserEntity updatedUser = accountService.changeUsername(userDetails.getUsername(), request.username());

        return ResponseEntity.ok(toUserDto(updatedUser));
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

        return ResponseEntity.ok(toUserDto(updatedUser));
    }

    private UserDto toUserDto(UserEntity user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getAvatarUrl());
    }

    @GetMapping("/donations")
    public ResponseEntity<List<UserDonationResponseDto>> getMyDonations(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<UserDonationResponseDto> donations = donationRepository
                .findAllByUserEmailAndStatusOrderByCreatedAtDesc(userDetails.getUsername(), DonationStatusEnum.SUCCESS)
                .stream()
                .map(this::toUserUserDonationResponseDto)
                .toList();

        return ResponseEntity.ok(donations);
    }

    private UserDonationResponseDto toUserUserDonationResponseDto(DonationEntity donation) {
        return new UserDonationResponseDto(donation.getId(),
                donation.getName(),
                donation.getAmount(),
                donation.getCreatedAt(),
                donation.getMessage(),
                donation.getFundraising().getTitle(),
                donation.getFundraising().getSlug(),
                donation.getFundraising().getUser().getUsername());
    }
}
