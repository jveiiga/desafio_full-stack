import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"

const deleteContactService = async (contactId: number) => {

    const contactRepository = AppDataSource.getRepository(Contact)

    const deleteContact = await contactRepository.delete(contactId)

    return deleteContact
}

export { deleteContactService }