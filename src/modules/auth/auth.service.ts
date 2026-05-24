import { hashPassword, comparePassword } from "../../utils/hash";
import { generateAccessToken } from "../../utils/jwt";
import {
  createOrganization,
  createUser,
  getUserByEmail,
} from "./auth.repository";

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export const register = async (data: any) => {
  const existing = await getUserByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  const orgSlug = slugify(data.orgName);

  const org = await createOrganization(data.orgName, orgSlug);

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser(
    org.id,
    data.firstName,
    data.lastName,
    data.email,
    hashedPassword,
  );

  const token = generateAccessToken({
    userId: user.id,
    orgId: org.id,
    role: user.role,
  });

  return {
    user,
    organization: org,
    token,
  };
};

export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateAccessToken({
    userId: user.id,
    orgId: user.organization_id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
