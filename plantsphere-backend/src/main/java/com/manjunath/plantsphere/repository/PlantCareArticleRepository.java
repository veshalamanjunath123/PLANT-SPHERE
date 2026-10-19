package com.manjunath.plantsphere.repository;

import com.manjunath.plantsphere.entity.PlantCareArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantCareArticleRepository extends JpaRepository<PlantCareArticle, Long> {
    List<PlantCareArticle> findByPublishedTrueOrderByCreatedAtDesc();
    Optional<PlantCareArticle> findBySlugAndPublishedTrue(String slug);
}