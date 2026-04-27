package com.fish.fishtank.repository;

import com.fish.fishtank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// params --> User tells Spring this manages User DB, Long is the type of the primary key
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Optional because user may not exist
    // Spring generates: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);

    // SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    // SELECT * FROM users WHERE username = ? AND email = ?
    Optional<User> findByUsernameAndEmail(String username, String email);
}

