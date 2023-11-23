package com.example.todo.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoService {
    private final ToDoRepo toDoRepo;

    @Autowired
    public ToDoService(ToDoRepo toDoRepo) {
        this.toDoRepo = toDoRepo;
    }

    public List<ToDo> getToDoService() {
        return toDoRepo.findAll();
    }

    public Optional<ToDo> getToDoByIdService(Long id) {
        if (toDoRepo.existsById(id)) {
            return toDoRepo.findById(id);
        } else {
            throw new IllegalStateException("Task by " + id + " does not exist.");
        }
    }

    public void postToDoService(ToDo toDo) {
        toDoRepo.save(toDo);
    }

    public void deleteToDoService(Long id) {
        if (!toDoRepo.existsById(id)) {
            throw new IllegalStateException("Task with ID: " + id + " does not exist");
        } else {
            toDoRepo.deleteById(id);
        }
    }

    @Transactional
    public void updateToDoService(Long id, String task, String details, LocalDate date, LocalTime time) {
        ToDo toDo = toDoRepo.findById(id).orElseThrow(
                () -> new IllegalStateException("Task with ID: " + id + " does not exist")
        );

        try {
            if (task != null && !task.isEmpty()) toDo.setTask(task);
            if (details != null && !details.isEmpty()) toDo.setDetails(details);
            if (date != null) toDo.setDueDate(date);
            if (time != null) toDo.setDueTime(time);
        } catch (Exception e) {
            throw new IllegalStateException("Wrong date time format");
        }
    }
}
