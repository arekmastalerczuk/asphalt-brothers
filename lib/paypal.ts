const base_url =
  process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {};

// Generate paypal access token
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  // Base64 string
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64",
  );

  const response = await fetch(`${base_url}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const jsonData = await response.json();

  return jsonData.access_token;
}

export { generateAccessToken };
