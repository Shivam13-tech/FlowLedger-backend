import { Router } from "express";
import * as controller from "./approvals.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/rbac.middleware";

const router = Router();

/* Manager Dashboard */
router.get(
  "/pending",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  controller.getPending,
);

/* Approve */
router.patch(
  "/:id/approve",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  controller.approve,
);

/* Reject */
router.patch(
  "/:id/reject",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  controller.reject,
);

export default router;
