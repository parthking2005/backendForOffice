import { TodoModel } from "./models/todo.js";
import { UserModel } from "./models/user.js";

const createUserModel = async (id, username, email, profileimg, password) => {
    async function main() {
        // Create a user

        const newUser = await UserModel.createUser(id, username, email, profileimg, password);
        console.log('User Created:', newUser);
    }
    main().catch(console.error);
}

const searchUserModel = async (username, email) => {
    async function main() {
        // get a user
        const foundUser = await UserModel.searchUser(username, email);
        if (foundUser) {
            console.log('User found! user is:', foundUser);
            return foundUser;
        } else {
            console.log("user not found");
            return null;
        }
    }
    main().catch(console.error);
}

const matchUserModel = async (entereduser) => {
    async function main() {
        // get a user
        const user = await UserModel.matchUser(entereduser);

        if (!user) {
            console.log("User not found!");
            return false;
        } else {
            return user.password
        }
        
    }
    main()
    .catch(console.error);
    return await main();
}

const getUserIdModel = async (entereduser) => {
    async function main() {
        // get a user
        const user = await UserModel.getUserId(entereduser);

        if (!user) {
            console.log("User not found!");
            return false;
        } else {
            return user.user_id 
        }
        
    }    
    return await main();
}


const getUserTodosModel = async (user_id) => {
    async function main() {
        // get a user
        const foundTodos = await TodoModel.getUserTodos(user_id);
        if (foundTodos) {
            console.log('Todos found! todos are: ', foundTodos);
            return foundTodos;
        } else {
            console.log("todos not found");
            return {};
        }
    }
    main().catch(console.error);
}

const createTodoModel = async (user_id, todo_id, title, content, completed = false, created_at) => {
    async function main() {
        // Create a user

        const newTodo = await TodoModel.createTodo(user_id, todo_id, title, content, completed, created_at);
        console.log('Todo Created:', newTodo);
    }
    main().catch(console.error);
    
}




const getTodoTitleModel = async (title, user_id) => {
    async function main() {
        const todoTitle = await TodoModel.getTodoTitle(title, user_id);

        if (!todoTitle) {
            console.log("todoTitle not found!");
            return false;
        } else {
            return todoTitle;
        }
        
    }
    return await main();
}

const deleteTodoModel = async (user_id, todo_id) => {
    async function main() {
        const isTodoDeleted = await TodoModel.deleteTodo(user_id, todo_id);

        console.log("todo Deleted Successfully!", isTodoDeleted.command);        
    }
    main().catch(console.error);
}


const updateTodoModel = async (user_id, todo_id, title, content) => {
    async function main() {
        const isTodoUpdated = await TodoModel.updateTodo(user_id, todo_id, title, content);

        console.log("todo updated Successfully!");        
    }
    main().catch(console.error);
}



export {
    createUserModel,
    searchUserModel,
    matchUserModel,
    getUserIdModel,
    getUserTodosModel,
    createTodoModel,
    getTodoTitleModel,
    deleteTodoModel,
    updateTodoModel
}