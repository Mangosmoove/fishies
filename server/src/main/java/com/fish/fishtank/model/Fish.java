package com.fish.fishtank.model;

import jakarta.persistence.*;

@Entity
@Table(name="fishies")
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    private int lives = 3;
    private boolean isActive = true;

    // for later implementation
//    private double speed;
//    private double size;

    @Column(nullable = false, updatable = false) // once created, this field cannot be changed
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    } // gets time automatically before row


    public String getFishName() {
        return name;
    }

    public void setFishName(String name) {
        this.name = name;
    }

    public int getFishLives() {
        return lives;
    }

    public void setFishLives(int lives) {
        this.lives = lives;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}