export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Asphalt Brothers";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Two wheels. One lifestyle. Premium motorcycle gear, clothing and accessories for riders who value both style and protection. Ride hard, look sharp.";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const AUTHOR = "Arkadiusz Mastalerczuk";
export const GITHUB_PROFILE = "https://github.com/arekmastalerczuk";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
