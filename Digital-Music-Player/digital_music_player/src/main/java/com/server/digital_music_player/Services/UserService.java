package com.server.digital_music_player.Services;

import com.server.digital_music_player.Dtos.UserDto;

public interface UserService {

    String addUser(UserDto userDto);

    String userLogin(UserDto userDto);

}