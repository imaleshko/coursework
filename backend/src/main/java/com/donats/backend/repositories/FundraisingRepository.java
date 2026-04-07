package com.donats.backend.repositories;

import com.donats.backend.entities.FundraisingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FundraisingRepository extends JpaRepository<FundraisingEntity, Long> {
    Optional<FundraisingEntity> findByUserUserNameAndSlug(String userName, String slug);
}
