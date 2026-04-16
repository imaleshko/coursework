package com.donats.backend.services;

import com.donats.backend.dto.FundraisingCardDto;
import com.donats.backend.entities.FundraisingStatus;
import com.donats.backend.repositories.FundraisingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundraisingService {

    private final FundraisingRepository fundraisingRepository;

    public FundraisingService(FundraisingRepository fundraisingRepository) {
        this.fundraisingRepository = fundraisingRepository;
    }

    public List<FundraisingCardDto> get5Newest() {
        return fundraisingRepository.findTop5ByStatusOrderByStartedAtDesc(FundraisingStatus.ACTIVE)
                .stream()
                .map(entity -> new FundraisingCardDto(
                        entity.getId(),
                        entity.getTitle(),
                        entity.getUser().getUsername(),
                        entity.getBalance(),
                        entity.getGoal(),
                        entity.getSlug()
                )).toList();
    }
}
