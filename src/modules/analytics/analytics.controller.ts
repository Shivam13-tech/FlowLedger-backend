import { Request, Response } from "express";
import * as service from "./analytics.service";

interface AuthRequest extends Request {
  user?: any;
}

export const getDashboard = async (req: AuthRequest, res: Response) => {
  const data = await service.getDashboard(req.user.orgId);

  res.json({
    success: true,
    data,
  });
};
