package com.donats.backend.repositories;

import com.donats.backend.entities.DonationEntity;
import com.donats.backend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<DonationEntity, Long> {
}
