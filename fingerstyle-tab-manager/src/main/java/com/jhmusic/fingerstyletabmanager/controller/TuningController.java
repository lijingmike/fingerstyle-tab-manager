package com.jhmusic.fingerstyletabmanager.controller;

import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import com.jhmusic.fingerstyletabmanager.service.TabService;
import com.jhmusic.fingerstyletabmanager.service.TuningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tunings")
@CrossOrigin
public class TuningController {

    private final TuningService tuningService;

    public TuningController(TuningService tuningService) {
        this.tuningService = tuningService;
    }

    public Tuning findTuningByTuningName(String tuningName) {
        return tuningService.findTuningByTuningName(tuningName);
    }

    @GetMapping
    public ResponseEntity<List<Tuning>> findAllTunings() {
        List<Tuning> tunings = tuningService.findAllTunings();
        return new ResponseEntity<>(tunings, HttpStatus.OK);
    }

}
