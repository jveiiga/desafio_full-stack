import { Router } from "express"
import { createContactController, deleteContactController, listContactsByUserController, listPagesController, updateContactController } from "../controllers/contacts.controller"
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.Middleware"

const contactRoutes: Router = Router()

contactRoutes.post(
    "",
    ensureAuthMiddleware,
    createContactController,
)

contactRoutes.patch(
    "/:id",
    ensureAuthMiddleware,
    updateContactController,
)

contactRoutes.delete(
    "/:id",
    ensureAuthMiddleware,
    deleteContactController,
)

contactRoutes.get(
    "/users/:id",
    // ensureAuthMiddleware,
    listContactsByUserController
)

contactRoutes.get(
    "/:id",
    // ensureAuthMiddleware,
    listPagesController
)

export { contactRoutes }