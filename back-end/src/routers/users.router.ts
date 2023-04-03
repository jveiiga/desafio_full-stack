import { Router } from "express"
import { 
    createUserController,
    updateUserController,
    deleteUserController,
    listUserByIdController,
} from "../controllers/users.controller"
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.Middleware"


const userRoutes: Router = Router()

userRoutes.post(
    "",
    createUserController
)

userRoutes.patch(
    "/:id",
    ensureAuthMiddleware,
    updateUserController
)

userRoutes.delete(
    "/:id",
    ensureAuthMiddleware,
    deleteUserController,
)

userRoutes.get(
    "/:id",
    listUserByIdController,
)

export { userRoutes }