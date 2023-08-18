package com.server.digital_music_player.Services;

import java.util.List;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Dtos.MusicTracksDto;

public interface MusicTrackService {

    List<MusicTracksDto> getAllMusicTracksInTrackList(Long trackListId);

    void addMusicTrackToTrackList(MusicDto musicDto, Long trackListId);

    void deleteMusicTrack(Long musicTrackId);

}