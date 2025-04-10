import { ApiError } from "../helper/Error.js";
import { TodoModel } from "./models/todo.js";
import { UserModel } from "./models/user.js";

const createUserModel = async (id, username, email, profileimg, password) => {
    async function main() {
        // Create a user

        try {
            const newUser = await UserModel.createUser(id, username, email, profileimg, password);
            console.log(newUser)
            return newUser
        } catch (error) {
            console.log(error)
            return{statusCode:400, message:"error in user creation"}
        }
    }
    const createUserModelResult = await main()
    return createUserModelResult
}

const searchUserModel = async (username, email) => {
    async function main() {
        // get a user
        try {
            const foundUser = await UserModel.searchUser(username, email);
            console.log(foundUser, "foundUser malu")
            if (foundUser) {
                console.log('User found! user is:', foundUser);
                return foundUser;
            } else {
                console.log("token expired");
                return null;
            }
        } catch (error) {
            console.log(error)
            return{statusCode:403, message:"something error in founding user"}
        }
    }
    const searchUserModelResult = await main().catch(console.error);
    return searchUserModelResult
}

const matchUserModel = async (entereduser) => {
    async function main() {
        // get a user
        const user = await UserModel.matchUser(entereduser);

        if (!user) {
            console.log("token expired!");
            return false;
        } else {
            return user
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
            console.log("token expired!");
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
       try {
         const foundTodos = await TodoModel.getUserTodos(user_id);
         if (foundTodos) {
             return foundTodos;
         } else {
             console.log("todos not found");
             return {};
         }
       } catch (error) {
        console.log(error)
        return {};
       }
    }
    return await main().catch(console.error);
}

const getUserDetailesModel = async (user_id) => {
    async function main() {
        // get a user
       try {
         const foundUser = await UserModel.searchUserById(user_id);
         console.log("foundUser", foundUser)
         if (foundUser) {
             return foundUser;
         } else {
             console.log("token expired");
             return null;
         }
       } catch (error) {
        console.log(error)
        return null;
       }
    }
    return await main().catch(console.error);
}

const createTodoModel = async (user_id, todo_id, title, content, completed = false, created_at) => {
    async function main() {
        // Create a user

        const newTodo = await TodoModel.createTodo(user_id, todo_id, title, content, completed, created_at);
        console.log('Todo Created:', newTodo);
    }
    main().catch(console.error);
    
}




const getTodoTitleModel = async (title, user_id, todo_id) => {
    async function main() {
        const todoTitle = await TodoModel.getTodoTitle(title, user_id, todo_id);

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


const updateUserModel = async (username, email, profileimg, user_id) => {
    console.log(profileimg, "profileimg in update model dbservices")
    async function main() {
        const isUserUpdated = await UserModel.updateUser(username, email, profileimg, user_id);
        console.log("isUserUpdated",isUserUpdated)
        if (isUserUpdated) {
            console.log("user updated Successfully!");        
            return isUserUpdated;
        }else{
            return null
        }
        // console.log(isUserUpdated)
    }
    return await main().catch(console.error);
}

const deleteUserModel = async (user_id) => {
    async function main() {
        const isUserDeleted = await UserModel.deleteUser(user_id);

        console.log("todo Deleted Successfully!", isUserDeleted.command);        
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
    updateTodoModel,
    updateUserModel,
    deleteUserModel,
    getUserDetailesModel
}