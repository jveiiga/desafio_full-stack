import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteUserSerializer = async (userId: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ id: userId})

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const deleteUser = await userRepository.delete(userId)

    return deleteUser
}

export { deleteUserSerializer }