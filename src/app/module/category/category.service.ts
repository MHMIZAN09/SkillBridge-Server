import { prisma } from "../../lib/prisma";
import type {
	ICategoryCreatePayload,
	ICategoryUpdatePayload,
} from "./category.interface";

const getAllCategories = async () => {
	const categories = await prisma.category.findMany();
	return categories;
};

const getCategoryById = async (categoryId: string) => {
	const category = await prisma.category.findUnique({
		where: {
			id: categoryId,
		},
	});
	return category;
};

const createCategory = async (payload: ICategoryCreatePayload) => {
	const { name, description, iconUrl } = payload;

	if (!name) {
		throw new Error("Category name is required");
	}

	const existingCategory = await prisma.category.findUnique({
		where: {
			name: name,
		},
	});
	if (existingCategory) {
		throw new Error("Category with this name already exists");
	}

	const category = await prisma.category.create({
		data: {
			name,
			description,
			iconUrl,
		},
	});
	return category;
};

const updateCategory = async (
	categoryId: string,
	payload: ICategoryUpdatePayload,
) => {
	const { name, description, iconUrl } = payload;

	if (!name) {
		throw new Error("Category name is required");
	}

	const existNameCategory = await prisma.category.findUnique({
		where: {
			name: name,
		},
	});
	if (existNameCategory) {
		throw new Error("Category with this name already exists");
	}

	const category = await prisma.category.update({
		where: {
			id: categoryId,
		},
		data: {
			name,
			description,
			iconUrl,
		},
	});
	return category;
};

const deleteCategory = async (categoryId: string) => {
	const category = await prisma.category.delete({
		where: {
			id: categoryId,
		},
	});
	return category;
};

export const CategoryService = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
