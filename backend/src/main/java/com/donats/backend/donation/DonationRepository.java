package com.donats.backend.donation;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long> {
    Optional<DonationEntity> findByOrderId(String orderId);

    List<DonationEntity> findAllByFundraisingIdAndStatusOrderByCreatedAtDesc(Long fundraisingId, DonationStatusEnum status);

    @EntityGraph(attributePaths = {"fundraising", "fundraising.user"})
    List<DonationEntity> findAllByUserEmailAndStatusOrderByCreatedAtDesc(String email, DonationStatusEnum status);
}
