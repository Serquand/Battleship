import { Router } from "express";

import updateUser from "../Middlewares/Profil/UpdateUser.js";
import deleteUser from "../Middlewares/Profil/DeleteUser.js";
import getUser from "../Middlewares/Profil/GetUser.js";
import auth from "../Middlewares/Profil/Auth.js";
import login from "../Middlewares/Profil/Login.js";

const routerProfil = Router();

routerProfil.get("/auth/:user", auth, (req, res) => res.status(200).json({ information: "Successfully connected !" }));
routerProfil.get("/:user", auth, getUser);
routerProfil.post("/login", login);
routerProfil.delete("/:user", auth, deleteUser);
routerProfil.put("/:user", auth, updateUser);

export default routerProfil;