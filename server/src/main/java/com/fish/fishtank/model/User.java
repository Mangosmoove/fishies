package com.fish.fishtank.model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    // fields get mapped as columns automatically because Hibernate is awesome
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // can't be null and must be unique
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // so password won't be returned in User object
    private String password; // will be implemented later

    private int maxFish = 3;

    private LocalDateTime createdAt;

    // getters allow Hibernate to read object to write to db
    public String getUsername() {
        return username;
    }

    // setters allow Hibernate to read row from db and turn into object
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public String setEmail(String email) {
        this.email = email;
    }

    private int getMaxFish() {
        return maxFish;
    }

    public void setMaxFish(int maxFish) {
        this.maxFish = maxFish;
    }
}