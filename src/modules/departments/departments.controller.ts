import { Request, Response } from "express";
import * as service from "./departments.service";

interface AuthRequest extends Request {
  user?: any;
}

export const createDepartment = async (req: AuthRequest, res: Response) => {
  const dept = await service.createDepartment(req.user.orgId, req.body.name);

  res.status(201).json({
    success: true,
    data: dept,
  });
};

export const getDepartments = async (req: AuthRequest, res: Response) => {
  const depts = await service.getDepartments(req.user.orgId);

  res.json({
    success: true,
    data: depts,
  });
};

export const getDepartment = async (req: AuthRequest, res: Response) => {
  const dept = await service.getDepartment(
    req.user.orgId,
    req.params.id as string,
  );

  res.json({
    success: true,
    data: dept,
  });
};

export const updateDepartment = async (req: AuthRequest, res: Response) => {
  const dept = await service.updateDepartment(
    req.user.orgId,
    req.params.id as string,
    req.body.name,
  );

  res.json({
    success: true,
    data: dept,
  });
};
