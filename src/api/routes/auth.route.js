import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router()

router.route("/register").get(register)
router.route("/login").get(login)

export {router}