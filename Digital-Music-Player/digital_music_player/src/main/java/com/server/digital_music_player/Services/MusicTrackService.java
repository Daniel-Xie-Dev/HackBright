package com.server.digital_music_player.Services;

import java.util.List;
import java.util.Optional;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Dtos.MusicTracksDto;
import com.server.digital_music_player.Entities.TrackList;

public interface MusicTrackService {

    List<MusicTracksDto> getAllMusicTracksInTrackList(Long trackListId);

    Optional<MusicTracksDto> addMusicTrackToTrackList(MusicDto musicDto, Long trackListId);

    void deleteMusicTrack(Long musicTrackId);

    void deleteAllMusicTrackByTracklistId(TrackList trackList);

}