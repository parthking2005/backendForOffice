import jwt from "jsonwebtoken";


export const jwtTokenGenerate = async (id) => {

    return jwt.sign(
        {
            user_id: id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}