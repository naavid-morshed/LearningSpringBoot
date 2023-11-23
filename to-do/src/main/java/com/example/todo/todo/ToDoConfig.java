package com.example.todo.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static java.time.Month.*; // * here is pulling all 12 months, it's the same as Month.JANUARY 12 times

@Configuration
public class ToDoConfig {

    @Bean
    CommandLineRunner commandLineRunner(ToDoRepo toDoRepo) {
        return args -> {
            final ToDo task1 = new ToDo(
                    "Clean House",
                    "Clean desktop too",
                    LocalDate.of(1997, FEBRUARY, 21),
                    LocalTime.of(2,30)
            );
            final ToDo task2 = new ToDo(
                    "Wipe window",
                    "Wipe the damn windows",
                    LocalDate.of(1997, FEBRUARY, 21),
                    LocalTime.of(2, 30)
            );
            final ToDo task3 = new ToDo(
                    "task",
                    "finish task",
                    LocalDate.of(1997, FEBRUARY, 21),
                    LocalTime.of(2, 30)
            );

            toDoRepo.saveAll(
                    List.of(task3, task1, task2)
            );
        };
    }
}
