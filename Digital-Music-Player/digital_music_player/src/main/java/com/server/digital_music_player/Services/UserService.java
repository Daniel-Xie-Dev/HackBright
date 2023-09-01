package com.server.digital_music_player.Services;

import java.util.ArrayList;
import java.util.Optional;

import com.server.digital_music_player.Dtos.UserDto;

public interface UserService {

    Optional<UserDto> addUser(UserDto userDto);

    Optional<UserDto> userLogin(UserDto userDto);

}