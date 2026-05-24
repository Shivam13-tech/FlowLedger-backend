import { Request, Response } from "express";
import * as service from "./users.service";

interface AuthRequest extends Request {
  user?: any;
}

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const orgId = req.user.orgId;

    const user = await service.createUser(req.body, orgId);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await service.getUsers(req.user.orgId);

  res.json({
    success: true,
    data: users,
  });
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const user = await service.getUser(req.user.orgId, req.params.id as string);

  res.json({
    success: true,
    data: user,
  });
};

export const deactivateUser = async (req: AuthRequest, res: Response) => {
  const result = await service.deactivateUser(
    req.user.orgId,
    req.params.id as string,
  );

  res.json({
    success: true,
    data: result,
  });
};
