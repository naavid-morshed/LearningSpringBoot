package com.example.todo.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ToDoRepo extends JpaRepository<ToDo, Long> {
}
