import * as repo from "./approvals.repository";

export const getPendingApprovals = async (orgId: string) => {
  return repo.getPendingApprovals(orgId);
};

export const approveExpense = async (
  orgId: string,
  expenseId: string,
  approverId: string,
) => {
  return repo.approveExpense(orgId, expenseId, approverId);
};

export const rejectExpense = async (
  orgId: string,
  expenseId: string,
  approverId: string,
  comment: string,
) => {
  return repo.rejectExpense(orgId, expenseId, approverId, comment);
};
