package com.jhmusic.fingerstyletabmanager.controller;

import com.jhmusic.fingerstyletabmanager.entity.Difficulty;
import com.jhmusic.fingerstyletabmanager.service.TuningService;
import com.jhmusic.fingerstyletabmanager.util.DifficultyUtils;
import com.jhmusic.fingerstyletabmanager.entity.Tab;
import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.jhmusic.fingerstyletabmanager.service.TabService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tabs")
@CrossOrigin
public class TabController {

    private final TabService tabService;
    private final TuningService tuningService;

    public TabController(TabService tabService, TuningService tuningService) {
        this.tabService = tabService;
        this.tuningService = tuningService;
    }

    @GetMapping
    public ResponseEntity<List<Tab>> findAllTabs() {
        List<Tab> tabs = tabService.findAllTabs();
        return new ResponseEntity<>(tabs, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveTab(@RequestParam("title") String title,
                                         @RequestParam("arranger") String arranger,
                                         @RequestParam("tuning") String tuning,
                                         @RequestParam("difficulty") String difficulty,
                                         @RequestParam("file") MultipartFile file) throws IOException {
        try{
            // Transform file to byte array if necessary
            byte[] pdfContent = file.getBytes();

            // Transform the raw string tuning to a Tuning object
            Tuning tuningObject = tuningService.findTuningByTuningName(tuning);

            System.out.println("id: ");
            System.out.println(tuningObject.getId());
            System.out.println(tuningObject.getCounter());

            // Set upload time
            LocalDateTime uploadDate = LocalDateTime.now();

            // Transform the raw string difficulty to a Difficulty object
            Difficulty difficultyObject = DifficultyUtils.getDifficultyFromString(difficulty);

            // increment tuning counter by 1 as we create a new tab object
            tuningObject.incrementCounter();
            System.out.println(tuningObject.getCounter());

            // Create tab object and save to database
            Tab tab = new Tab(null, title, arranger, tuningObject, uploadDate, difficultyObject, pdfContent);
            Tab savedTab = tabService.saveTab(tab);

            // Return saved tab with 201 Created status
            return new ResponseEntity<>(savedTab, HttpStatus.CREATED);
        } catch (SizeLimitExceededException e) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("File size too large. Please upload a file smaller than 10 MB");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while uploading the file");
        }


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTabById(@PathVariable Long id) {
        Optional<Tab> optionalTab = tabService.findTabById(id);

        // check if tab exist and delete
        if (optionalTab.isPresent()) {
            // get tuning from tab and remove 1 from counter as we delete the tab
            Tuning derivedTuning = optionalTab.get().getTuning();
            derivedTuning.decrementCounter();
            tabService.deleteTabById(id);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


//    @GetMapping("/by-author-name")
//    public List<Tab> findAllTabsOrderedByAuthor() {
//        return tabService.findAllTabsOrderedByAuthor();
//    }
//
//    @GetMapping("/by-upload-date")
//    public List<Tab> findAllTabsOrderedByUploadDate() {
//        return tabService.findAllTabsOrderedByUploadDate();
//    }
//
//    @GetMapping("/by-tuning")
//    public List<Tab> findAllTabsOrderedByTuning() {
//        return tabService.findAllTabsOrderedByTuning();
//    }
}
