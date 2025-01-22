// 내부 라이브러리 선언
const crypto = require("crypto");

// key와 iv
const keyHex = process.env.CODINGTEST;
const key = Buffer.from(keyHex, "hex");
const iv = crypto.randomBytes(16);

// 암호화
function encrypt(text) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// 복호화
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

module.exports = {
  iv: iv,
  encrypt: encrypt,
  decrypt: decrypt,
};
