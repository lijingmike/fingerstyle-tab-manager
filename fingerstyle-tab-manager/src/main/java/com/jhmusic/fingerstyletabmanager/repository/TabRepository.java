package com.jhmusic.fingerstyletabmanager.repository;

import com.jhmusic.fingerstyletabmanager.entity.Tab;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TabRepository extends JpaRepository<Tab, Long> {
//    List<Tab> findAllOrderedByUploadDateAsc();
//
//    List<Tab> findAllOrderedByAuthorAsc();
//
//    List<Tab> findAllOrderedByTuningAsc();

}
