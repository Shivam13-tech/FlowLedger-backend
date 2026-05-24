import { Router } from "express";
import * as controller from "./users.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/rbac.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPER_ADMIN"),
  controller.createUser,
);

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER", "SUPER_ADMIN"),
  controller.getUsers,
);

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER", "SUPER_ADMIN"),
  controller.getUser,
);

router.patch(
  "/:id/deactivate",
  authenticate,
  authorize("ADMIN"),
  controller.deactivateUser,
);

export default router;
