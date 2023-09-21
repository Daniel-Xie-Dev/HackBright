package com.server.digital_music_player.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.server.digital_music_player.Dtos.TrackListDto;
import com.server.digital_music_player.Services.TrackListService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/tracklists")
public class TrackListController {

    @Autowired
    private TrackListService trackListService;

    @GetMapping(path = "/user/{userId}")
    public List<TrackListDto> getAllTrackListByUser(@PathVariable Long userId) {
        return trackListService.getAllTrackListByUser(userId);
    }

    @PostMapping(path = "/user/{userId}")
    public Optional<TrackListDto> addTrackListToUser(@PathVariable Long userId, @RequestParam String trackListTitle) {
        return trackListService.addTrackListToUser(userId, trackListTitle);
    }

    @DeleteMapping(path = "/{trackListId}")
    public String deleteTrackList(@PathVariable Long trackListId) {
        return trackListService.deleteTrackList(trackListId);
    }

    @PutMapping(path = "/edit")
    public void editTrackTitle(@RequestBody TrackListDto trackListDto) {
        trackListService.editTrackTitle(trackListDto);
    }

}
