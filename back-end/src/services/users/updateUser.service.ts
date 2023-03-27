import { hash } from "bcryptjs"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUser, IUserUpdate } from "../../interface/user/userInterface"
import { respUserSchema } from "../../schema/user/schemaUser"


const updateUserService = async (userData: IUserUpdate, userId: string): Promise<IUser> => {
    const { name, email, password, phone  } = userData

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ id: userId})

    if (!user) {
        throw new AppError("User not found", 404)
    }

    await userRepository.update(userId, {
        name: name ? name : user.name,
        email: email ? email : user.email,
        password: password ? await hash(password, 10) : user.password,
        phone: phone ? phone : user.phone,
    })

    const findUser = await userRepository.findOneBy({ id: userId })

    const userResponse  = await respUserSchema.validate(findUser, {
        stripUnknown: true,
    })

    return userResponse
}

export { updateUserService }