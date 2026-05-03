package com.donats.backend.update;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundraisingUpdateRepository extends JpaRepository<FundraisingUpdateEntity, Long> {
    List<FundraisingUpdateEntity> findAllByFundraisingIdOrderByCreatedAtDesc(Long fundraisingId);
}
