package com.server.digital_music_player.Services;

import com.server.digital_music_player.Dtos.MusicDto;

public interface HistoryService {

    void createHistoryRecord(Long userId, MusicDto musicDto);

    void deleteHistory(Long userId);

}