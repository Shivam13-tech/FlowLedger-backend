import { pool } from "../../config/db";

export const createDepartment = async (orgId: string, name: string) => {
  const result = await pool.query(
    `INSERT INTO departments (organization_id, name)
     VALUES ($1, $2)
     RETURNING *`,
    [orgId, name],
  );

  return result.rows[0];
};

export const getDepartments = async (orgId: string) => {
  const result = await pool.query(
    `SELECT * FROM departments
     WHERE organization_id = $1
     ORDER BY created_at DESC`,
    [orgId],
  );

  return result.rows;
};

export const getDepartmentById = async (orgId: string, id: string) => {
  const result = await pool.query(
    `SELECT * FROM departments
     WHERE organization_id = $1 AND id = $2`,
    [orgId, id],
  );

  return result.rows[0];
};

export const updateDepartment = async (
  orgId: string,
  id: string,
  name: string,
) => {
  const result = await pool.query(
    `UPDATE departments
     SET name = $1
     WHERE organization_id = $2 AND id = $3
     RETURNING *`,
    [name, orgId, id],
  );

  return result.rows[0];
};
