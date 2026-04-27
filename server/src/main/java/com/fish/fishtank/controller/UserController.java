package com.fish.fishtank.controller;

import com.fish.fishtank.model.User;
import com.fish.fishtank.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository
    }

    // return all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // return specific user by username
    @GetMapping("/{username}") // to differentiate GET method for Spring
    public User getUserByUserName(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok(user)) // if the Optional has a User inside it, take that user and turn it into a ResponseEntity.ok(user)
                .orElse(ResponseEntity.notFound().build()); // build creates a body for the status code
    }

    @GetMapping("/email/{email}") // to differentiate above GET with this one
    public User getuserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<User> getUserByUsernameAndEmail( //RequestParam to get each value from URL path
            @RequestParam String username,
            @RequestParam String email) {
        return userRepository.findByUsernameAndEmail(username, email)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // put new user in db
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User saved = userRepository.save(user);

        // auto generate an ID for user
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}