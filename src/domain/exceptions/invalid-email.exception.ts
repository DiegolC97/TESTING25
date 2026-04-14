import { DomainException } from './domain-exception';

export class InvalidEmailException extends DomainException {
  constructor(email: string) {
    super(`Invalid email address: "${email}"`);
    this.name = 'InvalidEmailException';
  }
}
