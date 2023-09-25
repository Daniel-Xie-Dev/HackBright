package com.server.digital_music_player.Controllers;


import com.server.digital_music_player.Dtos.MusicDto;

import com.server.digital_music_player.Services.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/music")
public class MusicController {

    @Autowired
    MusicService musicService;

    public void storeMusic(@RequestBody MusicDto musicDto){
        musicService.storeMusic(musicDto);
    }
}
