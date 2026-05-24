import { pool } from "../../config/db";

export const createOrganization = async (name: string, slug: string) => {
  const result = await pool.query(
    `INSERT INTO organizations (name, slug)
     VALUES ($1, $2)
     RETURNING *`,
    [name, slug],
  );

  return result.rows[0];
};

export const createUser = async (
  orgId: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const result = await pool.query(
    `INSERT INTO users (
        organization_id,
        first_name,
        last_name,
        email,
        password,
        role
     )
     VALUES ($1,$2,$3,$4,$5,'ADMIN')
     RETURNING id, email, role`,
    [orgId, firstName, lastName, email, password],
  );

  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
};
