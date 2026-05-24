import { pool } from "../../config/db";

/* CREATE OR UPDATE BUDGET */
export const upsertBudget = async (
  departmentId: string,
  month: number,
  year: number,
  limit: number,
) => {
  const result = await pool.query(
    `INSERT INTO budgets (department_id, month, year, monthly_limit)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (department_id, month, year)
     DO UPDATE SET monthly_limit = $4
     RETURNING *`,
    [departmentId, month, year, limit],
  );

  return result.rows[0];
};

/* GET BUDGETS */
export const getBudgets = async (orgId: string) => {
  const result = await pool.query(
    `SELECT b.*
     FROM budgets b
     JOIN departments d ON d.id = b.department_id
     WHERE d.organization_id = $1
     ORDER BY b.year DESC, b.month DESC`,
    [orgId],
  );

  return result.rows;
};

/* GET BUDGET VS SPENDING */
export const getBudgetSummary = async (
  departmentId: string,
  month: number,
  year: number,
) => {
  const result = await pool.query(
    `
    SELECT 
      b.monthly_limit,
      COALESCE(SUM(e.amount), 0) AS total_spent
    FROM budgets b
    LEFT JOIN expenses e 
      ON e.department_id = b.department_id
      AND EXTRACT(MONTH FROM e.created_at) = b.month
      AND EXTRACT(YEAR FROM e.created_at) = b.year
      AND e.status IN ('APPROVED','SUBMITTED')
    WHERE b.department_id = $1
      AND b.month = $2
      AND b.year = $3
    GROUP BY b.monthly_limit
    `,
    [departmentId, month, year],
  );

  return result.rows[0];
};
