import { Router } from "express";
import * as controller from "./expenses.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/rbac.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("EMPLOYEE", "ADMIN"),
  controller.createExpense,
);

router.get("/", authenticate, controller.getExpenses);

router.get("/:id", authenticate, controller.getExpense);

router.put("/:id", authenticate, controller.updateExpense);

router.patch("/:id/submit", authenticate, controller.submitExpense);

router.delete("/:id", authenticate, controller.deleteExpense);

export default router;
