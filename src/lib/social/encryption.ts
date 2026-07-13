import crypto from 'crypto';

const getEncryptionKey = () => {
  const seed =
    process.env.FIREBASE_PRIVATE_KEY || process.env.STRIPE_SECRET_KEY || process.env.ADMIN_EMAIL;

  if (!seed) {
    throw new Error('Missing encryption seed. Set FIREBASE_PRIVATE_KEY, STRIPE_SECRET_KEY, or ADMIN_EMAIL.');
  }

  return crypto.createHash('sha256').update(seed).digest();
};

export const encryptToken = (value: string) => {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    value: encrypted.toString('hex'),
  };
};
