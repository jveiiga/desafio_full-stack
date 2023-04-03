import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { userByIdSchema } from "../../schema/user/schemaUser"

const listUserByIdService = async (userId: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ id: userId})

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const returnedUser = await userByIdSchema.validate(
        user,
        {
            stripUnknown: true,
        }
    )
    return returnedUser
}

export { listUserByIdService }