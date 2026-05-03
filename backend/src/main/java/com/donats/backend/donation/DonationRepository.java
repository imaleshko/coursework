package com.donats.backend.donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long> {
    Optional<DonationEntity> findByOrderId(String orderId);
}
