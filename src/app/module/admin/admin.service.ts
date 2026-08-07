import type { Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
	const users = await prisma.user.findMany();

	return users;
};

const getUserById = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		omit: {
			password: true,
		},
	});

	return user;
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
	const user = await prisma.user.update({
		where: {
			id: userId,
		},
		omit: {
			password: true,
		},
		data: {
			status,
		},
	});

	return user;
};

const updateUserRole = async (userId: string, role: Role) => {
	const user = await prisma.user.update({
		where: {
			id: userId,
		},
		omit: {
			password: true,
		},
		data: {
			role,
		},
	});

	return user;
};

const deleteUser = async (userId: string) => {
	const user = await prisma.user.delete({
		where: {
			id: userId,
		},
	});

	return user;
};

export const AdminService = {
	getAllUsers,
	getUserById,
	updateUserStatus,
	updateUserRole,
	deleteUser,
};
