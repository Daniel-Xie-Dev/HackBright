package com.server.digital_music_player.Controllers;

import com.server.digital_music_player.Dtos.LikedMusicDto;
import com.server.digital_music_player.Services.LikedMusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/liked-music")
public class LikedMusicController {

    @Autowired
    LikedMusicService likedMusicService;

    @GetMapping(path = "/getAllLikedMusic/{userId}")
    public List<LikedMusicDto> getAllLikedMusicByUserId(@PathVariable Long userId){
        return likedMusicService.getAllLikedMusicByUserId(userId);
    }

    @PostMapping(path = "/addLikedMusic/{userId}")
    public Optional<LikedMusicDto> addLikedMusicToUserId(@PathVariable Long userId, @RequestBody LikedMusicDto likedMusicDto){
        return likedMusicService.addLikedMusicToUserId(userId, likedMusicDto);
    }

    @DeleteMapping(path = "/deleteLikedMusic/{id}")
    public Optional<LikedMusicDto> deleteLikedMusic(@PathVariable Long id){
        return likedMusicService.deleteLikedMusic(id);
    }
}
