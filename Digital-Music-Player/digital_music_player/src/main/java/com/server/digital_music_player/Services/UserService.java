package com.server.digital_music_player.Services;

import java.util.ArrayList;

import com.server.digital_music_player.Dtos.UserDto;

public interface UserService {

    String addUser(UserDto userDto);

    ArrayList<String> userLogin(UserDto userDto);

}