package com.server.digital_music_player.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.digital_music_player.Dtos.UserDto;
import com.server.digital_music_player.Entities.TrackList;
import com.server.digital_music_player.Entities.User;
import com.server.digital_music_player.Respositories.TrackListRepository;
import com.server.digital_music_player.Respositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrackListRepository trackListRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public String addUser(UserDto userDto) {
        User user = new User(userDto);
        userRepository.saveAndFlush(user);

        TrackList trackList = new TrackList();
        trackList.setTrackTitle("main");
        trackList.setUser(user);
        trackListRepository.saveAndFlush(trackList);
        return "success";
    }

    @Override
    @Transactional
    public String userLogin(UserDto userDto) {
        Optional<User> userOptional = userRepository.findByEmail(userDto.getEmail());
        if (userOptional.isPresent()) {
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())) {
                return "success";
            }
            return "failure";
        }
        return "failure";
    }

}
