import { Component } from '@angular/core';
import {Todo} from './todo';
import {TodoDataService} from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService],
})
export class AppComponent {

    newTodo: Todo = new Todo();

    constructor(private todoDataService: TodoDataService) {
    }

    addTodo() {
        // Save the existing item.
        this.todoDataService.addTodo(this.newTodo);

        // Initialize a new object so we can add more items.
        this.newTodo = new Todo();
    }

    get todos() {
        return this.todoDataService.getAllTodos();
    }

    removeTodo(todo) {
        this.todoDataService.deleteTodoById(todo.id);
    }

    toggleTodoComplete(todo) {
        this.todoDataService.toggleTodoComplete(todo);
    }
}
