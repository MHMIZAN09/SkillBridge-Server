import { prisma } from "../../lib/prisma";
import type {
	ISubjectCreatePayload,
	ISubjectUpdatePayload,
} from "./skill.interface";

const getAllSkills = async () => {
	const skills = await prisma.subject.findMany({
		where: {
			isActive: true,
		},
	});

	return skills;
};

const getSkillById = async (id: string) => {
	const skill = await prisma.subject.findUnique({
		where: {
			id,
			isActive: true,
		},
	});

	return skill;
};

const createSkill = async (
	categoryId: string,
	payload: ISubjectCreatePayload,
) => {
	const { name, description } = payload;

	const category = await prisma.category.findUnique({
		where: {
			id: categoryId,
			isActive: true,
		},
	});

	if (!category) {
		throw new Error("Category not found");
	}

	const skill = await prisma.subject.create({
		data: {
			name,
			description,
			categoryId,
		},
	});
	return skill;
};

const updateSkill = async (
	id: string,
	categoryId: string,
	payload: ISubjectUpdatePayload,
) => {
	const { name, description } = payload;

	const category = await prisma.category.findUnique({
		where: {
			id: categoryId,
			isActive: true,
		},
	});

	if (!category) {
		throw new Error("Category not found");
	}

	const skill = await prisma.subject.update({
		where: {
			id,
			isActive: true,
		},
		data: {
			name,
			description,
			categoryId,
		},
	});
	return skill;
};

const updateSkillStatus = async (id: string, isActive: boolean) => {
	const skill = await prisma.subject.update({
		where: {
			id,
		},
		data: {
			isActive,
		},
	});
	return skill;
};

const deleteSkill = async (id: string) => {
	const skill = await prisma.subject.delete({
		where: {
			id,
		},
	});
	return skill;
};

export const SkillService = {
	getAllSkills,
	getSkillById,
	createSkill,
	updateSkill,
	updateSkillStatus,
	deleteSkill,
};
