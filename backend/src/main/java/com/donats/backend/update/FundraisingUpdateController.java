package com.donats.backend.update;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/updates")
public class FundraisingUpdateController {

    private final FundraisingUpdateRepository fundraisingUpdateRepository;

    public FundraisingUpdateController(FundraisingUpdateRepository fundraisingUpdateRepository) {
        this.fundraisingUpdateRepository = fundraisingUpdateRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<FundraisingUpdateResponseDto>> getUpdates(@PathVariable Long id) {
        List<FundraisingUpdateResponseDto> updates = fundraisingUpdateRepository
                .findAllByFundraisingIdOrderByCreatedAtDesc(id)
                .stream()
                .map(this::toDto)
                .toList();

        return ResponseEntity.ok(updates);
    }

    private FundraisingUpdateResponseDto toDto(FundraisingUpdateEntity update) {
        return new FundraisingUpdateResponseDto(
                update.getId(),
                update.getTitle(),
                update.getMessage(),
                update.getCreatedAt()
        );
    }
}
