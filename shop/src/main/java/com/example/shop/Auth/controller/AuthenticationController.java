package com.example.shop.Auth.controller;

import com.example.shop.Auth.AuthenticationRequest;
import com.example.shop.Auth.AuthenticationResponse;
import com.example.shop.Auth.RegisterRequest;
import com.example.shop.Auth.UpdateRequest;
import com.example.shop.Auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("updateuser")
    public ResponseEntity<AuthenticationResponse> updateUser(
            @RequestBody UpdateRequest request
    ) {
        return ResponseEntity.ok(authenticationService.updateUser(request));
    }

}
