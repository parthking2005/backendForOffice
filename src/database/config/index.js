
import { con } from '../../config/database.js';


const connectDB = async () => {
    try {
        await con.connect();
    } catch (error) {
        console.log(error.message);
    }
}


// module.exports = {connectDB};

export default connectDB;

export {con}