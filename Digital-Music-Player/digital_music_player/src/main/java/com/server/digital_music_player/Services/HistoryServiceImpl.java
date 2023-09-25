//package com.server.digital_music_player.Services;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.server.digital_music_player.Dtos.MusicDto;
//import com.server.digital_music_player.Entities.History;
//import com.server.digital_music_player.Entities.Music;
//import com.server.digital_music_player.Entities.User;
//import com.server.digital_music_player.Respositories.HistoryRepository;
//import com.server.digital_music_player.Respositories.UserRepository;
//
//import jakarta.transaction.Transactional;
//
//@Service
//public class HistoryServiceImpl implements HistoryService {
//
//    @Autowired
//    private HistoryRepository historyRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private MusicService musicService;
//
//    @Override
//    @Transactional
//    public void createHistoryRecord(Long userId, MusicDto musicDto) {
//        Optional<User> userOptional = userRepository.findById(userId);
//        if (userOptional.isEmpty()) {
//            return;
//        }
//
//        Optional<MusicDto> musicOptional = musicService.findMusicByApiId(musicDto.getApiId());
//        if (musicOptional.isEmpty()) {
//            musicOptional = musicService.storeMusic(musicDto);
//        }
//
//        History history = new History();
//        history.setUser(userOptional.get());
//        history.setMusic(new Music(musicOptional.get()));
//        historyRepository.saveAndFlush(history);
//    }
//
//    @Override
//    @Transactional
//    public void deleteHistory(Long userId) {
//        Optional<User> userOptional = userRepository.findById(userId);
//        if (userOptional.isPresent()) {
//            historyRepository.deleteAllByUser(userOptional.get());
//        }
//
//    }
//}
