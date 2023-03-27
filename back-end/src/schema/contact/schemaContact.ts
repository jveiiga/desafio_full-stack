import * as yup from "yup"
import { Schema } from "yup";
import { IContactInfo } from "../../interface/contact/contactInterface";
import { respUserSchema } from "../user/schemaUser";

const returnedInfoContactSchema: Schema<IContactInfo> = yup.object().shape({
    createdAt: yup.date(),
    phone: yup.string().required(),
    email: yup.string().email(),
    name: yup.string().max(50),
    id: yup.number(),
    // user: respUserSchema
})

const returnedContactSchema: Schema<IContactInfo> = yup.object().shape({
    createdAt: yup.date(),
    phone: yup.string().required(),
    email: yup.string().email(),
    name: yup.string().max(50),
    // user: respUserSchema
})

const contactsByUserListSchema: Schema<IContactInfo[]> = yup.array(
    returnedInfoContactSchema
)

export {
    returnedInfoContactSchema,
    returnedContactSchema,
    contactsByUserListSchema,
}