package com.jhmusic.fingerstyletabmanager.controller;

import com.jhmusic.fingerstyletabmanager.entity.Tab;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.jhmusic.fingerstyletabmanager.service.TabService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tabs")
@CrossOrigin
public class TabController {

    private final TabService tabService;

    public TabController(TabService tabService) {
        this.tabService = tabService;
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
            Tab savedTab = tabService.saveTab(title, arranger, tuning, difficulty, file);
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
        if (tabService.deleteTabById(id)) {
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
