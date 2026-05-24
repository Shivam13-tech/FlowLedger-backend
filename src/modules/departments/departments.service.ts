import * as repo from "./departments.repository";

export const createDepartment = async (orgId: string, name: string) => {
  return repo.createDepartment(orgId, name);
};

export const getDepartments = async (orgId: string) => {
  return repo.getDepartments(orgId);
};

export const getDepartment = async (orgId: string, id: string) => {
  return repo.getDepartmentById(orgId, id);
};

export const updateDepartment = async (
  orgId: string,
  id: string,
  name: string,
) => {
  return repo.updateDepartment(orgId, id, name);
};
