package com.server.digital_music_player.Services;

import java.util.Optional;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Entities.Music;

public interface MusicService {

    Optional<MusicDto> storeMusic(MusicDto musicDto);

    Optional<MusicDto> findMusicById(Long id);

    Optional<MusicDto> findMusicByApiId(Long id);

}