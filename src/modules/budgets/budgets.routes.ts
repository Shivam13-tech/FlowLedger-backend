import { Router } from "express";
import * as controller from "./budgets.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/rbac.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN"), controller.upsertBudget);

router.get("/", authenticate, controller.getBudgets);

router.post("/summary", authenticate, controller.getBudgetSummary);

export default router;
