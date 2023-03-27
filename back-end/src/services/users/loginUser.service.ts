import { compare } from "bcryptjs"
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserLogin } from "../../interface/user/userInterface"
import jwt from "jsonwebtoken"

const loginUserService = async ({ email, password }: IUserLogin): Promise<string> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: email
    })
 
    if (!user) {
        throw new AppError("Wrong email or password", 401);
    }

    const checkPassword = await compare(password, user.password)
    
    if (!checkPassword) {
        throw new AppError("Wrong email or password", 401)
    }

    const token = jwt.sign({
        email: user.email,
    },
    process.env.SECRET_KEY!,
    {
        subject: user.id,
        expiresIn: "24h"
    })
    return token
}

export { loginUserService }