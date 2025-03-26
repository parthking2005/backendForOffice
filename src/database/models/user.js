import { con } from "../config/index.js";


const UserModel = {
    async createUser(user_id, username, email, profileimg, password) {
      const query = `INSERT INTO users (user_id, username, email, profileimg, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [user_id, username, email, profileimg, password];
      const { rows } = await con.query(query, values);
      return rows[0];
    },
    async searchUser(username, email) {
      const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
      const values = [username, email];
      const { rows } = await con.query(query, values);
      return rows[0];
    },
    async getUserId(entereduser) {
      const query = 'SELECT user_id FROM users WHERE username = $1 OR email = $1';
      const values = [entereduser];
      const { rows } = await con.query(query, values);
      return rows[0];
    },
    async matchUser(entereduser) {
      const query = 'SELECT password FROM users WHERE username = $1 OR email = $1';
      const values = [entereduser];
      const { rows } = await con.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    },
    
}

export {UserModel}