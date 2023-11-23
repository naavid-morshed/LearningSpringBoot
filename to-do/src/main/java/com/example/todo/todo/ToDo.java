package com.example.todo.todo;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter @Getter @ToString @NoArgsConstructor @AllArgsConstructor
@Entity
@Table
public class ToDo {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String task;
    private String details;
    private LocalDate dueDate;
    private LocalTime dueTime;

    public ToDo(String task,String details, LocalDate dueDate, LocalTime dueTime) {
        this.task = task;
        this.details = details;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
    }
}
