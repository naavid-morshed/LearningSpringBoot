package com.example.helloworld.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// We need to specify JpaRepository type, the first type is of Student from Student class,
// the 2nd type is of Long from id [private Long id; inside Student class]
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // can add this over Optional<Student>, @Query("select s from Student s where s.email=?1"), commenting this out is not a problem, it just specifies what query would be run
    // This will transform into a query such as "select * from student where email = ?"
    Optional<Student> findStudentByEmail(String email);
}
