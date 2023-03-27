

export interface IUserResponse {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    createdAt?: Date;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    name: string;
	email: string,
	password: string, 
	phone: string,
}
