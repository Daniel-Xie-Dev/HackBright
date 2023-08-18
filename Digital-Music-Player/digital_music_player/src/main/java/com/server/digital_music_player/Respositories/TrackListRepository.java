package com.server.digital_music_player.Respositories;

import org.springframework.stereotype.Repository;

import com.server.digital_music_player.Entities.TrackList;
import com.server.digital_music_player.Entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface TrackListRepository extends JpaRepository<TrackList, Long> {

    List<TrackList> findAllTrackListsByUser(User user);
}
