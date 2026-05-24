import { pool } from "../../config/db";

/* GET PENDING EXPENSES FOR APPROVAL */
export const getPendingApprovals = async (orgId: string) => {
  const result = await pool.query(
    `SELECT e.*
     FROM expenses e
     JOIN users u ON u.id = e.user_id
     WHERE u.organization_id = $1
       AND e.status = 'SUBMITTED'
     ORDER BY e.submitted_at DESC`,
    [orgId],
  );

  return result.rows;
};

/* APPROVE EXPENSE */
export const approveExpense = async (
  orgId: string,
  expenseId: string,
  approverId: string,
) => {
  const result = await pool.query(
    `UPDATE expenses e
     SET status = 'APPROVED',
         updated_at = CURRENT_TIMESTAMP
     FROM users u
     WHERE e.user_id = u.id
       AND u.organization_id = $1
       AND e.id = $2
     RETURNING e.*`,
    [orgId, expenseId],
  );

  // log approval
  await pool.query(
    `INSERT INTO approvals (
      expense_id,
      approver_id,
      status,
      action_at
    )
    VALUES ($1,$2,'APPROVED',CURRENT_TIMESTAMP)`,
    [expenseId, approverId],
  );

  return result.rows[0];
};

/* REJECT EXPENSE */
export const rejectExpense = async (
  orgId: string,
  expenseId: string,
  approverId: string,
  comment: string,
) => {
  const result = await pool.query(
    `UPDATE expenses e
     SET status = 'REJECTED',
         updated_at = CURRENT_TIMESTAMP
     FROM users u
     WHERE e.user_id = u.id
       AND u.organization_id = $1
       AND e.id = $2
     RETURNING e.*`,
    [orgId, expenseId],
  );

  await pool.query(
    `INSERT INTO approvals (
      expense_id,
      approver_id,
      status,
      comment,
      action_at
    )
    VALUES ($1,$2,'REJECTED',$3,CURRENT_TIMESTAMP)`,
    [expenseId, approverId, comment],
  );

  return result.rows[0];
};
