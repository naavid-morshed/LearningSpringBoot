package com.example.todo.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/todo")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @GetMapping
    public List<ToDo> getToDo() {
        return toDoService.getToDoService();
    }

    @GetMapping(path = "id/{id}")
    public Optional<ToDo> getToDoById(@PathVariable("id") Long id) {
        return toDoService.getToDoByIdService(id);
    }

    @PostMapping
    public void postToDo(@RequestBody ToDo toDo) {
        toDoService.postToDoService(toDo);
    }

    @DeleteMapping(path = "{id}")
    public void deleteToDo(@PathVariable("id") Long id) {
        toDoService.deleteToDoService(id);
    }

    @PutMapping(path = "id/{id}")
    public void updateToDo(
            @PathVariable("id") Long id,
            @RequestParam(required = false) String task,
            @RequestParam(required = false) String details,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) LocalTime time
            ) {
        try {
            toDoService.updateToDoService(id, task, details, date, time);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
