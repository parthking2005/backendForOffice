import { Router } from "express";
import { register, login, updateUser, deleteUser, getUserDetails } from "../controllers/user.js";
import { upload } from "../../middleware/multer.js";
import { getUserId } from "../../middleware/getUserId.js";

const router = Router()

router.route("/register").post(
    upload.single("profile"),
    register
)

router.route("/login").post(
    login
)

router.route("/updateuser").put(
    upload.single("profile"),
    getUserId,
    updateUser

)

router.route("/deleteuser").delete(
    getUserId,
    deleteUser

)

router.route("/getuserdetails").get(
    getUserId,
    getUserDetails

)
export {router}