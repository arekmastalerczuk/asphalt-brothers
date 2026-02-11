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

// TODO: remove default values when production build
export const signInDefaultValues = {
  email: "admin@example.com",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const MINIMUM_FOR_FREE_SHIPPING_PRICE = 100;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  stock: 0,
  price: "0.00",
  isFeatured: false,
  banner: null,
  numReviews: "0",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const USER_ROLES = process.env.NEXT_PUBLIC_USER_ROLES?.split(",") || [
  "admin",
  "user",
];

export const reviewFormDefaultValues = {
  title: "",
  description: "",
  rating: 0,
};
