package com.fish.fishtank.controller;

import com.fish.fishtank.model.Fish;
import com.fish.fishtank.repository.FishRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/fish")
public class FishController {

    private final fishRepository;

    public FishController(FishRepository fishRepository) {
        this.fishRepository = fishRepository;
    }

    // get all fish for one user
    @GetMapping("/user/{userId}")
    public List<Fish> getFishByUser(@PathVariable Long userId) {
        return fishRepository.findByUserId(userId);
    }

    // get fish by name
    @GetMapping("/name/{name}")
    public ResponseEntity<Fish> getFishByName(@PathVariable String name) {
        return fishRepository.findByName(name)
                .map(fish -> ResponseEntity.ok(fish))
                .orElse(ResponseEntity.notFound().build());
    }

    // get fish by active status
    @GetMapping("/active/{isActive}")
    public List<Fish> getFishByActiveStatus(@PathVariable boolean isActive) {
        return fishRepository.findByIsActive(isActive);
    }

    // get a user's fish sorted by lives
    @GetMapping("/user/{userId}/lives")
    public List<Fish> getFishSortedByLives(@PathVariable Long userId) {
        return fishRepository.findByUserIdOrderByLivesAsc(userId);
    }

    // get a user's fish sorted by lives
    @GetMapping("/user/{userId}/lives")
    public List<Fish> getFishSortedByLives(@PathVariable Long userId) {
        return fishRepository.findByUserIdOrderByLivesDesc(userId);
    }

    // create a fish
    @PostMapping
    public ResponseEntity<Fish> createFish(@RequestBody Fish fish) {
        Fish saved = fishRepository.save(fish);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // update fish active status
    @PutMapping("/{id}/status")
    public ResponseEntity<Fish> updateFishStatus(@PathVariable Long id, @RequestParam boolean isActive) {
        return fishRepository.findById(id)
                .map(fish -> {
                    fish.setIsActive(isActive);
                    Fish saved = fishRepository.save(fish);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}