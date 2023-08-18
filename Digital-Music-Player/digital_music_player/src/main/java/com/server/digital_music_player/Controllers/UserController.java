package com.server.digital_music_player.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.digital_music_player.Dtos.UserDto;
import com.server.digital_music_player.Services.UserService;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping(path = "/register")
    public String registerUser(@RequestBody UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(encodedPassword);
        return userService.addUser(userDto);
        // return "success";
    }

    @PostMapping(path = "/login")
    public String loginUser(@RequestBody UserDto userDto) {
        return userService.userLogin(userDto);
    }

}
