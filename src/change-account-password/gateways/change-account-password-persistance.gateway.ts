import { ChangeAccountPassword } from '../entities/change-account-password';

export interface ChangeAccountPasswordPersistanceGateway {
  changePassword(input: ChangeAccountPassword): Promise<void>;
}
