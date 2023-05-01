package com.jhmusic.fingerstyletabmanager.service;

import com.jhmusic.fingerstyletabmanager.entity.Tab;
import com.jhmusic.fingerstyletabmanager.entity.Tuning;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.jhmusic.fingerstyletabmanager.repository.TabRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TabService {

    private final TabRepository tabRepository;

    public TabService(TabRepository tabRepository) {
        this.tabRepository = tabRepository;
    }

    public List<Tab> findAllTabs() {
        return tabRepository.findAll();
    }

    public Optional<Tab> findTabById(Long id) {
        return tabRepository.findById(id);
    }

    public Tab saveTab(Tab tab) {
        return tabRepository.save(tab);
    }

    public void deleteTabById(Long id) {
        tabRepository.deleteById(id);
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
