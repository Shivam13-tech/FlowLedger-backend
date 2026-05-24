import * as repo from "./budgets.repository";

export const upsertBudget = async (data: any) => {
  return repo.upsertBudget(
    data.departmentId,
    data.month,
    data.year,
    data.monthlyLimit,
  );
};

export const getBudgets = async (orgId: string) => {
  return repo.getBudgets(orgId);
};

export const getBudgetSummary = async (data: any) => {
  return repo.getBudgetSummary(data.departmentId, data.month, data.year);
};
