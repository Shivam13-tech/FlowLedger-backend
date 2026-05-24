import { Request, Response } from "express";
import * as service from "./expenses.service";

interface AuthRequest extends Request {
  user?: any;
}

export const createExpense = async (req: AuthRequest, res: Response) => {
  const expense = await service.createExpense(req.body, req.user);

  res.status(201).json({
    success: true,
    data: expense,
  });
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const expenses = await service.getExpenses(req.user.orgId);

  res.json({
    success: true,
    data: expenses,
  });
};

export const getExpense = async (req: AuthRequest, res: Response) => {
  const expense = await service.getExpense(
    req.user.orgId,
    req.params.id as string,
  );

  res.json({
    success: true,
    data: expense,
  });
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  const expense = await service.updateExpense(
    req.user.orgId,
    req.params.id as string,
    req.body,
  );

  res.json({
    success: true,
    data: expense,
  });
};

export const submitExpense = async (req: AuthRequest, res: Response) => {
  const expense = await service.submitExpense(
    req.user.orgId,
    req.params.id as string,
  );

  res.json({
    success: true,
    data: expense,
  });
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const expense = await service.deleteExpense(
    req.user.orgId,
    req.params.id as string,
  );

  res.json({
    success: true,
    data: expense,
  });
};
