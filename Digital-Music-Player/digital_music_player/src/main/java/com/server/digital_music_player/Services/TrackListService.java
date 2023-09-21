package com.server.digital_music_player.Services;

import java.util.List;
import java.util.Optional;

import com.server.digital_music_player.Dtos.TrackListDto;

public interface TrackListService {

    List<TrackListDto> getAllTrackListByUser(Long userId);

    Optional<TrackListDto> addTrackListToUser(Long userId, String trackListTitle);

    String deleteTrackList(Long trackListId);

    void editTrackTitle(TrackListDto trackListDto);

}