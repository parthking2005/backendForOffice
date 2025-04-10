import { con } from "../config/index.js";


const TodoModel = {
    async createTodo(user_id, todo_id, title, content, completed, created_at) {
      const query = `INSERT INTO todos (user_id, todo_id, title, content, completed, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [user_id, todo_id, title, content, completed, created_at];
      const { rows } = await con.query(query, values);
      return rows[0];
    },
    async getUserTodos(user_id) {
      const query = 'SELECT * FROM todos WHERE user_id = $1 order by created_at';
      const values = [user_id];
      const { rows } = await con.query(query, values);
      return rows;
    },
    async getTodoTitle(title, user_id, todo_id=0) {
      const query = 'SELECT title FROM todos WHERE title = $1 AND user_id = $2 AND todo_id != $3';
      const values = [title, user_id, todo_id];
      const { rows } = await con.query(query, values);
      return rows[0];
    },
    async deleteTodo(user_id, todo_id) {
      const query = 'delete FROM todos WHERE user_id = $1 AND todo_id = $2';
      const values = [user_id, todo_id];
      const todoDelete = await con.query(query, values);
      return todoDelete;
    },
    async updateTodo(user_id, todo_id, title = null, content = null) {
      const query = 'update todos SET title = coalesce($3, title), content = coalesce($4, content) WHERE user_id = $1 AND todo_id = $2';
      const values = [user_id, todo_id, title, content];
      const {rows} = await con.query(query, values);
      return rows[0];
    },
    
}

export {TodoModel}