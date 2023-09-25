package com.server.digital_music_player.Services;

import java.util.ArrayList;
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
    public Optional<UserDto> addUser(UserDto userDto) {

        Optional<User> userOptional = userRepository.findByEmailOrUsername(userDto.getEmail(), userDto.getUsername());

        if(userOptional.isEmpty()){
            User user = new User(userDto);
            TrackList trackList = new TrackList();
            trackList.setTrackTitle("Favorites");
            trackList.setUser(user);
            TrackList temp = trackListRepository.save(trackList);

            user.setFavorite_list(temp.getId());
            userRepository.saveAndFlush(user);
            trackListRepository.flush();


            return Optional.of(new UserDto(user));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public Optional<UserDto> userLogin(UserDto userDto) {
        Optional<User> userOptional = userRepository.findByEmailOrUsername(userDto.getEmail(), userDto.getUsername());

        if (userOptional.isPresent()) {
            if (passwordEncoder.matches(userDto.getPassword(), userOptional.get().getPassword())) {
                return Optional.of(new UserDto(userOptional.get()));
            }
        }

        return Optional.empty();
    }

}
