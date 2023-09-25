//package com.server.digital_music_player.Controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import com.server.digital_music_player.Dtos.MusicDto;
//import com.server.digital_music_player.Services.HistoryService;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping(path = "/api/v1/history")
//public class HistoryController {
//
//    @Autowired
//    private HistoryService historyService;
//
//    @PostMapping(path = "/add/{userId}")
//    public void createHistoryRecord(@PathVariable Long userId, @RequestBody MusicDto musicDto) {
//        historyService.createHistoryRecord(userId, musicDto);
//    }
//
//    @DeleteMapping(path = "/delete/{userId}")
//    public void deleteHistory(@PathVariable Long userId) {
//        historyService.deleteHistory(userId);
//    }
//}
