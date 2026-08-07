import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const getAllCategories = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const result = await CategoryService.getAllCategories();
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Categories retrieved successfully",
			data: result,
		});
	},
);

const getCategoryById = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryId = req.params.id;
		const result = await CategoryService.getCategoryById(categoryId as string);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Category retrieved successfully",
			data: result,
		});
	},
);

const createCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body;
		const result = await CategoryService.createCategory(payload);
		sendResponse(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: "Category created successfully",
			data: result,
		});
	},
);

const updateCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryId = req.params.id;
		const payload = req.body;
		const result = await CategoryService.updateCategory(
			categoryId as string,
			payload,
		);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Category updated successfully",
			data: result,
		});
	},
);

const deleteCategory = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const categoryId = req.params.id;
		const result = await CategoryService.deleteCategory(categoryId as string);
		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Category deleted successfully",
			data: result,
		});
	},
);

export const CategoryController = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
