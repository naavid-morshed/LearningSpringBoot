package com.example.helloworld.student;

import jakarta.persistence.*; // don't know what it does, but it helps when "hibernate" is switched away from
import lombok.*;

import java.time.LocalDate;
import java.time.Period;

@Setter @Getter @ToString @NoArgsConstructor @AllArgsConstructor
@Entity // @Entity for "hibernate"
@Table // @Table for the postgres table
public class Student {
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
    private String name;
    private String email;
    private LocalDate dob;
    @Transient
    private Integer age;

    // Overridden lombok's method
    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public Student(Long id, String name, String email, LocalDate dob) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dob = dob;
    }

    public Student(String name, String email, LocalDate dob) {
        this.name = name;
        this.email = email;
        this.dob = dob;
    }
}
