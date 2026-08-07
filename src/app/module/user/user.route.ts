import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { UserController } from "./user.controller";

const router = Router();

router.get(
	"/my-profile",
	auth(Role.ADMIN, Role.STUDENT, Role.TUTOR),
	UserController.myProfile,
);

router.patch(
	"/update-profile",
	auth(Role.ADMIN, Role.STUDENT, Role.TUTOR),
	UserController.updateProfile,
);

export const UserRoutes = router;
