import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/users", AdminController.getAllUsers);
router.get("/users/:id", AdminController.getUserById);

router.patch("/users/:id/status", AdminController.updateUserStatus);
router.patch("/users/:id/role", AdminController.updateUserRole);
router.delete("/users/:id", AdminController.deleteUser);

export const adminRoutes = router;
