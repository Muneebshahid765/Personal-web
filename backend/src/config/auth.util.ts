import * as crypto from 'crypto';

const SECRET = process.env.JWT_SECRET || 'muneeb_secret_portfolio_key_987654321';

export function generateToken(username: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ username, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [header, payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  if (signature !== expectedSignature) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}
