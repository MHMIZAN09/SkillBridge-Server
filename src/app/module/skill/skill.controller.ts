import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllSkills = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Skills retrieved successfully",
			data: "",
		});
	},
);

const getSkillById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Skill retrieved successfully",
			data: "",
		});
	},
);

const createSkill = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: "Skill created successfully",
			data: "",
		});
	},
);

const updateSkill = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Skill updated successfully",
			data: "",
		});
	},
);

const updateSkillStatus = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Skill status updated successfully",
			data: "",
		});
	},
);

const deleteSkill = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Skill deleted successfully",
			data: "",
		});
	},
);

export const SkillController = {
	getAllSkills,
	getSkillById,
	createSkill,
	updateSkill,
	updateSkillStatus,
	deleteSkill,
};
