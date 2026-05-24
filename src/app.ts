import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/users.routes";
import departmentRoutes from "./modules/departments/departments.routes";
import expenseRoutes from "./modules/expenses/expenses.routes";
import approvalRoutes from "./modules/apporvals/approvals.routes";
import budgetRoutes from "./modules/budgets/budgets.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import s3Routes from "./modules/s3/s3.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "FlowLedger API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/s3", s3Routes);

export default app;
