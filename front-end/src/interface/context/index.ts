import { IUserLogin, IUserRegister } from "../user/userInterface";
import { IContacCreate, IContactUpdate } from "../contact/contactInterface" 

export interface AuthProviderData {
    login: (userData: IUserLogin) => void
}

export interface UserProviderData {
    registerUser: (userData: IUserRegister) => void
    updateUser: (userData: IUserRegister) => void
    deleteUser: () => void
}

export interface ContactProviderData {
    registerContact: (contactData: IContacCreate) => void
    updateContatc: (contactData: IContactUpdate) => void
    deleteContact: () => void
    setContactId: React.Dispatch<React.SetStateAction<number>>
}

