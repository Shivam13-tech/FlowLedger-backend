import { Request, Response } from "express";
import * as service from "./budgets.service";

interface AuthRequest extends Request {
  user?: any;
}

export const upsertBudget = async (req: AuthRequest, res: Response) => {
  const budget = await service.upsertBudget(req.body);

  res.status(201).json({
    success: true,
    data: budget,
  });
};

export const getBudgets = async (req: AuthRequest, res: Response) => {
  const budgets = await service.getBudgets(req.user.orgId);

  res.json({
    success: true,
    data: budgets,
  });
};

export const getBudgetSummary = async (req: AuthRequest, res: Response) => {
  const summary = await service.getBudgetSummary(req.body);

  if (!summary) {
    return res.status(404).json({
      success: false,
      message: "Budget not found for given parameters",
    });
  }

  const limit = Number(summary.monthly_limit || 0);
  const spent = Number(summary.total_spent || 0);

  res.json({
    success: true,
    data: {
      budget: limit,
      spent,
      remaining: limit - spent,
      overBudget: spent > limit,
    },
  });
};
