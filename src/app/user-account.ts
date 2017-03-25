import { Todo } from './todo';
import {
    FirebaseListObservable
} from 'angularfire2';

export class UserAccount {
    uid: string;
    todos: Todo[];
}