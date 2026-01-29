import { ValidationError } from "./errors";

export const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Invalid email format");
  }
};

export const validatePassword = (password: string): void => {
  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters");
  }
  if (password.length > 40) {
    throw new ValidationError("Password must be less than 40 characters");
  }
};

export const validateRequired = (value: any, fieldName: string): void => {
  if (!value || (typeof value === "string" && value.trim().length === 0)) {
    throw new ValidationError(`${fieldName} is required`);
  }
};

export const validateStringLength = (
  value: string,
  min: number,
  max: number,
  fieldName: string,
): void => {
  if (value.length < min || value.length > max) {
    throw new ValidationError(
      `${fieldName} must be between ${min} and ${max} characters`,
    );
  }
};

export const validateHexColor = (color: string): void => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6})$/;
  if (!hexColorRegex.test(color)) {
    throw new ValidationError(
      "Color must be a valid hex color (e.g., #3B82F6)",
    );
  }
};
