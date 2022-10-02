import { Router } from "express";

import { UpdateUser as updateUser } from "../Middlewares/UpdateUser.js";
import { DeleteUser as deleteUser } from "../Middlewares/DeleteUser.js";
import { GetUser as getUser } from "../Middlewares/GetUser.js";
import { Auth as auth } from "../Middlewares/Auth.js";
import { Login as login } from "../Middlewares/Login.js";

const router = Router();

router.get("/auth/:user", auth);
router.get("/:user", auth, getUser);
router.post("/login", login);
router.delete("/:user", auth, deleteUser);
router.put("/:user", auth, updateUser);

export default router;