import bcrypt from "bcryptjs";
import type { JwtPayload, SignOptions } from "jsonwebtoken";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import type {
	IRequestUser,
	IUserLoginPayload,
	IUserRegisterPayload,
} from "./auth.interface";

const registerUser = async (payload: IUserRegisterPayload) => {
	const { name, password, role } = payload;

	const email = payload.email.trim().toLowerCase();

	if (!name || !email || !password || !role) {
		throw new Error("All fields are required");
	}

	if (role === Role.ADMIN) {
		throw new Error("You are not allowed to register as an admin");
	}

	const isUserExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (isUserExists) {
		throw new Error("User with this email already exists");
	}

	const hashedPassword = await bcrypt.hash(
		password,
		Number(config.bcrypt_salt_rounds),
	);

	const createdUser = await prisma.$transaction(async (tx) => {
		// Create User
		const user = await tx.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role,
			},
			omit: {
				password: true,
			},
			include: {
				tutorProfile: true,
			},
		});

		// Create TutorProfile if role is TUTOR
		if (role === Role.TUTOR) {
			await tx.tutorProfile.create({
				data: {
					userId: user.id,

					// Default values from Prisma schema
					hourlyRate: 0,
					teachingLanguages: [],
					deliveryModes: [],
				},
			});
		}

		return user;
	});

	const { tutorProfile, ...user } = createdUser;
	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		user,
		tutorProfile,
		accessToken,
		refreshToken,
	};
};

const loginUser = async (payload: IUserLoginPayload) => {
	const { password } = payload;
	const email = payload.email.trim().toLowerCase();

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new Error("User not found");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new Error("User is blocked");
	}

	const isPasswordMatched = await bcrypt.compare(password, user.password);

	if (!isPasswordMatched) {
		throw new Error("Invalid credentials");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

const getMe = async (user: IRequestUser) => {
	const isUserExists = await prisma.user.findUnique({
		where: {
			id: user.userId,
		},
		include: {
			tutorProfile: true,
		},
		omit: {
			password: true,
		},
	});

	if (!isUserExists) {
		throw new Error("User not found. Please login again.");
	}

	return isUserExists;
};

const refreshToken = async (token: string) => {
	const verifiedRefreshToken = jwtUtils.verifyToken(
		token,
		config.jwt_refresh_secret,
	);

	if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
		throw new Error(
			config.node_env === "development"
				? verifiedRefreshToken.error
				: "Invalid refresh token",
		);
	}

	const data = verifiedRefreshToken.data as JwtPayload;

	const user = await prisma.user.findUnique({
		where: { id: data.userId },
	});

	if (!user) {
		throw new Error("User not found. Please login again.");
	}

	const jwtPayload = {
		userId: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions,
	);

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions,
	);

	return {
		accessToken,
		refreshToken,
	};
};

export const AuthService = {
	registerUser,
	loginUser,
	getMe,
	refreshToken,
};
