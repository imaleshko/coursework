package com.donats.backend.fundraising.editing;

import com.donats.backend.fundraising.editing.dto.EditFundraisingResponseDto;
import com.donats.backend.fundraising.editing.dto.UpdateFundraisingRequestDto;
import com.donats.backend.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fundraising/edit")
public class FundraisingEditingController {

    private final FundraisingEditingService editingService;

    public FundraisingEditingController(FundraisingEditingService editingService) {
        this.editingService = editingService;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<EditFundraisingResponseDto> getFundraisingForEdit(
            @PathVariable String slug,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        EditFundraisingResponseDto response = editingService.getFundraisingForEdit(userDetails.getUsername(), slug);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{currentSlug}")
    public ResponseEntity<Void> updateFundraising(
            @PathVariable String currentSlug,
            @Valid @RequestBody UpdateFundraisingRequestDto request,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        editingService.updateFundraising(userDetails.getUsername(), currentSlug, request);
        return ResponseEntity.ok().build();
    }
}
