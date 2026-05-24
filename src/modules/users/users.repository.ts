import { pool } from "../../config/db";

export const createUser = async (
  orgId: string,
  departmentId: string | null,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string,
) => {
  const result = await pool.query(
    `INSERT INTO users (
      organization_id,
      department_id,
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING id, email, role, first_name, last_name`,
    [orgId, departmentId, firstName, lastName, email, password, role],
  );

  return result.rows[0];
};

export const getUsersByOrg = async (orgId: string) => {
  const result = await pool.query(
    `SELECT id, first_name, last_name, email, role, department_id, is_active
     FROM users
     WHERE organization_id = $1
     ORDER BY created_at DESC`,
    [orgId],
  );

  return result.rows;
};

export const getUserById = async (orgId: string, userId: string) => {
  const result = await pool.query(
    `SELECT id, first_name, last_name, email, role, department_id, is_active
     FROM users
     WHERE organization_id = $1 AND id = $2`,
    [orgId, userId],
  );

  return result.rows[0];
};

export const deactivateUser = async (orgId: string, userId: string) => {
  const result = await pool.query(
    `UPDATE users
     SET is_active = false
     WHERE organization_id = $1 AND id = $2
     RETURNING id`,
    [orgId, userId],
  );

  return result.rows[0];
};
