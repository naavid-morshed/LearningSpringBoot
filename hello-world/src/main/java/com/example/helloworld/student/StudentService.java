package com.example.helloworld.student;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service // same as Component, they specify that this class would be injected
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired // @Autowired for dependency injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudentsService() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentByIdService(Long studentId) {
        if (studentRepository.existsById(studentId)) {
            return studentRepository.findById(studentId);
        } else {
            throw new IllegalStateException("Student by " + studentId + " does not exist.");
        }
    }

    public void registerStudentService(Student student) {
        final Optional<Student> result = studentRepository.findStudentByEmail(student.getEmail());

        if (result.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudentService(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new IllegalStateException("Student with ID: " + studentId + " does not exist");
        } else {
            studentRepository.deleteById(studentId);
        }
    }

    @Transactional
    public void updateStudentService(Long studentId, String name, String email, LocalDate dob) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new IllegalStateException("Student with ID: " + studentId + " does not exist")
        );
//        if(Objects.equals(student.getName(), name)) System.err.println("User entered same name as before");

        if (student.getEmail().equals(email)) throw new IllegalStateException("User entered same email as before");
        if (email != null && !email.isEmpty()) {
            if (studentRepository.findStudentByEmail(email).isPresent()) {
                throw new IllegalStateException("email taken by another user");
            } else {
                student.setEmail(email);
            }
        }

        if (student.getName().equals(name)) throw new IllegalStateException("User entered same name as before");
        if (name != null && !name.isEmpty()) {
            student.setName(name);
        }

        if (student.getDob().equals(dob)) throw new IllegalStateException("User entered same Date of Birth as before");
        if (dob != null) {
            try {
                student.setDob(dob);
            } catch (Exception e) {
                throw new IllegalStateException("Wrong date time format");
            }
        }
    }
}
