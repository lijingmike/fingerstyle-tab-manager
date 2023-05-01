package com.jhmusic.fingerstyletabmanager.util;

import com.jhmusic.fingerstyletabmanager.entity.Difficulty;

public class DifficultyUtils {
    public static Difficulty getDifficultyFromString(String difficultyString) {
        switch(difficultyString) {
            case "Beginner":
                return Difficulty.BEGINNER;
            case "Intermediate":
                return Difficulty.INTERMEDIATE;
            case "Advanced":
                return Difficulty.ADVANCED;
            default:
                throw new IllegalArgumentException("Invalid difficulty string: " + difficultyString);
        }
    }
}
