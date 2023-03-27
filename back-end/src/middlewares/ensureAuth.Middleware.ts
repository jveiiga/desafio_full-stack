import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    token = token.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if (error) {
            return res.status(401).json({
                message: error.message
            })
        }

        req.user = {
            id: String(decoded.sub),
            name: decoded.name,
            email: decoded.email,
            createdAt: decoded.createdAt
        }
    })
    return next()
}

export { ensureAuthMiddleware }