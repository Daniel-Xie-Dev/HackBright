package com.server.digital_music_player.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Dtos.MusicTracksDto;
import com.server.digital_music_player.Services.MusicTrackService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/musicTracks")
public class MusicTrackController {

    @Autowired
    private MusicTrackService musicTrackService;

    @GetMapping(path = "/{trackListId}")
    public List<MusicTracksDto> getAllMusicTracksInTrackList(@PathVariable Long trackListId) {
        return musicTrackService.getAllMusicTracksInTrackList(trackListId);
    }

    @PostMapping(path = "/add/{trackListId}")
    public String addMusicTrackToTrackList(@RequestBody MusicDto musicDto, @PathVariable Long trackListId) {
        musicTrackService.addMusicTrackToTrackList(musicDto, trackListId);
        return "success";
    }

    @DeleteMapping(path = "/delete/{musicTrackId}")
    public String deleteMusicTrack(@PathVariable Long musicTrackId) {
        musicTrackService.deleteMusicTrack(musicTrackId);
        return "success";
    }

}
