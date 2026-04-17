package com.donats.backend.fundraising.cards;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fundraising")
public class FundraisingCardsController {

    private final FundraisingCardsService fundraisingService;

    public FundraisingCardsController(FundraisingCardsService fundraisingService) {
        this.fundraisingService = fundraisingService;
    }

    @GetMapping("/newest")
    public ResponseEntity<List<FundraisingCardDto>> get5Newest() {
        List<FundraisingCardDto> newestCards = fundraisingService.get5Newest();
        return ResponseEntity.ok(newestCards);
    }
}
