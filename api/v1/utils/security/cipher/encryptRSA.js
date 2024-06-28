const crypto = require("crypto");

const iv = Buffer.from(process.env.IV, "hex");
const key = Buffer.from(process.env.CIPHER_KEY, "hex");

module.exports = (data, algorithm = "aes-256-cbc") => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key),
    iv
  );
  let encryptedData = cipher.update(data);
  encryptedData = Buffer.concat([
    encryptedData, 
    cipher.final()
  ]);
  return encryptedData.toString("hex");
};

/**
 * Given the data and the toBase64 flag this function returns the
 * encrypted data using RSA.
 * @param {*} data 
 * @param {*} toBase64 
 * @returns 
 */
const encryptRSA = (data, toBase64 = false) => {
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      oaepHash: "sha256"
    },
    Buffer.from(data)
  );

  console.log("base 64 -", encrypted.toString("base64"), ", encrypted -", encrypted);
  return toBase64 ? encrypted.toString("base64") : encrypted;
};