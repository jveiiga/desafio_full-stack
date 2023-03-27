import express, { Application } from "express"
import "express-async-errors"
import "reflect-metadata"
import { errorIdentify } from "./errors/appError"
import { contactRoutes } from "./routers/contacts.router"
import { loginRouter } from "./routers/login.router"
import { userRoutes } from "./routers/users.router"
import cors from "cors"

export const app: Application = express()

app.use(express.json())

app.use(cors())

app.use("/login", loginRouter)

app.use("/users", userRoutes)

app.use("/contacts", contactRoutes)

app.use(errorIdentify)