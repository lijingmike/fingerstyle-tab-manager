package com.jhmusic.fingerstyletabmanager.service;

import com.jhmusic.fingerstyletabmanager.entity.Difficulty;
import com.jhmusic.fingerstyletabmanager.entity.Tab;
import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import com.jhmusic.fingerstyletabmanager.util.DifficultyUtils;
import org.springframework.stereotype.Service;
import com.jhmusic.fingerstyletabmanager.repository.TabRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TabService {

    private final TabRepository tabRepository;
    private final TuningService tuningService;
    public TabService(TabRepository tabRepository, TuningService tuningService) {
        this.tabRepository = tabRepository;
        this.tuningService = tuningService;
    }
    public List<Tab> findAllTabs() {
        return tabRepository.findAll();
    }

    public Optional<Tab> findTabById(Long id) {
        return tabRepository.findById(id);
    }

    public Tab saveTab(String title, String arranger, String tuning, String difficulty, MultipartFile file) throws IOException {
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
        return tabRepository.save(tab);
    }

    public boolean deleteTabById(Long id) {
        Optional<Tab> optionalTab = tabRepository.findById(id);

        if (optionalTab.isPresent()) {
            // get tuning from tab and remove 1 from counter as we delete the tab
            Tuning derivedTuning = optionalTab.get().getTuning();
            derivedTuning.decrementCounter();
            tabRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

//    public List<Tab> findAllTabsOrderedByAuthor() {
//        return tabRepository.findAllOrderedByAuthorAsc();
//    }
//
//    public List<Tab> findAllTabsOrderedByUploadDate() {
//        return tabRepository.findAllOrderedByUploadDateAsc();
//    }
//
//    public List<Tab> findAllTabsOrderedByTuning() {
//        return tabRepository.findAllOrderedByTuningAsc();
//    }


}
