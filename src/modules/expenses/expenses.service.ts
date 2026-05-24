import * as repo from "./expenses.repository";

export const createExpense = async (data: any, user: any) => {
  return repo.createExpense(
    user.orgId,
    user.userId,
    data.departmentId,
    data.title,
    data.description,
    data.amount,
    data.category,
  );
};

export const getExpenses = async (orgId: string) => {
  return repo.getExpenses(orgId);
};

export const getExpense = async (orgId: string, id: string) => {
  return repo.getExpenseById(orgId, id);
};

export const updateExpense = async (orgId: string, id: string, data: any) => {
  return repo.updateExpense(
    orgId,
    id,
    data.title,
    data.description,
    data.amount,
    data.category,
  );
};

export const submitExpense = async (orgId: string, id: string) => {
  return repo.submitExpense(orgId, id);
};

export const deleteExpense = async (orgId: string, id: string) => {
  return repo.deleteExpense(orgId, id);
};
