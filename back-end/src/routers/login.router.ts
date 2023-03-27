import { Router } from "express"
import { loginUserController } from "../controllers/users.controller" 

const loginRouter: Router = Router()

loginRouter.post("", loginUserController)

export { loginRouter }