package com.jhmusic.fingerstyletabmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tuning")
@Data
public class Tuning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tuningName;

    // an attribute counter to keep track of the number of tabs that use a particular tuning
    private int counter;

    public void incrementCounter() {
        this.counter++;
    }

    public void decrementCounter() {
        this.counter--;
    }

    // initialize counter to be 0
    public Tuning(String tuningName) {
        this.tuningName = tuningName;
        this.counter = 0;
    }

    public Tuning() {
        this.counter = 0;
    }
}
