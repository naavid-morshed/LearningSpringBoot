package com.example.helloworld.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

import static java.time.Month.*; // * here is pulling all 12 months, it's the same as Month.JANUARY 12 times

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository) {
        return args -> {
            final Student naavid = new Student(
                    "Naavid Morshed",
                    "naavid.m@gmail.com",
                    LocalDate.of(1997, FEBRUARY, 21)
            );
            final Student ovi = new Student(
                    "ovi",
                    "ovi.m@gmail.com",
                    LocalDate.of(1997, DECEMBER, 21)
            );
            final Student sifat = new Student(
                    "sifat",
                    "sifat.m@gmail.com",
                    LocalDate.of(1995, JUNE, 21)
            );

            // below is for saving objects to db, this is performed by "hibernate"
            studentRepository.saveAll(
                    List.of(sifat, naavid, ovi)
            );
        };
    }
}
