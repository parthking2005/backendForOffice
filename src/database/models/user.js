import { con } from "../../database/config/index.js";
import { ApiError } from "../../helper/Error.js";


const UserModel = {
    async createUser(user_id, username, email, profileimg, password) {
      try {
        const query = `INSERT INTO users (user_id, username, email, profileimg, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [user_id, username, email, profileimg, password];
        const { rows } = await con.query(query, values);
        return rows[0];
      } catch (error) {
        console.log(error)
        return{statusCode:403,message:"user already exist"}
      }
    },
    async searchUser(username=null, email=null) {
      console.log(username, email, "in searchUser username and email")
      try {
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const values = [username, email];
        const { rows } = await con.query(query, values);
        return rows[0];
      } catch (error) {
        console.log(error)
        return{statusCode:403, message:"error in searching user"}
      }
    },
    async searchUserById(user_id) {
      console.log(user_id, "in searchUser username and email")
      try {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [user_id];
        const { rows } = await con.query(query, values);
        return rows[0];
      } catch (error) {
        console.log(error)
        return{statusCode:404, message:"error in searching user"}
      }
    },
    async getUserId(entereduser) {
      try {
        const query = 'SELECT user_id FROM users WHERE username = $1 OR email = $1';
        const values = [entereduser];
        const { rows } = await con.query(query, values);
        return rows[0];
      } catch (error) {
        console.log(error)
        return{statusCode:403, message:"something issue in getting user id"}
      }
    },
    async matchUser(entereduser) {
      try {
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $1';
        const values = [entereduser];
        const { rows } = await con.query(query, values);
        return rows.length > 0 ? rows[0] : null;
      } catch (error) {
        console.log(error)
        return{statusCode:403, message:"token expired"}
      }
    },
    async updateUser(username = null, email = null, profileimg = null, user_id) {
      if (profileimg === "") {
        profileimg = null;
      }
      try {
        const query = 'update users set username = coalesce($1, username), email = coalesce($2, email), profileimg = coalesce($3, profileimg) WHERE user_id = $4 RETURNING *';
        const values = [username, email, profileimg, user_id];
        const { rows } = await con.query(query, values);
        console.log(rows.length, rows, "===============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        return rows;
      } catch (error) {
        console.log(error)
        return{statusCode:403, message:"token expired"}
      }
    },
    async deleteUser(user_id) {
      try {
        const query = 'delete FROM users WHERE user_id = $1';
        const values = [user_id];
        const userDelete = await con.query(query, values);
        return userDelete;
      } catch (error) {
        console.log(error)
        return{statusCode:403, message:"token expired"}
      }
    },

    
}

export {UserModel}