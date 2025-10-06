import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z, { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a regular JS object
export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

// Format number with decimal places
export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatErrors(error: any) {
  if (error instanceof ZodError) {
    const prettyZodErrors = z.prettifyError(error);

    return prettyZodErrors;
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}
