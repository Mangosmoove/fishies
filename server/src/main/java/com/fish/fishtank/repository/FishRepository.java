package com.fish.fishtank.repository;

import com.fish.fishtank.model.Fish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FishRepository extends JpaRepository<Fish, Long> {
    List<Fish> findByUserId(Long userId);
    Optional<Fish> findByName(String name);
    List<Fish> findByIsActive(boolean isActive);
    List<Fish> findByUserIdOrderByLivesAsc(Long userId);
    List<Fish> findByUserIdOrderByLivesDesc(Long userId);
}