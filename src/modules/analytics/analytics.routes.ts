import { Router } from "express";
import * as controller from "./analytics.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", authenticate, controller.getDashboard);

export default router;
