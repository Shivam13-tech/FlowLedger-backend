import { Request, Response } from "express";
import * as service from "./approvals.service";

interface AuthRequest extends Request {
  user?: any;
}

export const getPending = async (req: AuthRequest, res: Response) => {
  const data = await service.getPendingApprovals(req.user.orgId);

  res.json({
    success: true,
    data,
  });
};

export const approve = async (req: AuthRequest, res: Response) => {
  const data = await service.approveExpense(
    req.user.orgId,
    req.params.id as string,
    req.user.userId,
  );

  res.json({
    success: true,
    data,
  });
};

export const reject = async (req: AuthRequest, res: Response) => {
  const data = await service.rejectExpense(
    req.user.orgId,
    req.params.id as string,
    req.user.userId,
    req.body.comment,
  );

  res.json({
    success: true,
    data,
  });
};
