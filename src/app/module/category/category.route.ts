import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "./../../middleware/checkAuth";
import { CategoryController } from "./category.controller";

const router = Router();

// public routes
router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);

// admin routes
router.post("/", auth(Role.ADMIN), CategoryController.createCategory);
router.patch("/:id", auth(Role.ADMIN), CategoryController.updateCategory);
router.delete("/:id", auth(Role.ADMIN), CategoryController.deleteCategory);

export const categoryRoutes = router;
