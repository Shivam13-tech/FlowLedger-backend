import { pool } from "../../config/db";

/* CREATE EXPENSE */
export const createExpense = async (
  orgId: string,
  userId: string,
  departmentId: string,
  title: string,
  description: string,
  amount: number,
  category: string,
) => {
  const result = await pool.query(
    `INSERT INTO expenses (
      user_id,
      department_id,
      title,
      description,
      amount,
      category,
      status
    )
    VALUES ($1,$2,$3,$4,$5,$6,'DRAFT')
    RETURNING *`,
    [userId, departmentId, title, description, amount, category],
  );

  return result.rows[0];
};

/* GET ALL EXPENSES (ORG SCOPED) */
export const getExpenses = async (orgId: string) => {
  const result = await pool.query(
    `SELECT e.*
     FROM expenses e
     JOIN users u ON u.id = e.user_id
     WHERE u.organization_id = $1
     ORDER BY e.created_at DESC`,
    [orgId],
  );

  return result.rows;
};

/* GET SINGLE EXPENSE */
export const getExpenseById = async (orgId: string, expenseId: string) => {
  const result = await pool.query(
    `SELECT e.*
     FROM expenses e
     JOIN users u ON u.id = e.user_id
     WHERE u.organization_id = $1 AND e.id = $2`,
    [orgId, expenseId],
  );

  return result.rows[0];
};

/* UPDATE EXPENSE (ONLY DRAFT) */
export const updateExpense = async (
  orgId: string,
  expenseId: string,
  title: string,
  description: string,
  amount: number,
  category: string,
) => {
  const result = await pool.query(
    `UPDATE expenses e
     SET title = $1,
         description = $2,
         amount = $3,
         category = $4,
         updated_at = CURRENT_TIMESTAMP
     FROM users u
     WHERE e.user_id = u.id
       AND u.organization_id = $5
       AND e.id = $6
       AND e.status = 'DRAFT'
     RETURNING e.*`,
    [title, description, amount, category, orgId, expenseId],
  );

  return result.rows[0];
};

/* SUBMIT EXPENSE */
export const submitExpense = async (orgId: string, expenseId: string) => {
  const result = await pool.query(
    `UPDATE expenses e
     SET status = 'SUBMITTED',
         submitted_at = CURRENT_TIMESTAMP
     FROM users u
     WHERE e.user_id = u.id
       AND u.organization_id = $1
       AND e.id = $2
     RETURNING e.*`,
    [orgId, expenseId],
  );

  return result.rows[0];
};

/* DELETE EXPENSE (DRAFT ONLY) */
export const deleteExpense = async (orgId: string, expenseId: string) => {
  const result = await pool.query(
    `DELETE FROM expenses e
     USING users u
     WHERE e.user_id = u.id
       AND u.organization_id = $1
       AND e.id = $2
       AND e.status = 'DRAFT'
     RETURNING e.id`,
    [orgId, expenseId],
  );

  return result.rows[0];
};
