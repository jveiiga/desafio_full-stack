import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { IContactInfo, IContactRequest } from "../../interface/contact/contactInterface";
import { returnedInfoContactSchema } from "../../schema/contact/schemaContact";

const createContactService = async (contactData: IContactRequest, userId: string): Promise<IContactInfo> => {

    const { name, email, phone } = contactData

    const contactRepository = AppDataSource.getRepository(Contact)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ id: userId })

    const contact = contactRepository.create({
        name: name,
        email: email,
        phone: phone,
        user: user!,
    })

    await contactRepository.save(contact)

    const returnedContacts = await returnedInfoContactSchema.validate(
        contact,
        {
            stripUnknown: true,
        }
    )
    return returnedContacts
}

export { createContactService }