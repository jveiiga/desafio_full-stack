import * as yup from "yup"
import { Schema } from "yup";
import { IUserRequest, IUserResponse } from "../../interface/user/userInterface";

const respUserSchema: Schema<IUserResponse> = yup.object().shape({
    createdAt: yup.date().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    id: yup.string().notRequired(),
});

const userSchema: Schema<IUserRequest> = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    name: yup.string().required(),
});

export { 
    respUserSchema,
    userSchema,
 }