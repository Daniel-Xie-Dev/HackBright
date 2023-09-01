package com.server.digital_music_player.Respositories;

import org.springframework.stereotype.Repository;

import com.server.digital_music_player.Entities.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailOrUsername(String email, String username);
}
