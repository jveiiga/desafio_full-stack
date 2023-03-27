import { IUserResponse } from "../user/userInterface";

export interface IContact {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    user: IUserResponse;
}

export interface IContactRequest {
    name: string;
    email: string;
    phone: string;
}

export interface IContactUpdate {
    name: string;
    email: string;
    phone: string;
}

export interface IContactInfo {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
}