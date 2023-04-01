import { IUserById, IUserResponse } from "../user/userInterface";


export interface IContact {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
    user?: IUserResponse;
}

export interface IContactPage {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
}

export interface IContacCreate {
    name: string;
    email: string;
    phone: string;
}

export interface IContactDele {
    
}

export interface IProps {
    contacts: IContact[];
    user: IUserById,
}

export interface IPropsCard {
    contacts: IContact;
}

export interface IPropsContact {
    contacts: IContactPage;
}

export interface IContactUpdate {
    name: string;
    email: string;
    phone: string;
}