package com.server.digital_music_player.Respositories;

import org.springframework.stereotype.Repository;

import com.server.digital_music_player.Entities.MusicTracks;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.server.digital_music_player.Entities.TrackList;

@Repository
public interface MusicTrackRepository extends JpaRepository<MusicTracks, Long> {
    List<MusicTracks> findAllByTrackList(TrackList trackList);

    void deleteAllByTracklist(TrackList trackList);
}
