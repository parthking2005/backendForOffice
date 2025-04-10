import jwt from "jsonwebtoken";

export const getUserId = async (req, res, next) => {
    let {authorization} = await req.headers;
    if (!authorization) {
        return{statusCode:401, message:"token Expired"}
    }
    try {
        const BearerRemove = authorization.replace("Bearer ", "")
        const decodedToken = jwt.verify(BearerRemove, process.env.REFRESH_TOKEN_SECRET)
        const user_id = decodedToken?.user_id
        req.userid = user_id;
        next()
    } catch (error) {
        console.log(error)
        req.userid=null
        next()
    }
}