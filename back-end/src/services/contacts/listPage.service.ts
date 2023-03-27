import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"
import { returnedContactSchema } from "../../schema/contact/schemaContact"

const listPagesService = async (pageId: number) => {

    const contactRepository = AppDataSource.getRepository(Contact)

    const contact  = await contactRepository.findOneBy({ id: pageId })

    if(!contact) {
        throw new AppError("contact not found", 404);
        
    }

    const returnedContact = await returnedContactSchema.validate(
        contact,
        {
            stripUnknown: true
        }
    )
    return returnedContact
}

export { listPagesService }