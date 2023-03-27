import { Request, Response } from "express"
import { IContactRequest } from "../interface/contact/contactInterface"
import { createContactService } from "../services/contacts/createContact.service"
import { deleteContactService } from "../services/contacts/deleteContact.service"
import { listContactsByUserService } from "../services/contacts/listContactsByUser.service"
import { listPagesService } from "../services/contacts/listPage.service"
import { updateContactService } from "../services/contacts/updateContact.service"

const createContactController = async (req: Request, res: Response): Promise<Response> => {
    
    const contactData: IContactRequest = req.body
    const userId: string  = req.user.id

    const createContact = await createContactService(contactData, userId)

    return res.status(201).json(createContact)
}

const updateContactController = async (req: Request, res: Response): Promise<Response> => {

    const contactData: IContactRequest = req.body
    const contactId: number = parseInt(req.params.id)
    const userId: string = req.user.id

    const updateContact = await updateContactService(contactData, contactId, userId)

    return res.status(200).json(updateContact)
}

const deleteContactController = async (req: Request, res: Response): Promise<Response> => {

    const contactId: number = parseInt(req.params.id)

    const deleteContact = await deleteContactService(contactId)

    return res.status(204).json(deleteContact)
}

const listContactsByUserController = async (req: Request, res: Response): Promise<Response> => {

    const userId: string = req.params.id

    const listContacts = await listContactsByUserService(userId)

    return res.status(200).json(listContacts)
}

const listPagesController = async (req: Request, res: Response): Promise<Response> => {

    const pageId: number = parseInt(req.params.id)

    const listPage = await listPagesService(pageId)

    return res.status(200).json(listPage)
}

export { 
    createContactController,
    updateContactController,
    deleteContactController,
    listContactsByUserController,
    listPagesController,
 }