export async function generateRandomCode(digits) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < digits; i++) {
    const randomIndex = await Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
