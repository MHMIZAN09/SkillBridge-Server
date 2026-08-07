import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "./../../middleware/checkAuth";
import { SkillController } from "./skill.controller";

const router = Router();

router.get("/", SkillController.getAllSkills);
router.get("/:id", SkillController.getSkillById);

// admin routes
router.post("/", auth(Role.ADMIN), SkillController.createSkill);
router.put("/:id", auth(Role.ADMIN), SkillController.updateSkill);
router.patch(
	"/:id/status",
	auth(Role.ADMIN),
	SkillController.updateSkillStatus,
);
router.delete("/:id", auth(Role.ADMIN), SkillController.deleteSkill);

export const skillRoutes = router;
