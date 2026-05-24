export interface PendingApproval {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  status: "SUBMITTED" | "APPROVED" | "REJECTED";
  submitted_at: string;
  user_id: string;
  department_id: string;
}

export interface ApproveExpenseRequest {
  expenseId: string;
}

export interface RejectExpenseRequest {
  expenseId: string;
  comment: string;
}

export type ApprovalStatus = "APPROVED" | "REJECTED";
