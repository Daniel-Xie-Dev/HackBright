package com.server.digital_music_player.Controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.digital_music_player.Dtos.UserDto;
import com.server.digital_music_player.Services.UserService;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/users")
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    @PostMapping(path = "/register")
    public Optional<UserDto> registerUser(@RequestBody UserDto userDto) {
        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(encodedPassword);
        return userService.addUser(userDto);
//        return Optional.empty();
        // return "success";
    }

    @PostMapping(path = "/login")
    public Optional<UserDto> loginUser(@RequestBody UserDto userDto) {
        return userService.userLogin(userDto);
    }

}
