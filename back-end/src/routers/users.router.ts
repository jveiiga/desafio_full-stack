import { Router } from "express";
import { 
    createUserController,
    updateUserController,
    deleteUserController,
} from "../controllers/users.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.Middleware";

const userRoutes: Router = Router()

userRoutes.post("", createUserController)

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

export { userRoutes }