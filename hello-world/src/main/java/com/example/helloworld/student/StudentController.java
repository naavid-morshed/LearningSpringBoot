package com.example.helloworld.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/student")
public class StudentController {

    private final StudentService studentService;

    @Autowired // Auto Dependency injection but @Service must be added in StudentService class
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getStudentsService();
    }
    @GetMapping(path = "id/{studentId}")
    public Optional<Student> getStudentById(@PathVariable("studentId") Long studentId) {
        return studentService.getStudentByIdService(studentId);
    }

    @PostMapping
    // Posting the entire Student object/body like {"name":"asdf", "email":"naavid.m@gmail.com", "dob":"2013-02-02"}
    public void registerStudent(@RequestBody Student student) {
        studentService.registerStudentService(student);
    }

//    @PostMapping // Posting through parameters
//    public void registerStudent(
//            // why are the required = true is redundant? because they are true by default?
//            @RequestParam() String name,
//            @RequestParam() String email,
//            @RequestParam() LocalDate dob) {
//        Student student = new Student();
//        student.setName(name);
//        student.setEmail(email);
//        student.setDob(dob);
//        studentService.registerStudentService(student);
//    }

    // if endpoint child is present, it would be "/{studentId}child"
    @DeleteMapping(path = "{studentId}")
    // {} inside quotation is crucial, without it @PathVariable will not recognize "studentId"
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudentService(studentId);
    }

    @PutMapping(path = "{studentId}")
    public String updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) LocalDate dob) {
        try {
            studentService.updateStudentService(studentId, name, email,dob);
            return "Success";
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
//        System.out.println("sfgsdg");
    }
}
