package com.donats.backend.fundraising.page;

import com.donats.backend.fundraising.page.dto.FundraisingResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fundraising")
public class FundraisingPageController {

    private final FundraisingPageService fundraisingPageService;

    public FundraisingPageController(FundraisingPageService fundraisingPageService) {
        this.fundraisingPageService = fundraisingPageService;
    }

    @GetMapping("/{username}/{slug}")
    public ResponseEntity<FundraisingResponseDto> getFundraisingByUsernameAndSlug(@PathVariable String username, @PathVariable String slug) {
        return ResponseEntity.ok(fundraisingPageService.getFundraisingByUsernameAndSlug(username, slug));
    }
}
