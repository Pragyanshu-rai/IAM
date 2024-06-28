const crypto = require("crypto");

const iv = Buffer.from(process.env.IV, "hex");
const key = Buffer.from(process.env.CIPHER_KEY, "hex");

module.exports = (cipherText, algorithm = "aes-256-cbc") => {
  const encryptedData = Buffer.from(cipherText, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    iv
  );
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([
    decryptedData,
    decipher.final()
  ]);
  return decryptedData.toString();
};

/**
 * Given the cipherText this function returns the decipheredText.
 * @param {*} cipherText 
 * @returns 
 */
const decryptRSA = (cipherText) => {
  const bufferString = Buffer.from(cipherText, "base64");
  const decryptedText = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256"
    },
    bufferString.toString("utf8")
  );

  console.log("Decrypted Text");
  return decryptedText;
};