import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IContactInfo } from "../../interface/contact/contactInterface"
import { contactsByUserListSchema } from "../../schema/contact/schemaContact"

const listContactsByUserService = async (userId: string): Promise<IContactInfo[] | undefined> => {
    
    const userRepository = AppDataSource.getRepository(User)

    const userList = await userRepository.findOne({
        where: { id: userId },
        relations: {contacts: true}
    })

    const returnedList = await contactsByUserListSchema.validate(
        userList?.contacts,
        {
            stripUnknown: true,
        }
    )
    return returnedList
}

export { listContactsByUserService }