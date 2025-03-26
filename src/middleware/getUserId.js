import jwt from "jsonwebtoken";

export const getUserId = async (req, res, next) => {
    let {authorization} = await req.headers;
    const BearerRemove = authorization.replace("Bearer ", "")
    const {user_id} = jwt.decode(BearerRemove)
    req.userid = user_id;
    next()
}