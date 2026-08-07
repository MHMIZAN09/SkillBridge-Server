import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const users = await AdminService.getAllUsers();

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Users retrieved successfully",
			data: users,
		});
	},
);

const getUserById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const user = await AdminService.getUserById(userId as string);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User retrieved successfully",
			data: user,
		});
	},
);

const updateUserStatus = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const { status } = req.body;
		const user = await AdminService.updateUserStatus(userId as string, status);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User status updated successfully",
			data: user,
		});
	},
);

const updateUserRole = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const { role } = req.body;
		const user = await AdminService.updateUserRole(userId as string, role);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User role updated successfully",
			data: user,
		});
	},
);

const deleteUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.id;
		const user = await AdminService.deleteUser(userId as string);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "User deleted successfully",
			data: user,
		});
	},
);

export const AdminController = {
	getAllUsers,
	getUserById,
	updateUserStatus,
	updateUserRole,
	deleteUser,
};
