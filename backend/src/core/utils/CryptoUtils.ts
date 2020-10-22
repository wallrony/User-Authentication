import Crypto from 'crypto';
require('dotenv-safe').config();

export function encriptPass(pass: string) {
  const cryptoData = {
    algorithm: 'aes256',
    secret: process.env.PASS_SECRET || '0zp6RgqDa1pU14BOCwhvTiA6G59bVi',
    type: 'hex',
    coding: 'utf8'
  };

  const cipher = Crypto.createCipher(
    cryptoData.algorithm, cryptoData.secret
  );

  cipher.update(pass.toString());

  // @ts-ignore
  return cipher.final(cryptoData.type);
}

export function decript(pass: string) {
  const cryptoData = {
    algorithm: 'aes256',
    secret: process.env.PASS_SECRET || '0zp6RgqDa1pU14BOCwhvTiA6G59bVi',
    type: 'hex',
    coding: 'utf8'
  };

  const cipher = Crypto.createDecipher(
    cryptoData.algorithm, cryptoData.secret
  );

  // @ts-ignore
  cipher.update(pass.toString(), cryptoData.type);

  return cipher.final();
}

export function encriptId(userId: number) {
  const cryptoData = {
    algorithm: 'aes256',
    secret: process.env.PASS_SECRET || '0zp6RgqDa1pU14BOCwhvTiA6G59bVi',
    type: 'hex',
    coding: 'utf8'
  };

  const cipher = Crypto.createCipher(
    cryptoData.algorithm, cryptoData.secret
  );

  cipher.update(userId.toString());

  // @ts-ignore
  return cipher.final(cryptoData.type);
}