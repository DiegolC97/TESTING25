import { randomUUID } from 'crypto';
import type { IdGenerator } from '@application/ports';

/**
 * IdGenerator implementation using Node.js crypto module.
 * Generates RFC 4122 v4 UUIDs.
 */
export class CryptoIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
