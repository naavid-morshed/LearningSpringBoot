package com.example.learningauthwithjwt.demoController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class DemoController {

    @GetMapping("demo-controller")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello, you are logged in");
    }
}
