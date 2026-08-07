import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const myProfile = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.user?.userId;

		const user = await UserService.myProfile(userId as string);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User profile retrieved successfully",
			data: user,
		});
	},
);

const updateProfile = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.user?.userId;
		const payload = req.body;

		const user = await UserService.updateProfile(userId as string, payload);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User profile updated successfully",
			data: user,
		});
	},
);

export const UserController = {
	myProfile,
	updateProfile,
};
