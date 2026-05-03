package com.donats.backend.fundraising.page;

import com.donats.backend.donation.DonationEntity;
import com.donats.backend.donation.DonationRepository;
import com.donats.backend.donation.DonationStatusEnum;
import com.donats.backend.fundraising.page.dto.FundraisingDonationsResponseDto;
import com.donats.backend.fundraising.page.dto.FundraisingResponseDto;
import com.donats.backend.update.FundraisingUpdateEntity;
import com.donats.backend.update.FundraisingUpdateRepository;
import com.donats.backend.update.FundraisingUpdateResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fundraising")
public class FundraisingPageController {

    private final FundraisingPageService fundraisingPageService;
    private final FundraisingUpdateRepository fundraisingUpdateRepository;
    private final DonationRepository donationRepository;

    public FundraisingPageController(
            FundraisingPageService fundraisingPageService,
            FundraisingUpdateRepository fundraisingUpdateRepository,
            DonationRepository donationRepository) {
        this.fundraisingPageService = fundraisingPageService;
        this.fundraisingUpdateRepository = fundraisingUpdateRepository;
        this.donationRepository = donationRepository;
    }

    @GetMapping("/{username}/{slug}")
    public ResponseEntity<FundraisingResponseDto> getFundraisingByUsernameAndSlug(@PathVariable String username, @PathVariable String slug) {
        return ResponseEntity.ok(fundraisingPageService.getFundraisingByUsernameAndSlug(username, slug));
    }

    @GetMapping("/{id}/updates")
    public ResponseEntity<List<FundraisingUpdateResponseDto>> getUpdates(@PathVariable Long id) {
        List<FundraisingUpdateResponseDto> updates = fundraisingUpdateRepository
                .findAllByFundraisingIdOrderByCreatedAtDesc(id)
                .stream()
                .map(this::toDtoUpdate)
                .toList();

        return ResponseEntity.ok(updates);
    }

    private FundraisingUpdateResponseDto toDtoUpdate(FundraisingUpdateEntity update) {
        return new FundraisingUpdateResponseDto(
                update.getId(),
                update.getTitle(),
                update.getMessage(),
                update.getCreatedAt()
        );
    }

    @GetMapping("/{id}/donations")
    public ResponseEntity<List<FundraisingDonationsResponseDto>> getDonations(@PathVariable Long id) {
        List<FundraisingDonationsResponseDto> donations = donationRepository
                .findAllByFundraisingIdAndStatusOrderByCreatedAtDesc(id, DonationStatusEnum.SUCCESS)
                .stream()
                .map(this::toDtoDonations)
                .toList();

        return ResponseEntity.ok(donations);
    }

    private FundraisingDonationsResponseDto toDtoDonations(DonationEntity donation) {
        return new FundraisingDonationsResponseDto(
                donation.getId(),
                donation.getName(),
                donation.getAmount(),
                donation.getCreatedAt(),
                donation.getMessage()
        );
    }
}
