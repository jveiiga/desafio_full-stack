import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IContactInfo, IContactUpdate } from "../../interface/contact/contactInterface"
import { returnedInfoContactSchema } from "../../schema/contact/schemaContact"

const updateContactService = async (contactData: IContactUpdate, contactId: number, userId: string): Promise<IContactInfo> => {

    const contactRepository = AppDataSource.getRepository(Contact)

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ id: userId })

    if (!user) {
        throw new AppError("user not found", 404);
    }

    const contact = await contactRepository.findOne({ 
        where: { id: contactId, user: { id: userId} }
    })
    
    if (!contact) {
        throw new AppError("contact not found", 404);
    }

    const { email, name, phone } = contactData

    const updateContact = contactRepository.create({
        ...contact,
        email: email || contact.email,
        name: name || contact.name,
        phone: phone || contact.phone
    })

    await contactRepository.save(updateContact)

    const returnedContact = returnedInfoContactSchema.validate(
        updateContact,
        {
            stripUnknown: true,
        }
    )

    return returnedContact
} 

export { updateContactService }