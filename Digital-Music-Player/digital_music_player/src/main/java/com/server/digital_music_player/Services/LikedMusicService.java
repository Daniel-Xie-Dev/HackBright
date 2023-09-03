package com.server.digital_music_player.Services;

import com.server.digital_music_player.Dtos.LikedMusicDto;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface LikedMusicService {
    List<LikedMusicDto> getAllLikedMusicByUserId(Long userId);

    @Transactional
    Optional<LikedMusicDto> addLikedMusicToUserId(Long userId, LikedMusicDto likedMusicDto);

    @Transactional
    Optional<LikedMusicDto> deleteLikedMusic(Long id);
}
