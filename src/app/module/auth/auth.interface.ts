import type { Role } from "../../../generated/prisma/enums";

export interface IUserRegisterPayload {
	name: string;
	email: string;
	password: string;
	role: Role;
}

export interface IUserLoginPayload {
	email: string;
	password: string;
}

export interface IRequestUser {
	userId: string;
	email: string;
	name: string;
	role: Role;
}
