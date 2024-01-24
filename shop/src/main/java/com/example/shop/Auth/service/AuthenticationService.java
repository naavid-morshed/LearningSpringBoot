package com.example.shop.Auth.service;

import com.example.shop.Auth.AuthenticationRequest;
import com.example.shop.Auth.AuthenticationResponse;
import com.example.shop.Auth.RegisterRequest;
import com.example.shop.Auth.UpdateRequest;
import com.example.shop.user.Entity.User;
import com.example.shop.user.Enums.Role;
import com.example.shop.user.model.UserModel;
import com.example.shop.user.repository.UserRepository;
import com.example.shop.user.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Mail taken");
        }

        User user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .user(new UserModel(user))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        String jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .user(new UserModel(user))
                .build();
    }

    public AuthenticationResponse updateUser(UpdateRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.oldEmail(),
                        request.oldPass()
                )
        );

        User user = userRepository.findByEmail(request.oldEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User by :" +request.oldEmail() + " not found"));

        if (!request.newPass().equals(request.oldPass()) && !request.newPass().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.newPass()));
        }

        if (!request.firstName().equals(user.getFirstName()) && !request.firstName().isEmpty()){
            user.setFirstName(request.firstName());
        }

        if (!request.lastName().equals(user.getLastName()) && !request.lastName().isEmpty()){
            user.setLastName(request.lastName());
        }

        if (!request.newEmail().equals(request.oldEmail()) && !request.newEmail().isEmpty()){
            user.setEmail(request.newEmail());
        }

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .user(new UserModel(user))
                .build();
    }

//
//    public AuthenticationResponse changeCredentials(AuthenticationRequest request) {
//    }
}
