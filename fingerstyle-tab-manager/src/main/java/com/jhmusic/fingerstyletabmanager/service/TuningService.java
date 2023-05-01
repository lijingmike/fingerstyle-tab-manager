package com.jhmusic.fingerstyletabmanager.service;

import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import com.jhmusic.fingerstyletabmanager.repository.TuningRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TuningService {

    private final TuningRepository tuningRepository;

    public TuningService(TuningRepository tuningRepository) {
        this.tuningRepository = tuningRepository;
    }

    public Tuning findTuningByTuningName(String tuningName) {
        return tuningRepository.findByTuningName(tuningName);
    }

    public List<Tuning> findAllTunings() {
        return tuningRepository.findAll();
    }
}
