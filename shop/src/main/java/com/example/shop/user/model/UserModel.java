package com.example.shop.user.model;

import com.example.shop.user.Entity.User;
import com.example.shop.user.Enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String address;

    public UserModel(User user) {
        this.setId(user.getId());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setEmail(user.getEmail());
        this.setRole(user.getRole());
        this.setAddress(user.getAddress());
//        this.setPassword(user.getPassword());
    }

    public UserModel(String firstName, String lastName, String email, Role role) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setRole(role);
    }
}
