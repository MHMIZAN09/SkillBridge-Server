import { prisma } from "../../lib/prisma";
import type { IUserUpdatePayload } from "./user.interface";

const myProfile = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		omit: {
			password: true,
		},
		include: {
			tutorProfile: true,
		},
	});

	return user;
};

const updateProfile = async (userId: string, payload: IUserUpdatePayload) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: payload,
	});

	return updatedUser;
};

export const UserService = {
	myProfile,
	updateProfile,
};
