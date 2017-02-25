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

    incompleteTodoCount: number;
    newTodo: Todo = new Todo();

    constructor(private todoDataService: TodoDataService) {
        this.getCountOfIncompleteTodos(this.todos);

        this.addTodo(new Todo(
            {
                title: 'CLDTX-10975',
            }
        ));
    }

    addTodo(newTodo: Todo) {
        // Save the existing item.
        this.todoDataService.addTodo(newTodo);
        this.getCountOfIncompleteTodos(this.todos);

        // Initialize a new object so we can add more items.
        this.newTodo = new Todo();
    }

    getCountOfIncompleteTodos(todos: Todo[]) {
        this.incompleteTodoCount = 
            todos.filter(todo => !todo.complete).length;
    }

    get todos() {
        return this.todoDataService.getAllTodos();
        
    }

    removeTodo(todo) {
        this.todoDataService.deleteTodoById(todo.id);
        this.getCountOfIncompleteTodos(this.todos);
    }

    toggleTodoComplete(todo) {
        this.todoDataService.toggleTodoComplete(todo);
        this.getCountOfIncompleteTodos(this.todos);
    }
}
