import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserRequest, IUserResponse } from "../../interface/user/userInterface"
import { respUserSchema } from "../../schema/user/schemaUser"

const createUserService = async (userData: IUserRequest): Promise<IUserResponse> => {

    const userRepository = AppDataSource.getRepository(User)

    const user: User = userRepository.create(userData)

    await userRepository.save(user)

    const newUser = await respUserSchema.validate(user, { stripUnknown: true})

    return newUser
}

export { createUserService }