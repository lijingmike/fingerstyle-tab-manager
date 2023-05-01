package com.jhmusic.fingerstyletabmanager.repository;

import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TuningRepository extends JpaRepository<Tuning, Long> {
    Tuning findByTuningName(String tuningName);

    List<Tuning> findAll();
    
}
