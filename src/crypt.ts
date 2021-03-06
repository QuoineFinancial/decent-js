import { KeyPrivate, KeyPublic } from './utils';

import * as DecentLib from 'decentjs-lib';
const RIPEMD160 = require('ripemd160');

export class CryptoUtils {
    /**
     * Encrypts message with given private-pubic key pair
     *
     * @param {string} message
     * @param {KeyPrivate} privateKey
     * @param {KeyPublic} publicKey
     * @param {string} [nonce]
     * @return {Buffer}
     */
    public static encryptWithChecksum(message: string,
                                      privateKey: KeyPrivate,
                                      publicKey: KeyPublic,
                                      nonce: string = ''): Buffer {
        return DecentLib.Aes.encrypt_with_checksum(privateKey.key, publicKey.key, nonce, message);
    }

    public static decryptWithChecksum(message: string, privateKey: KeyPrivate, publicKey: KeyPublic, nonce: string = ''): Buffer {
        return DecentLib.Aes.decrypt_with_checksum(privateKey.key, publicKey.key, nonce, message);
    }

    public static ripemdHash(fromBuffer: Buffer): string {
        return new RIPEMD160().update(fromBuffer).digest('hex');
    }
}
