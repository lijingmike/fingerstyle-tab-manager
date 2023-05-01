package com.jhmusic.fingerstyletabmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="tab")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String arranger;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tuning_id")
    private Tuning tuning;
    private LocalDateTime uploadDate;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] pdfContent;

}
