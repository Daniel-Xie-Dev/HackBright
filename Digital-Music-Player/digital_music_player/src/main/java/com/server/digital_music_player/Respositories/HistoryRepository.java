package com.server.digital_music_player.Respositories;

import org.springframework.stereotype.Repository;

import com.server.digital_music_player.Entities.History;

import org.springframework.data.jpa.repository.JpaRepository;
import com.server.digital_music_player.Entities.User;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    void deleteAllByUser(User user);
}
