package com.example.shop.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<?> handleException(RuntimeException exception) {
        Map<String, String> errorDetails = new HashMap<>();
        errorDetails.put("message", exception.getMessage());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(value = InsufficientStockException.class)
//    public ResponseEntity<?> handleException(InsufficientStockException exception) {
//        Map<String, String> errorDetails = new HashMap<>();
//        errorDetails.put("message", exception.getMessage());
//
//        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(value = OutOfStockException.class)
//    public ResponseEntity<?> handleException(OutOfStockException exception) {
//        Map<String, String> errorDetails = new HashMap<>();
//        errorDetails.put("message", exception.getMessage());
//
//        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//    }
}
