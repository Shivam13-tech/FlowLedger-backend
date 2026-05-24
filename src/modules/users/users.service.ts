import * as repo from "./users.repository";
import { hashPassword } from "../../utils/hash";

export const createUser = async (data: any, orgId: string) => {
  const hashedPassword = await hashPassword(data.password);

  return repo.createUser(
    orgId,
    data.departmentId || null,
    data.firstName,
    data.lastName,
    data.email,
    hashedPassword,
    data.role || "EMPLOYEE",
  );
};

export const getUsers = async (orgId: string) => {
  return repo.getUsersByOrg(orgId);
};

export const getUser = async (orgId: string, userId: string) => {
  return repo.getUserById(orgId, userId);
};

export const deactivateUser = async (orgId: string, userId: string) => {
  return repo.deactivateUser(orgId, userId);
};
