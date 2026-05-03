package com.donats.backend.fundraising.cards;

import com.donats.backend.fundraising.FundraisingRepository;
import com.donats.backend.fundraising.FundraisingStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FundraisingCardsService {

    private final FundraisingRepository fundraisingRepository;

    public FundraisingCardsService(FundraisingRepository fundraisingRepository) {
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
