package com.server.digital_music_player.Respositories;

import org.springframework.stereotype.Repository;

import com.server.digital_music_player.Entities.Music;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {

    public Optional<Music> findByApiId(Long apiId);


}
