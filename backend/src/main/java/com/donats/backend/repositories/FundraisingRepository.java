package com.donats.backend.repositories;

import com.donats.backend.entities.FundraisingEntity;
import com.donats.backend.entities.FundraisingStatus;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FundraisingRepository extends JpaRepository<FundraisingEntity, Long> {
    Optional<FundraisingEntity> findByUserUserNameAndSlug(String userName, String slug);

    @EntityGraph(attributePaths = {"user"})
    List<FundraisingEntity> findTop5ByStatusOrderByStartedAtDesc(FundraisingStatus status);
}
