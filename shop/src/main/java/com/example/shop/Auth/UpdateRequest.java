package com.example.shop.Auth;

public record UpdateRequest(String firstName,
                            String lastName,
                            String oldEmail,
                            String newEmail,
                            String oldPass,
                            String newPass) {
}
