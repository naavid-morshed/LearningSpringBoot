package com.example.shop.user.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.user.Entity.User;
import com.example.shop.user.model.UserModel;
import com.example.shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<UserModel> getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String email = authentication.getName();

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("asdf")
            );

            return Optional.of(new UserModel(user));
        } else {
            throw new RuntimeException("You messed up");
        }
    }
}
