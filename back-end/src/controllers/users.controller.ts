import {Request, Response} from "express"
import { IUserLogin, IUserRequest, IUserUpdate } from "../interface/user/userInterface"
import { createUserService } from "../services/users/createUser.service"
import { deleteUserSerializer } from "../services/users/deleteUser.service"
import { loginUserService } from "../services/users/loginUser.service"
import { updateUserService } from "../services/users/updateUser.service"
import { listUserByIdService } from "../services/users/listUserById.service"

const createUserController = async (req: Request, res: Response): Promise<Response>  => {

    const userData: IUserRequest = req.body
    const createUser = await createUserService(userData)

    return res.status(201).json(createUser)
}

const loginUserController = async (req: Request, res: Response): Promise<Response>  => {

    const loginData: IUserLogin = req.body
    const tokenUser = await loginUserService(loginData)

    return res.status(200).json( tokenUser )
}

const updateUserController = async (req: Request, res: Response): Promise<Response>  => {
   
    const userData: IUserUpdate = req.body
    const userId: string = req.params.id
    const updateUser = await updateUserService(userData, userId)

    return res.status(200).json(updateUser)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response>  => {

    const userId: string = req.params.id
    const deleteUser = await deleteUserSerializer(userId)

    return res.status(204).json(deleteUser)
}

const listUserByIdController = async (req: Request, res: Response) => {

    const userId: string = req.params.id
    const listUser = await listUserByIdService(userId)

    return res.status(200).json(listUser)
}

export { 
    loginUserController,
    createUserController,
    updateUserController,
    deleteUserController,
    listUserByIdController,
 }
