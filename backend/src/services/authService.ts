// ============================================================================
// Auth Service - Handles user registration and authentication logic
// ============================================================================

import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { ConflictError, UnauthorizedError } from "../utils/errors";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateStringLength,
} from "../utils/validation";

const AVATAR_COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
];

const getRandomAvatarColor = (): string => {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
};

// ============================================================================
// Types
// ============================================================================

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarColor: string;
  };
}

// ============================================================================
// Registration Service
// ============================================================================

/**
 * Registers a new user in the system
 *
 * Process:
 * 1. Validates all input fields (name, email, password)
 * 2. Checks if email is already in use
 * 3. Hashes the password for secure storage
 * 4. Creates user record in database with random avatar color
 *
 * @param data - User registration data (name, email, password)
 * @returns Success message
 * @throws ConflictError if email already exists
 * @throws ValidationError if any field is invalid
 */

export const registerUser = async (
  data: RegisterData,
): Promise<{ message: string }> => {
  // Validation
  validateRequired(data.name, "Name");
  validateStringLength(data.name, 2, 100, "Name");
  validateRequired(data.email, "Email");
  validateEmail(data.email);
  validateRequired(data.password, "Password");
  validatePassword(data.password);

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new ConflictError("Email already in use");
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      avatarColor: getRandomAvatarColor(),
      active: true,
    },
  });

  return { message: "User registered successfully" };
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  // Validation
  validateRequired(data.email, "Email");
  validateEmail(data.email);
  validateRequired(data.password, "Password");

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  if (!user.active) {
    throw new UnauthorizedError("User account is inactive");
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    type: "Bearer",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarColor: user.avatarColor,
    },
  };
};
