import { Router } from "express";
import { adminRoutes } from "../module/admin/admin.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { categoryRoutes } from "../module/category/category.route";
import { UserRoutes } from "../module/user/user.route";
import { tutorRoutes } from "../module/tutor/tutor.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/admin", adminRoutes);
router.use("/categories", categoryRoutes);
router.use("/tutors", tutorRoutes);

router.use("skills");

export const indexRouter = router;
