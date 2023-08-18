package com.server.digital_music_player.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Services.HistoryService;

@RestController
@RequestMapping(path = "/api/v1/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @PostMapping(path = "/add/{userId}")
    public void createHistoryRecord(@PathVariable Long userId, @RequestBody MusicDto musicDto) {
        historyService.createHistoryRecord(userId, musicDto);
    }

    @DeleteMapping(path = "/delete/{userId}")
    public void deleteHistory(@PathVariable Long userId) {
        historyService.deleteHistory(userId);
    }
}
