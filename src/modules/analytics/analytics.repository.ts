import { pool } from "../../config/db";

export const getCurrentMonthSpend = async (orgId: string) => {
  const result = await pool.query(
    `
    SELECT COALESCE(SUM(e.amount), 0) AS total_spent
    FROM expenses e
    JOIN users u ON u.id = e.user_id
    WHERE u.organization_id = $1
      AND e.status IN ('APPROVED', 'SUBMITTED')
      AND EXTRACT(MONTH FROM e.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM e.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
    `,
    [orgId],
  );

  return result.rows[0];
};

export const getTopDepartments = async (orgId: string) => {
  const result = await pool.query(
    `
    SELECT 
      d.name,
      COALESCE(SUM(e.amount), 0) AS total_spent
    FROM expenses e
    JOIN departments d ON d.id = e.department_id
    JOIN users u ON u.id = e.user_id
    WHERE u.organization_id = $1
      AND e.status IN ('APPROVED', 'SUBMITTED')
    GROUP BY d.name
    ORDER BY total_spent DESC
    LIMIT 5
    `,
    [orgId],
  );

  return result.rows;
};

export const getExpenseStatusBreakdown = async (orgId: string) => {
  const result = await pool.query(
    `
    SELECT 
      status,
      COUNT(*)::int AS count
    FROM expenses e
    JOIN users u ON u.id = e.user_id
    WHERE u.organization_id = $1
    GROUP BY status
    `,
    [orgId],
  );

  return result.rows;
};

export const getMonthlyTrend = async (orgId: string) => {
  const result = await pool.query(
    `
    SELECT 
      TO_CHAR(e.created_at, 'YYYY-MM') AS month,
      COALESCE(SUM(e.amount), 0) AS total_spent
    FROM expenses e
    JOIN users u ON u.id = e.user_id
    WHERE u.organization_id = $1
      AND e.created_at >= CURRENT_DATE - INTERVAL '6 months'
      AND e.status IN ('APPROVED', 'SUBMITTED')
    GROUP BY month
    ORDER BY month ASC
    `,
    [orgId],
  );

  return result.rows;
};
