import { Router } from "express";
import * as controller from "./departments.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/rbac.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN"), controller.createDepartment);

router.get("/", authenticate, controller.getDepartments);

router.get("/:id", authenticate, controller.getDepartment);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.updateDepartment,
);

export default router;
