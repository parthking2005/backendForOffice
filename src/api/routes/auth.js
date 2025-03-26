import { Router } from "express";
import { register, login } from "../controllers/user.js";
import { upload } from "../../middleware/multer.js";

const router = Router()

router.route("/register").post(
    upload.single("profileimg"),
    register
)

router.route("/login").post(
    login
)

export {router}